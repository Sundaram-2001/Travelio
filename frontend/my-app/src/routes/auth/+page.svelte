<script>
// @ts-nocheck
    import { supabase } from "$lib/supabaseClient";
    import { env } from '$env/dynamic/public';
    import { page } from '$app/stores';

    // 1. Reactive Error Handling from URL
    // This grabs "?error=invalid-link" if the /callback gatekeeper redirects here
    $: errorType = $page.url.searchParams.get('error');
    
    const errorMap = {
        'invalid-link': "That link has expired or was already used. Let's send you a fresh one!",
        'default': "Authentication failed. Please try again."
    };

    const PUBLIC_SITE_URL = env.PUBLIC_SITE_URL;
    
    let userName = '';
    let email = '';
    let successMsg = '';
    let errorMsg = '';
    let loading = false;

    async function handleSubmit() {
        loading = true;
        successMsg = "";
        errorMsg = "";
        
        try {
            const { error: authError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${PUBLIC_SITE_URL}/callback`,
                    data: {
                        name: userName
                    }
                }
            });

            if (authError) throw authError;

            successMsg = "Awesome! Kindly check your email 📩";
        } catch (err) {
            console.warn("Auth Error:", err);
            errorMsg = err?.message ?? "Unexpected error. Please try again.";
        } finally {
            loading = false;
        }
    }
</script>

<main>
    <div class="card">
        {#if errorType}
            <div class="error-banner">
                <p>{errorMap[errorType] || errorMap['default']}</p>
            </div>
        {/if}

        <header>
            <h3>Let's get you set up</h3>
            <p>Create your traveler profile to start planning.</p>
        </header>

        <form on:submit|preventDefault={handleSubmit}>
            <div class="input-group">
                <label for="name">Full Name</label>
                <input 
                    type="text" 
                    id="name" 
                    bind:value={userName} 
                    placeholder="e.g. Sundaram Saroj" 
                    required
                />
            </div>

            <div class="input-group">
                <label for="email">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    bind:value={email} 
                    placeholder="name@example.com" 
                    required
                />
            </div>

            <button type="submit" class="primary" disabled={loading}>
                {loading ? "Processing..." : "Submit"}
            </button>
        </form>

        {#if errorMsg}
            <p class="error-text">{errorMsg}</p>
        {/if}

        {#if successMsg}
            <p class="success-text">{successMsg}</p>
        {/if}

        <p class="footer-text">Already have an account? <a href="/login">Log in</a></p>
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f9fafb; 
        font-family: 'Inter', -apple-system, sans-serif;
        padding: 1rem;
    }

    .card {
        background: white;
        padding: 2.5rem;
        border-radius: 12px;
        box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        width: 100%;
        max-width: 400px;
        text-align: center;
    }

    
    .error-banner {
        background-color: #fee2e2;
        border: 1px solid #ef4444;
        color: #b91c1c;
        padding: 0.85rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-size: 0.85rem;
        text-align: left;
        line-height: 1.4;
    }

    header {
        margin-bottom: 2rem;
    }

    h3 {
        margin: 0;
        font-size: 1.5rem;
        color: #111;
        font-weight: 700;
    }

    header p {
        margin-top: 0.5rem;
        color: #666;
        font-size: 0.95rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-bottom: 1.2rem;
    }

    label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.4rem;
    }

    input {
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    input:focus {
        outline: none;
        border-color: #ff3e00; /* Travelio Brand Color */
        box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.1);
    }

    button {
        width: 100%;
        padding: 0.85rem;
        background-color: #111827;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
        transition: background-color 0.2s, opacity 0.2s;
    }

    button:hover:not(:disabled) {
        background-color: #000;
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .error-text {
        margin-top: 1rem;
        font-size: 0.85rem;
        color: #dc2626; /* red */
        font-weight: 500;
    }

    .success-text {
        margin-top: 1rem;
        font-size: 0.85rem;
        color: #16a34a; /* green */
        font-weight: 500;
    }

    .footer-text {
        margin-top: 1.5rem;
        font-size: 0.85rem;
        color: #666;
    }

    a {
        color: #ff3e00;
        text-decoration: none;
        font-weight: 600;
    }

    a:hover {
        text-decoration: underline;
    }
</style>