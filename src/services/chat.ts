import axios from 'axios';
import Cookies from 'js-cookie';
import type { Chat, Message, User } from '../lib/types';
import ENV from '../conf/env.json';


export async function startNewChat(users: User[]): Promise<Chat>{

    const participants = users.map((user) => {
        return user.username;
    })

    const result = await axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.CHAT, participants, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
        }
    });

    return {
        chatId: result.data.chatId,
        paritcipants: result.data.paritcipants.map((username: string) => {
            return { username: username} as User;
        }),
        messages: null,
    } as Chat;
}

export async function getUserChats(): Promise<Chat[]>{
    const result = await axios.get(ENV.BACKEND_URL.DEV + ENV.SERVICE.CHAT, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
        }
    });
    

    return result.data.map((chat: any) => {
        return {
            chatId: chat.chatId,
            paritcipants: chat.paritcipants.map((username: string) => {
                return { username: username} as User;
            }),
            messages: chat.messages?.map((message: any) => {
                return {
                    id: message.id,
                    chatID: message.chatID,
                    messageText: message.messageText,
                    aiOptions: message.aiOptions,
                    sender: message.sender
                } as Message;
            }),
        } as Chat;
    });
}