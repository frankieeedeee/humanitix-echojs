(function(w) {
    w.addEventListener('message', (event) => {
        const permittedDomains = [
            'https://events.humanitix.com',
            'https://events-staging.humanitix.net',
            'https://events-experiments.humanitix.net'
        ];

        // Ensure we only respond to emitted events from known Humanitix pages
        if (permittedDomains.indexOf(event.origin) < 0) {
            return;
        }

        // Ensure we only respond to analytics echo events
        if (
            typeof event.data !== "object" ||
            (
                event.data.type !== 'hx-datalayer-echo' &&
                event.data.type !== 'hx-metapixel-echo'
            ) ||
            typeof event.data.contents === 'undefined') {
            return;
        }

        // Detect which analytics integrations are available
        const dataLayerIsAvailable = typeof window.dataLayer !== 'undefined';
        const metaPixelIsAvailable = typeof window.fbq !== 'undefined';

        // Respond to Data Layer echo events
        if (dataLayerIsAvailable && event.data.type === 'hx-datalayer-echo') {
            dataLayer.push(event.data.contents);
        }

        // Respond to Meta Pixel echo events
        if (metaPixelIsAvailable && event.data.type === 'hx-metapixel-echo') {
            fbq(...event.data.contents);
        }
    });
})(window);