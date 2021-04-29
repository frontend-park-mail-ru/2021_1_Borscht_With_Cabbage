class Socket {
    constructor () {
        this.messageHandlers = new Set();
        this.socketTimer = null;
    }

    subscribe (event, handler) {
        this.messageHandlers.add(handler);
    }

    send (data) {
        this.socket.send(JSON.stringify(data));
    }

    connect (id) {
        this.id = id;
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.OPEN || connectionState === WebSocket.CONNECTING) {
            return;
        }
        this.socket = new WebSocket(`ws://127.0.0.1:5000/ws/${this.id}`);
        this.socket.onopen = () => {
            this.socketTimer = setInterval(() => this.socket.send(''), 10000);
        };
        this.socket.onmessage = (event) => {
            this.messageHandlers.forEach((handler) => {
                handler(event);
            });
        };
        this.socket.onclose = () => {
            clearInterval(this.socketTimer);
            this.socketTimer = null;
        };
    }

    disconnect () {
        const connectionState = this.socket?.readyState;
        if (connectionState !== WebSocket.CLOSED && connectionState !== WebSocket.CLOSING) {
            this.socket.close();
        }
    }
}

export default new Socket();
