<script>
// @ts-nocheck
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { fly, fade } from 'svelte/transition';

    let { form } = $props();
    let loading = $state(false);
    let showLogistics = $state(false);

    function checkProgress(e) {
        if (['days', 'start_date'].includes(e.target.name)) {
            showLogistics = true;
        }
    }

    const handleEnhance = () => {
        loading = true;
        return async ({ result, update }) => {
            loading = false;

            if (result.type === 'success' && result.data?.tripID) {
                await goto(`/trips/${result.data.tripID}`)
                return;
            }

            
            await update();
        };
    };
</script>

<main>
    <div class="plan-card">
        <div class="header">
            <h1>Plan a New Trip ✈️</h1>
            <p>Where is your next adventure taking you?</p>
        </div>

        {#if form?.message}
            <div class="alert {form.success ? 'alert-success' : 'alert-error'}" in:fade>
                <span class="alert-icon">{form.success ? '✅' : '⚠️'}</span>
                {form.message}
            </div>
        {/if}

        <form method="POST" action="?/createTrip" use:enhance={handleEnhance} oninput={checkProgress}>
            <section class="form-section">
                <div class="form-group">
                    <label for="destination">Where to?</label>
                    <input type="text" name="destination" placeholder="e.g. Paris" required />
                </div>
                
                <div class="form-group">
                    <label for="origin">From?</label>
                    <input type="text" name="origin" placeholder="e.g. Hyderabad" required />
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="start_date">Start Date</label>
                        <input type="date" name="start_date" required />
                    </div>
                    <div class="form-group">
                        <label for="days">Days</label>
                        <input type="number" name="days" value="3" min="1" required />
                    </div>
                </div>
            </section>

            {#if showLogistics}
                <section transition:fly={{ y: 20, duration: 400 }} class="logistics-section">
                    <div class="divider">
                        <span>Transport Details (Optional)</span>
                    </div>

                    <div class="form-group">
                        <label for="mode">Travel Mode</label>
                        <select name="mode">
                            <option value="Flight">Flight ✈️</option>
                            <option value="Train">Train 🚆</option>
                            <option value="Bus">Bus 🚌</option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="pnr">PNR Number</label>
                            <input type="text" name="pnr" placeholder="e.g. ABC123" />
                        </div>
                        <div class="form-group">
                            <label for="flight_no">Flight/Train No.</label>
                            <input type="text" name="flight_no" placeholder="e.g. AI-102" />
                        </div>
                    </div>
                </section>
            {/if}

            <button type="submit" class="btn-primary" disabled={loading}>
                {#if loading}
                    <span class="spinner"></span> Creating Itinerary...
                {:else}
                    Start My Journey
                {/if}
            </button>
        </form>
    </div>
</main>

<style>
    :global(body) { background-color: #f9fafb; font-family: 'Inter', sans-serif; }
    
    .plan-card {
        max-width: 500px;
        margin: 3rem auto;
        padding: 2.5rem;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        border: 1px solid #f1f5f9;
    }

    /* --- ALERT STYLING --- */
    .alert {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        font-weight: 500;
        border: 1px solid;
    }

    .alert-success {
        background-color: #f0fdf4;
        color: #166534;
        border-color: #bbf7d0;
    }

    .alert-error {
        background-color: #fef2f2;
        color: #991b1b;
        border-color: #fecaca;
    }

    .alert-icon { font-size: 1.1rem; }

    /* --- EXISTING STYLES --- */
    .header { text-align: center; margin-bottom: 2rem; }
    .header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem; }
    .header p { color: #64748b; font-size: 0.95rem; }

    .form-group { margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
    label { font-size: 0.85rem; font-weight: 600; color: #475569; }
    
    input, select {
        padding: 0.8rem;
        border: 1.5px solid #e2e8f0;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.2s;
    }

    input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

    .divider {
        position: relative;
        text-align: center;
        margin: 2rem 0;
        border-bottom: 1px solid #f1f5f9;
    }

    .divider span {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 0 10px;
        font-size: 0.75rem;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
    }

    .btn-primary {
        width: 100%;
        padding: 1rem;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 1rem;
        transition: background 0.2s;
    }

    .btn-primary:hover { background: #2563eb; }
    .btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }

    .spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
</style>