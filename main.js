(function(w) {
    w.addEventListener('message', (event) => {
        console.log('Received a message from origin', event.origin);
    });
})(window);