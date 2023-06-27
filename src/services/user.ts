import type { User, UserInput } from "../lib/types";
import axios from 'axios';
import Cookies from 'js-cookie';
import ENV from '../conf/env.json';

// Endpoint: /register
export function register(userInput: UserInput) {
    return axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.REGISTER, userInput);
}

// Endpoint: /me
export async function getMyUserData(): Promise<User> {
    const result = await axios.get(ENV.BACKEND_URL.DEV + ENV.SERVICE.ME, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt")
        }
    });

    return {
        id: result.data.id,
        username: result.data.username
    } as User;
}

export async function getUserList(): Promise<User[]> {
    const result = await axios.get(ENV.BACKEND_URL.DEV + ENV.SERVICE.USER_LIST, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt")
        }
    });

    return result.data.map((username: string) => {
        return {
            username: username
        } as User;
    });
}

export function updateUserData(userInput: UserInput){
    return axios.put(ENV.BACKEND_URL.DEV + ENV.SERVICE.USER, userInput, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt")
        }
    });
}