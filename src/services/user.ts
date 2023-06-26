import type { UserInput } from "../lib/types";
import axios from 'axios';
import ENV from '../conf/env.json';

// Endpoint: /register
export function register(userInput: UserInput) {
    return axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.REGISTER, userInput);
}

// Endpoint: /me
export function getMyUserData() {
}

export function getUserList() {
    return axios.get(ENV.BACKEND_URL.DEV + ENV.SERVICE.USER_LIST, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
        }
    });
}