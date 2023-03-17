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

        // Respond to Meta Pixel echo events
        if (metaPixelIsAvailable && event.data.type === 'hx-metapixel-echo') {
            window.fbq(...event.data.contents);
        }

        // Happy path if dataLayer is not available
        if (!dataLayerIsAvailable) {
            return;
        }

        // Parse the data layer data being echoed
        const dlEcommerceEvent = event.data.contents.event;
        const dlEcommerceData = event.data.contents.ecommerce;

        if (dlEcommerceEvent && dlEcommerceData) {
            window.dataLayer.push({
                event: 'hx-echo',
                hx_echo_event: dlEcommerceEvent,
                ecommerce: dlEcommerceData
            });
        }
    });
})(window);