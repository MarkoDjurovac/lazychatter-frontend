import axios from 'axios';
import ENV from '../conf/env.json';

// Endpoint: /message
export async function sendMessage(chatId: string, messageText: string) {
    return axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.MESSAGE, {
            id: null,
            chatID: chatId,
            messageText: messageText,
            aiOptions: null
        },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }
    );
}

// Endpoint: /chat/{chatId}
export function getMessagesByChatId(chatId: string) {
    return axios.get(ENV.BACKEND_URL.DEV + ENV.SERVICE.MESSAGE + ENV.SERVICE.CHAT + "/" + chatId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
        }
    });
}