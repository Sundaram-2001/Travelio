<script>
    // @ts-nocheck
    let { data } = $props();
    const { trip } = data;
    let isGenerating = $state(false);
    
    // Extracting the first transport record from the array
    const transport = trip.transport && trip.transport.length > 0 
                      ? trip.transport[0] 
                      : null;

    async function downloadPDF() {
        isGenerating = true;
        try {
            // Senior SDE Tip: Dynamic imports to keep the initial page load light
            const html2canvasModule = await import('html2canvas');
            const html2canvas = html2canvasModule.default;
            
            const jspdfModule = await import('jspdf');
            const jsPDF = jspdfModule.jsPDF;
            
            const element = document.getElementById('pdf-template');
            
            // Capture the hidden template as a high-res canvas
            const canvas = await html2canvas(element, {
                scale: 3, // High scale for professional print quality
                useCORS: true,
                logging: false,
                windowWidth: 800 
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Travelio_Itinerary_${trip.destination}.pdf`);
        } catch (err) {
            console.error("PDF Generation failed:", err);
            alert("Failed to generate PDF. Check if html2canvas and jspdf are installed.");
        } finally {
            isGenerating = false;
        }
    }
</script>

<main class="container">
    <div class="review-card">
        <div class="card-header">
            <span class="badge">Trip Summary</span>
            <h1>Review Your Journey 🌍</h1>
            <p>From {trip.source} to {trip.destination}</p>
        </div>

        <div class="sections-grid">
            <section class="info-group">
                <h2><span class="icon">📅</span> Schedule</h2>
                <div class="details">
                    <div class="item">
                        <label>Start Date</label>
                        <p>{new Date(trip.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div class="item">
                        <label>Duration</label>
                        <p>{trip.number_of_days} Days</p>
                    </div>
                </div>
            </section>

            <section class="info-group highlighted">
                <h2><span class="icon">🚆</span> Logistics & Transport</h2>
                <div class="details">
                    <div class="item">
                        <label>Travel Mode</label>
                        <p>{transport?.mode || 'Not specified'}</p>
                    </div>
                    
                    <div class="item">
                        <label>PNR Number</label>
                        <p class="mono">{transport?.pnr || 'N/A'}</p>
                    </div>

                    <div class="item">
                        <label>Flight/Train Details</label>
                        <p>{transport?.transport_details || 'N/A'}</p>
                    </div>
                </div>

                {#if transport?.additional_info}
                    <div class="additional-box">
                        <label>Additional Info</label>
                        <p>{transport.additional_info}</p>
                    </div>
                {/if}
            </section>
        </div>

        <div class="actions">
            <button class="btn-secondary" onclick={() => window.print()}>
                Print UI
            </button>
            <button class="btn-primary" onclick={downloadPDF} disabled={isGenerating}>
                {#if isGenerating}
                    Generating...
                {:else}
                    Download PDF! ✨
                {/if}
            </button>
        </div>
    </div>
</main>

<div id="pdf-template" class="pdf-only-container">
    <div class="pdf-header">
        <div class="pdf-brand">TRAVELIO</div>
        <h1>Official Trip Itinerary</h1>
    </div>
    
    <div class="pdf-body">
        <div class="pdf-row">
            <div class="pdf-col">
                <span class="pdf-label">DESTINATION</span>
                <p class="pdf-main-val">{trip.destination}</p>
            </div>
            <div class="pdf-col">
                <span class="pdf-label">ORIGIN</span>
                <p class="pdf-main-val">{trip.source}</p>
            </div>
        </div>

        <div class="pdf-details-box">
            <h3 class="pdf-sub">Transport Logistics</h3>
            <div class="pdf-grid">
                <div>
                    <span class="pdf-label">Mode</span>
                    <p>{transport?.mode || 'N/A'}</p>
                </div>
                <div>
                    <span class="pdf-label">PNR / Ref</span>
                    <p>{transport?.pnr || 'N/A'}</p>
                </div>
                <div>
                    <span class="pdf-label">Date</span>
                    <p>{new Date(trip.start_date).toDateString()}</p>
                </div>
                <div>
                    <span class="pdf-label">Service No.</span>
                    <p>{transport?.transport_details || 'N/A'}</p>
                </div>
            </div>
        </div>

        <div class="pdf-footer">
            <p>Generated on {new Date().toLocaleString()}</p>
            <p>Thank you for using Travelio. Safe Travels!</p>
        </div>
    </div>
</div>

<style>
    :global(body) {
        background-color: #f3f4f6;
        font-family: 'Inter', system-ui, sans-serif;
        margin: 0;
    }

    .container {
        display: flex;
        justify-content: center;
        padding: 2rem;
        min-height: 100vh;
    }

    .review-card {
        background: white;
        width: 100%;
        max-width: 650px;
        border-radius: 20px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        padding: 2.5rem;
        height: fit-content;
    }

    .card-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .badge {
        background: #e0f2fe;
        color: #0369a1;
        padding: 6px 16px;
        border-radius: 99px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    h1 { font-size: 1.75rem; color: #111827; margin: 1rem 0 0.25rem; }
    h2 { font-size: 1rem; color: #374151; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }

    .sections-grid { display: grid; gap: 1.5rem; }

    .info-group {
        padding: 1.25rem;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }

    .highlighted {
        background: #f8fafc;
        border-color: #cbd5e1;
    }

    .details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1.25rem;
    }

    .additional-box {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px dashed #cbd5e1;
    }

    label {
        display: block;
        font-size: 0.7rem;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
        margin-bottom: 4px;
    }

    p { font-size: 0.95rem; color: #1e293b; margin: 0; font-weight: 500; }
    
    .mono { 
        font-family: 'ui-monospace', 'SFMono-Regular', monospace; 
        color: #2563eb; 
        font-weight: 700; 
        background: #eff6ff;
        padding: 2px 6px;
        border-radius: 4px;
        display: inline-block;
    }

    .actions {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
    }

    button {
        flex: 1;
        padding: 0.9rem;
        border-radius: 10px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.9rem;
    }

    .btn-primary { background: #2563eb; color: white; border: none; }
    .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
    .btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }

    .btn-secondary { background: white; color: #475569; border: 1px solid #d1d5db; }
    .btn-secondary:hover { background: #f8fafc; }

    /* PDF-SPECIFIC HIDDEN TEMPLATE STYLES */
    .pdf-only-container {
        position: absolute;
        left: -9999px; /* This keeps it out of the browser view */
        width: 800px;
        background: white;
        padding: 60px;
        color: #0f172a;
    }

    .pdf-header {
        border-bottom: 5px solid #2563eb;
        padding-bottom: 20px;
        margin-bottom: 40px;
    }

    .pdf-brand {
        font-size: 32px;
        font-weight: 900;
        color: #2563eb;
        letter-spacing: -1px;
    }

    .pdf-row {
        display: flex;
        gap: 60px;
        margin-bottom: 40px;
    }

    .pdf-label {
        font-size: 12px;
        font-weight: 800;
        color: #64748b;
        text-transform: uppercase;
        display: block;
        margin-bottom: 5px;
    }

    .pdf-main-val {
        font-size: 28px;
        font-weight: 700;
        margin: 0;
    }

    .pdf-details-box {
        background: #f8fafc;
        padding: 30px;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
    }

    .pdf-sub {
        margin: 0;
        font-size: 18px;
        border-bottom: 1px solid #cbd5e1;
        padding-bottom: 10px;
        color: #1e293b;
    }

    .pdf-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
        margin-top: 20px;
    }

    .pdf-footer {
        margin-top: 80px;
        text-align: center;
        border-top: 1px solid #e2e8f0;
        padding-top: 20px;
        font-size: 14px;
        color: #94a3b8;
    }

    @media print {
        .actions, .badge, .pdf-only-container { display: none; }
        .review-card { box-shadow: none; border: none; padding: 0; }
        :global(body) { background: white; }
    }
</style>