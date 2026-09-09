(function () {
	'use strict';

	var page = document.querySelector('.timeline-page');
	if (!page) return;

	var history = document.getElementById('history-events');
	var future = document.getElementById('future-events');
	var futureEmpty = document.getElementById('future-empty');
	var currentDate = document.getElementById('current-date');
	var entries = Array.prototype.slice.call(document.querySelectorAll('.timeline-entry'));
	var today = new Date();
	today.setHours(0, 0, 0, 0);

	function parseLocalDate(value) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
		var parts = value.split('-').map(Number);
		return new Date(parts[0], parts[1] - 1, parts[2]);
	}

	entries.sort(function (a, b) {
		var aDate = parseLocalDate(a.dataset.date);
		var bDate = parseLocalDate(b.dataset.date);
		if (!aDate && !bDate) return 0;
		if (!aDate) return 1;
		if (!bDate) return -1;
		return bDate - aDate;
	}).forEach(function (entry) {
		var entryDate = parseLocalDate(entry.dataset.date);
		var destination = entryDate && entryDate > today ? future : history;
		destination.appendChild(entry);
	});

	document.querySelectorAll('[data-event-src]').forEach(function (image) {
		var eventImage = new Image();
		eventImage.onload = function () {
			image.src = image.dataset.eventSrc;
			image.alt = image.dataset.eventAlt || image.alt;
			image.parentElement.classList.remove('timeline-image-logo');
			if (image.dataset.eventFit === 'contain') {
				image.parentElement.classList.add('timeline-image-contain');
			}
		};
		eventImage.src = image.dataset.eventSrc;
	});

	futureEmpty.hidden = future.children.length > 0;
	currentDate.dateTime = [
		today.getFullYear(),
		String(today.getMonth() + 1).padStart(2, '0'),
		String(today.getDate()).padStart(2, '0')
	].join('-');
	currentDate.textContent = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	}).format(today);

	page.classList.add('timeline-ready');

	var historicalEntries = history.querySelectorAll('.timeline-entry');
	if (!('IntersectionObserver' in window)) {
		history.classList.add('is-growing');
		historicalEntries.forEach(function (entry) { entry.classList.add('is-visible'); });
		return;
	}

	var observer = new IntersectionObserver(function (observedEntries) {
		observedEntries.forEach(function (observedEntry) {
			if (observedEntry.isIntersecting) {
				history.classList.add('is-growing');
				observedEntry.target.classList.add('is-visible');
				observer.unobserve(observedEntry.target);
			}
		});
	}, { threshold: 0.18 });

	historicalEntries.forEach(function (entry) { observer.observe(entry); });
})();
