<script>
// @ts-nocheck

    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
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
                    await goto("/dashboard")
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
                >
            </div>

            <div class="input-group">
                <label for="email">Your Email</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={data.user?.email ?? ''}
                    disabled={loading}
                >
            </div>

            <div class="input-group">
                <label for="currentCity">Which city do you stay in?</label>
                <input 
                    type="text" 
                    name="currentCity" 
                    required 
                    placeholder="e.g. Mumbai"
                    disabled={loading}
                >
            </div>

            {#if form?.message}
                <p class="error">{form.message}</p>
            {/if}

            <button type="submit" disabled={loading}>
                {loading ? 'Saving details...' : 'Complete Onboarding'}
            </button>
        </form>
    </div>
</main>

<style>
    main { display: flex; justify-content: center; padding: 2rem; font-family: sans-serif; }
    .onboard-card { max-width: 400px; width: 100%; border: 1px solid #ddd; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .input-group { margin-bottom: 1.2rem; display: flex; flex-direction: column; }
    label { margin-bottom: 0.4rem; font-weight: bold; font-size: 0.9rem; }
    input { padding: 0.8rem; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 1rem; background: #0070f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 1rem; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .error { color: #ff0000; font-size: 0.85rem; margin-top: 0.5rem; }
</style>