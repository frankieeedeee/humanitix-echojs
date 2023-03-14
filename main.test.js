beforeEach(() => {
    // Need to spoof the origin during testing
    window.addEventListener('message', (event) => {
        if (event.origin) return;

        event.stopImmediatePropagation();

        const eventWithOrigin = new MessageEvent('message', {
            data: event.data,
            origin: 'events.humanitix.com'
        });

        window.dispatchEvent(eventWithOrigin);
    });
});

test('it logs message to console when event is dispatched', async () => {
    console.log = jest.fn();

    require('./main.js');

    window.postMessage('This is a test message', '*');

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(console.log).toBeCalledWith('Received a message from origin', 'events.humanitix.com');
});