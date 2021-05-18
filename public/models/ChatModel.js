import eventBus from '../modules/eventBus.js';
import { getChatMessage, getChats } from '../modules/api.js';
import socket from '../modules/socket.js';

class ChatModel {
    constructor () {
    }

    sendMessage (message) {
        const data = {
            action: 'message',
            payload: message
        };
        socket.send(data);
    }

    subscribe (handler) {
        socket.subscribe(handler);
    }

    getChatsMessage ({ id, handler, successEvent, failEvent }) {
        getChatMessage(id)
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(successEvent, res.parsedJSON);
                } else {
                    eventBus.emit(failEvent, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(failEvent, res.parsedJSON));
    }

    getChats (successEvent, failEvent) {
        getChats()
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(successEvent, res.parsedJSON);
                } else {
                    eventBus.emit(failEvent, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(failEvent, res.parsedJSON));
    }
}

export default new ChatModel();
