import eventBus from '../modules/eventBus.js';
import { getChatMessage, getChats } from '../modules/api.js';
import socket from '../modules/socket.js';

class ChatModel {
    constructor () {}

    sendMessage (message) {
        socket.send(message);
    }

    getChatsMessage ({ id, handler, successEvent, failEvent }) {
        socket.subscribe('message', handler);

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
