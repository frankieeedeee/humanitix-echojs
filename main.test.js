beforeEach(() => {
    // Need to spoof the origin during testing
    window.addEventListener('message', (event) => {
        if (event.origin) return;

        event.stopImmediatePropagation();

        const eventWithOrigin = new MessageEvent('message', {
            data: event.data,
            origin: 'https://events.humanitix.com'
        });

        window.dispatchEvent(eventWithOrigin);
    });
});

test('it echos data layer events', async () => {
    window.dataLayer = {
        push: jest.fn()
    };

    require('./main.js');

    const message = {
        type: 'hx-datalayer-echo',
        contents: {
            event: 'some-ecommerce-event',
            ecommerce: 'some-ecommerce-data'
        }
    };

    window.postMessage(message, '*');

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(window.dataLayer.push).toBeCalledWith({
        event: 'hx-echo',
        hx_echo_event: 'some-ecommerce-event',
        ecommerce: 'some-ecommerce-data'
    });
});

test('it echos meta pixel events', async () => {
    window.fbq = jest.fn();

    require('./main.js');

    const message = {
        type: 'hx-metapixel-echo',
        contents: ['fbq param 1', 'fbq param 2', 'fbq param 3']
    };

    window.postMessage(message, '*');

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(window.fbq).toBeCalledWith('fbq param 1', 'fbq param 2', 'fbq param 3');
});