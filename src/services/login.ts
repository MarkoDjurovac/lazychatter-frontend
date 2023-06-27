import type { UserInput, User } from "../lib/types";
import Cookies from "js-cookie";
import axios from "axios";
import ENV from "../conf/env.json";

/*
 * Calls the backend to authenticate the user
 * @param userInput the user input
 * @returns the jwt object
 */
export async function login(userInput: UserInput): Promise<User | null> {
    const response = await axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.LOGIN, {}, {
        auth: {
            username: userInput.username,
            password: userInput.password
        }
    });

    if(response.status === 200)
    {
        Cookies.set('jwt', response.data, { secure: true, sameSite: 'strict' });

        return {
            username: userInput.username,
            chatList: null
        } as User;
    } 
    else
    {
        return null;
    }
}