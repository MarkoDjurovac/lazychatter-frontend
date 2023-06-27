import axios from 'axios';
import Cookies from 'js-cookie';
import ENV from '../conf/env.json';
import type { Message } from '$lib/types';

// Endpoint: /message
export async function sendMessage(message: Message) {
    return axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.MESSAGE, {
            id: message.id,
            chatID: message.chatID,
            sender: message.sender,
            messageText: message.messageText,
            aiOptions: message.aiOptions
        },
        {
            headers: {
                Authorization: "Bearer " + Cookies.get("jwt")
            }
        }
    );
}

// Endpoint: /chat/{chatId}
export async function getMessagesByChatId(chatId: string): Promise<Message[]> {
    const result = await axios.get(ENV.BACKEND_URL.DEV + ENV.SERVICE.MESSAGE + ENV.SERVICE.CHAT + "/" + chatId, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt")
        }
    });

    return result.data.map((message: Message) => {
        return {
            id: message.id,
            chatID: message.chatID,
            messageText: message.messageText,
            aiOptions: message.aiOptions,
            sender: message.sender
        } as Message;
    })
}