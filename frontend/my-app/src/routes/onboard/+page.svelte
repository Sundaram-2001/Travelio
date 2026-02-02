<script>
// @ts-nocheck
    import { enhance } from '$app/forms';
    export let form; 
    export let data; 

    let loading = false;
</script>

<main>
    <div class="onboard-card">
        <h3>Welcome, {data.user?.email ?? 'friend'}!</h3>
        <p>Let's get you onboard. We would like you to give us some details.</p>

        <form 
            method="POST" 
            use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    loading = false;
                    update();
                };
            }}
        >
            <div class="input-group">
                <label for="full_name">Full Name</label>
                <input 
                    type="text" 
                    name="full_name" 
                    required 
                    placeholder="e.g. John Doe"
                    disabled={loading}
                    value={form?.full_name ?? ''}
                >
            </div>

            <div class="input-group">
                <label for="email">Your Email</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={data.user?.email ?? ''}
                    readonly
                    class="readonly-input"
                    disabled={loading}
                >
                <small>Associated with your account</small>
            </div>

            <div class="input-group">
                <label for="currentCity">Which city do you stay in?</label>
                <input 
                    type="text" 
                    name="currentCity" 
                    required 
                    placeholder="e.g. Mumbai"
                    disabled={loading}
                    value={form?.currentCity ?? ''}
                >
            </div>

            {#if form?.message}
                <p class="error">{form.message}</p>
                <a href="/dashboard">Go to dashboard</a>
            {/if}

            <button type="submit" disabled={loading}>
                {loading ? 'Saving details...' : 'Complete Onboarding'}
            </button>
        </form>
    </div>
</main>

<style>
    main { display: flex; justify-content: center; padding: 2rem; font-family: sans-serif; min-height: 80vh; align-items: center; }
    .onboard-card { max-width: 400px; width: 100%; border: 1px solid #ddd; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background: white; }
    .input-group { margin-bottom: 1.2rem; display: flex; flex-direction: column; }
    label { margin-bottom: 0.4rem; font-weight: bold; font-size: 0.9rem; }
    input { padding: 0.8rem; border: 1px solid #ccc; border-radius: 6px; }
    .readonly-input { background-color: #f9f9f9; color: #666; cursor: not-allowed; border-color: #eee; }
    small { font-size: 0.7rem; color: #888; margin-top: 0.2rem; }
    button { width: 100%; padding: 1rem; background: #0070f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 1rem; transition: background 0.2s; }
    button:hover:not(:disabled) { background: #0060df; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .error { color: #ff0000; font-size: 0.85rem; margin-top: 0.5rem; background: #fff0f0; padding: 0.5rem; border-radius: 4px; border: 1px solid #ffdada; }
</style>