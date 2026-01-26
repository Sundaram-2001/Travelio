<script>
    let { data } = $props();
    const name = data.userData?.full_name || 'Traveler'; 
</script>

<main>
    <div class="welcome-card">
        <h1>Welcome, <span class="highlight">{name}</span>! 👋</h1>
        <p class="subtitle">Ready to plan your next adventure? <a href="/plan">Click here to get started!</a></p>
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center; 
        padding-top: 4rem;      
        min-height: 100vh;
        background-color: #f9fafb; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    
    .welcome-card {
        text-align: center;
        background: white;
        padding: 3rem 4rem;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        max-width: 600px;
        width: 100%;
    }

    
    h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: #111827; 
        margin: 0;
        margin-bottom: 0.5rem;
        letter-spacing: -0.025em;
    }

    .highlight {
        color: #ff3e00;     
    }

    .subtitle {
        font-size: 1.1rem;
        color: #6b7280; 
        margin: 0;
    }
</style>