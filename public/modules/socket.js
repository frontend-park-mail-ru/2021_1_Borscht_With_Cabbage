class Socket {
    constructor () {
        this.messageHandlers = new Set();
        // this.socketTimer = null;
    }

    subscribe (event, handler) {
        this.messageHandlers.add(handler);
    }

    send (data) {
        console.log('socket send -> ', data)
        this.socket.send(JSON.stringify(data));
    }

    connect (id) {
        this.id = id;
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.OPEN || connectionState === WebSocket.CONNECTING) {
            console.log('Socked already connected');
            return;
        }
        // this.socket = new WebSocket(`ws://127.0.0.1:5000/api/ws/${this.id}`);
        this.socket = new WebSocket(`ws://delivery-borscht.ru:5000/api/ws/${this.id}`);
        this.socket.onopen = () => {
            console.log('Socked connected');
            // this.socketTimer = setInterval(() => this.socket.send(''), 10000);
        };
        this.socket.onmessage = (event) => {
            console.log('Socked message -> ', event);
            this.messageHandlers.forEach((handler) => {
                handler(JSON.parse(event.data));
            });
        };
        this.socket.onclose = () => {
            console.log('Socked close');
            // clearInterval(this.socketTimer);
            // this.socketTimer = null;
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
