import type { User, UserInput } from "../lib/types";
import axios from 'axios';
import Cookies from 'js-cookie';
import ENV from '../conf/env.json';

/*
 * Registers a new user via the backend
 * @param userInput the user input
 */
export async function register(userInput: UserInput) {
    return axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.REGISTER, userInput);
}

/*
 * Gets the user data of the currently logged in user
 * @returns the user object
 */
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

/*
 * Gets all the registered users
 * @returns the list of users
 */
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

/*
 * Updates the users credentials
 * @param userInput the user input
 */
export function updateUserData(userInput: UserInput){
    return axios.put(ENV.BACKEND_URL.DEV + ENV.SERVICE.USER, userInput, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt")
        }
    });
}

/*
 * Deletes the user
 * @function
 */
export function deleteUser(){
    return axios.delete(ENV.BACKEND_URL.DEV + ENV.SERVICE.USER, {
        headers: {
            Authorization: "Bearer " + Cookies.get("jwt")
        }
    });
}