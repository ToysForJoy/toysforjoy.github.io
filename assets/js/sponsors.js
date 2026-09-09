/**
 * Sponsors Management Script
 * Manages sponsor data and renders sponsor cards dynamically
 */

// Sponsor data structure
const sponsors = [
    {
        id: "sunlu",
        name: "SUNLU",
        type: "Filament & Equipment Sponsor",
        description: "SUNLU contributed 20 one-kilogram spools of PLA, one FilaDryer SP2, and one FilaDryer S2 to Toys For Joy. This supply of material and drying equipment helps us produce reliable, high-quality toys and adaptive devices for the children and organizations we serve.",
        contributions: [
            "25 × 1 kg spools of PLA",
            "1 × FilaDryer SP2",
            "1 × FilaDryer S2"
        ],
        logo: "images/sponsor/sunlu.jpg",
        images: [
            {
                src: "images/sponsor/sunlu.jpg",
                alt: "SUNLU logo"
            },
            {
                src: "images/sponsor/sunlu_donation_showoff.jpg",
                alt: "SUNLU filament and FilaDryer equipment contributed to Toys For Joy"
            },
            {
                src: "images/sponsor/sunlu_print_showcase.jpg",
                alt: "Adaptive switch buttons printed with filament sponsored by SUNLU"
            }
        ],
        website: "https://www.sunlu.com",
        featured: true,
        order: 1
    }
    // Future sponsors can be added here in the same format
];

/**
 * Renders a single sponsor card
 * @param {Object} sponsor - The sponsor object
 * @param {boolean} compact - Whether to render in compact mode (used on homepage)
 * @returns {string} HTML string for the sponsor card
 */
function renderSponsorCard(sponsor, compact = false) {
    const carouselId = `sponsor-carousel-${sponsor.id}`;
    const logoHtml = sponsor.images && sponsor.images.length
        ? `<div id="${carouselId}" class="carousel slide sponsor-card-carousel" data-ride="carousel"
                data-interval="6000" aria-label="${sponsor.name} sponsorship photo gallery">
                <ol class="carousel-indicators">
                    ${sponsor.images.map((image, index) => `
                        <li data-target="#${carouselId}" data-slide-to="${index}"
                            class="${index === 0 ? 'active' : ''}" aria-label="View image ${index + 1}"></li>
                    `).join('')}
                </ol>
                <div class="carousel-inner" role="listbox">
                    ${sponsor.images.map((image, index) => `
                        <div class="item ${index === 0 ? 'active' : ''}">
                            <img src="${image.src}" alt="${image.alt}" />
                        </div>
                    `).join('')}
                </div>
                <a class="left carousel-control" href="#${carouselId}" role="button" data-slide="prev"
                    aria-label="Previous ${sponsor.name} photo">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </a>
                <a class="right carousel-control" href="#${carouselId}" role="button" data-slide="next"
                    aria-label="Next ${sponsor.name} photo">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </a>
           </div>`
        : sponsor.logo
            ? `<img src="${sponsor.logo}" alt="${sponsor.name} logo" />`
            : `<span class="sponsor-logo-placeholder">🏢</span>`;

    const baseClass = sponsor.featured ? 'sponsor-card featured' : 'sponsor-card';
    const contributionsHtml = sponsor.contributions && sponsor.contributions.length
        ? `<ul class="sponsor-contributions" aria-label="${sponsor.name} contributions">
                ${sponsor.contributions.map(item => `<li>${item}</li>`).join('')}
           </ul>`
        : '';

    return `
        <div class="${baseClass}">
            <div class="sponsor-logo${sponsor.images && sponsor.images.length ? ' sponsor-carousel-wrap' : ''}">
                ${logoHtml}
            </div>
            <h3 class="sponsor-name">${sponsor.name}</h3>
            <span class="sponsor-type">${sponsor.type}</span>
            <p class="sponsor-description">${sponsor.description}</p>
            ${contributionsHtml}
            <div class="sponsor-footer">
                <a href="${sponsor.website}" class="sponsor-button" target="_blank" rel="noopener noreferrer">
                    Visit ${sponsor.name}
                </a>
            </div>
        </div>
    `;
}

/**
 * Renders all sponsors into a specified container
 * @param {string} containerId - The ID of the container element
 * @param {boolean} compact - Whether to render in compact mode
 */
function renderSponsors(containerId, compact = false) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Sponsor container with ID "${containerId}" not found.`);
        return;
    }

    // Sort sponsors by order property
    const sortedSponsors = sponsors.sort((a, b) => (a.order || 999) - (b.order || 999));

    // Render each sponsor
    const sponsorHtml = sortedSponsors
        .map(sponsor => renderSponsorCard(sponsor, compact))
        .join('');

    container.innerHTML = sponsorHtml;
}

/**
 * Gets a specific sponsor by ID
 * @param {string} sponsorId - The sponsor ID
 * @returns {Object|null} The sponsor object or null if not found
 */
function getSponsor(sponsorId) {
    return sponsors.find(sponsor => sponsor.id === sponsorId) || null;
}

/**
 * Gets all featured sponsors
 * @returns {Array} Array of featured sponsor objects
 */
function getFeaturedSponsors() {
    return sponsors.filter(sponsor => sponsor.featured);
}

/**
 * Gets the count of active sponsors
 * @returns {number} Number of sponsors
 */
function getSponsorCount() {
    return sponsors.length;
}

// Execute when document is ready
document.addEventListener('DOMContentLoaded', function () {
    // Auto-render sponsors if containers are found
    if (document.getElementById('sponsors-container')) {
        renderSponsors('sponsors-container');
    }
    if (document.getElementById('featured-sponsor-container')) {
        renderSponsors('featured-sponsor-container', true);
    }
});
