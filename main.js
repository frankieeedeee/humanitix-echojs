(function(w) {
    w.addEventListener('message', (event) => {
        console.log('Received a message from: ' + event.origin, event.data);
    });
})(window);