<script>
// @ts-nocheck

    import { supabase } from "$lib/supabaseClient";
    import { error } from "@sveltejs/kit";
    // import {PUBLIC_SITE_URL} from '$env/static/public'
    let userName=''
    let email=''
    let successMsg=''
    let errorMsg=''
    let loading=false
    async function handleSubmit() {
    loading = true
    successMsg = ""
    errorMsg = ""

    try {
    const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
        emailRedirectTo: `${window.location.origin}/callback`,
        data: {
            name: userName
        }
        }
    })

    if (authError) {
        throw authError
    }

    successMsg = "Awesome! Kindly check your email 📩"
    } catch (err) {
    console.warn(err)
    errorMsg = err?.message ?? "Unexpected error. Please try again."
    } finally {
    loading = false
    }
}
</script>
<main>
    <div class="card">
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

            <button type="submit" class="primary" disabled={loading}>{loading ? "Processing..":"Submit" }</button>
        </form>
        {#if errorMsg}
            <p class="error">{errorMsg}</p>
        {/if}

        {#if successMsg}
            <p class="success">{successMsg}</p>
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
        background-color: #f9fafb; /* Light clean background */
        font-family: sans-serif;
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

    header {
        margin-bottom: 2rem;
    }

    h3 {
        margin: 0;
        font-size: 1.5rem;
        color: #111;
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
        font-size: 0.9rem;
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
        padding: 0.75rem;
        background-color: #333;
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

    .error {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #dc2626; /* red */
    }

    .success {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #16a34a; /* green */
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
