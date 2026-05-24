/**
 * Animated Counter with Rolling Digit Animation
 * Triggers when element enters viewport using Intersection Observer
 */

class AnimatedCounter {
    constructor(element, targetNumber, duration = 2500) {
        this.element = element;
        this.targetNumber = targetNumber;
        this.duration = duration;
        this.hasAnimated = false;
        this.currentNumber = 0;
        this.displayElement = element.querySelector('.counter-number');

        if (!this.displayElement) {
            console.warn('Counter element missing .counter-number class');
            return;
        }

        // Initialize Intersection Observer
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounter();
                    observer.unobserve(this.element); // Unobserve after animation
                }
            });
        }, options);

        observer.observe(this.element);
    }

    animateCounter() {
        const startTime = performance.now();
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4); // Easing function

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const easedProgress = easeOutQuart(progress);

            // Calculate current number with rolling effect
            this.currentNumber = Math.floor(easedProgress * this.targetNumber);
            this.displayElement.textContent = this.currentNumber.toLocaleString();

            // Add visual rolling effect with transform
            const rotationAmount = (1 - easedProgress) * 20; // Spin wheel effect
            this.displayElement.style.transform = `rotateX(${rotationAmount}deg)`;
            this.displayElement.style.opacity = 0.8 + (easedProgress * 0.2);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final number is set
                this.displayElement.textContent = this.targetNumber.toLocaleString();
                this.displayElement.style.transform = 'rotateX(0deg)';
                this.displayElement.style.opacity = '1';
            }
        };

        requestAnimationFrame(animate);
    }
}

/**
 * Initialize all counters on page load
 */
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('[data-counter-target]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter-target'), 10);
        const duration = counter.getAttribute('data-counter-duration')
            ? parseInt(counter.getAttribute('data-counter-duration'), 10)
            : 2500;

        new AnimatedCounter(counter, target, duration);
    });
});
