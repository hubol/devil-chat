declare global {
    interface WebSocket {
        sendJson(value: any);
    }
}

Object.defineProperties(WebSocket.prototype, {
    sendJson: {
        value: function (value) {
            this.send(JSON.stringify(value));
        },
        enumerable: false
    },
});

export default 0;
