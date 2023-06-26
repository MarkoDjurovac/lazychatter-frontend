import axios from 'axios';
import ENV from '../conf/env.json';
// Endpoint: /chat

export async function startNewChat(participants: string[]) {
    return axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.CHAT, participants, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
        }
    });
}

// Endpoint: /{chatId}/user
export function addUsersToChat() {

}

export function getUserChats() {
    return axios.get(ENV.BACKEND_URL.DEV + ENV.SERVICE.CHAT, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
    });
}