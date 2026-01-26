<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores'; // 1
    import favicon from '$lib/assets/favicon.svg';
    import { supabase } from '$lib/supabaseClient';
    let { children } = $props();

    async function signout(){
		await supabase.auth.signOut()
		goto("/")
	}
    const publicPages = ['/', '/auth', '/onboarding'];
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<nav>
    <a href="/" class="brand">Travelio</a>

    {#if !publicPages.includes($page.url.pathname)}
        <div class="actions">
            <form onsubmit={signout} >
                <button type="submit"class="logout-btn">Sign Out</button>
            </form>
        </div>
    {/if}
</nav>

<div class="content">
    {@render children()}
</div>

<style>
    
    nav {
        display: flex;
        justify-content: space-between; 
        align-items: center;
        padding: 1rem 2rem;
        background-color: white;
        border-bottom: 1px solid #e5e7eb;
        height: 64px; 
    }

    .brand {
        font-size: 1.5rem;
        font-weight: 800;
        color: #ff3e00; 
        text-decoration: none;
        letter-spacing: -0.5px;
    }

    .logout-btn {
        background: transparent;
        border: 1px solid #d1d5db;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        color: #374151;
        transition: all 0.2s;
    }

    .logout-btn:hover {
        background-color: #f3f4f6;
        border-color: #9ca3af;
        color: #111;
    }

    
    .content {
        min-height: calc(100vh - 64px);
    }
</style>