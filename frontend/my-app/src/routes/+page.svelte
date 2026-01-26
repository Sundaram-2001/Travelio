<script>
    import { base } from '$app/paths';
</script>

<main>
    <section class="hero">
        <div class="hero-content">
            <h1>Your Journey, <span class="highlight">Perfectly Organized.</span></h1>
            <p class="subtitle">
                Plan detailed itineraries, track your budget, and generate PDF guides for your next adventure—all in one place.
            </p>
            <div class="cta-group">
                <a href="/auth" class="btn-primary">Start Planning for Free</a>
                <a href="#features" class="btn-secondary">How it works</a>
            </div>
        </div>
    </section>

    <section id="features" class="features">
        <h2>Why travelers love Travelio</h2>
        <div class="grid">
            <div class="card">
                <div class="icon">✈️</div>
                <h3>Smart Itineraries</h3>
                <p>Build day-by-day plans effortlessly and organize your activities in minutes.</p>
            </div>
            <div class="card">
                <div class="icon">💰</div>
                <h3>Budget Tracking</h3>
                <p>Keep your expenses in check. Log costs as you plan and never overspend on a trip again.</p>
            </div>
            <div class="card">
                <div class="icon">📄</div>
                <h3>Offline PDFs</h3>
                <p>No internet? No problem. Download your complete itinerary as a PDF and take it anywhere.</p>
            </div>
        </div>
    </section>

    <section class="bottom-cta">
        <h2>Ready to take off?</h2>
        <p>Join thousands of travelers planning their dream trips today.</p>
        <a href="/auth" class="btn-primary large">Create your first trip</a>
    </section>
</main>

<style>
    main {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #1f2937;
        overflow-x: hidden;
    }

    section {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    /* HERO STYLES */
    .hero {
        text-align: center;
        padding: 6rem 2rem 4rem;
        background: radial-gradient(circle at top, #fff0eb 0%, #ffffff 70%);
    }

    h1 {
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
    }

    .highlight {
        color: #ff3e00; /* Travelio Orange */
        white-space: nowrap; /* Keeps phrase together */
    }

    .subtitle {
        font-size: 1.25rem;
        color: #6b7280;
        max-width: 600px;
        margin: 0 auto 2.5rem;
        line-height: 1.6;
    }

    .cta-group {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    /* BUTTONS */
    .btn-primary {
        background-color: #ff3e00;
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        transition: transform 0.2s, background-color 0.2s;
    }

    .btn-primary:hover {
        background-color: #e03600;
        transform: translateY(-2px);
    }

    .btn-secondary {
        background-color: white;
        color: #374151;
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        border: 1px solid #d1d5db;
        transition: background-color 0.2s;
    }

    .btn-secondary:hover {
        background-color: #f9fafb;
        color: #111;
    }

    /* FEATURES GRID */
    .features h2, .bottom-cta h2 {
        text-align: center;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 3rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .card {
        padding: 2rem;
        border-radius: 16px;
        background: white;
        border: 1px solid #f3f4f6;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
        font-weight: 700;
    }

    .card p {
        color: #6b7280;
        line-height: 1.5;
        margin: 0;
    }

    /* BOTTOM CTA */
    .bottom-cta {
        text-align: center;
        background-color: #111827;
        color: white;
        border-radius: 20px;
        margin: 4rem auto;
        padding: 4rem 2rem;
        max-width: 1000px;
    }

    .bottom-cta h2 {
        color: white;
        margin-bottom: 1rem;
    }

    .bottom-cta p {
        color: #9ca3af;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }

    .btn-primary.large {
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
    }
</style>