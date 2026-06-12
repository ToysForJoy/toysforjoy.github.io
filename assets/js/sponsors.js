/**
 * Sponsors Management Script
 * Manages sponsor data and renders sponsor cards dynamically
 */

// Sponsor data structure
const sponsors = [
    {
        id: "sunlu",
        name: "SUNLU",
        type: "Material & Equipment Sponsor",
        description: "SUNLU provides Toys For Joy with filament and filament drying equipment that supports our 3D printing operations. Their contributions help us produce high-quality toys for donation events, hospitals, shelters, and community outreach programs.",
        logo: "https://www.sunlu.com/cdn/shop/files/SUNLU-removebg-preview_300x300.png?v=1701677391", // Placeholder - can be replaced with local image
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
    const logoHtml = sponsor.logo
        ? `<img src="${sponsor.logo}" alt="${sponsor.name} logo" />`
        : `<span class="sponsor-logo-placeholder">🏢</span>`;

    const baseClass = sponsor.featured ? 'sponsor-card featured' : 'sponsor-card';

    return `
        <div class="${baseClass}">
            <div class="sponsor-logo">
                ${logoHtml}
            </div>
            <h3 class="sponsor-name">${sponsor.name}</h3>
            <span class="sponsor-type">${sponsor.type}</span>
            <p class="sponsor-description">${sponsor.description}</p>
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
