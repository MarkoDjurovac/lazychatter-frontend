import type { UserInput } from "../lib/types";
import axios from "axios";
import ENV from "../conf/env.json";

/*
 * Calls the backend to authenticate the user
 * @param userInput the user input
 * @returns the jwt
 */
export async function login(userInput: UserInput) {
    return await axios.post(ENV.BACKEND_URL.DEV + ENV.SERVICE.LOGIN, {}, {
        auth: {
            username: userInput.username,
            password: userInput.password
        }
    })
    .then(response => {
        localStorage.setItem("jwt", response.data);
        return response.data;
    })
    .catch(error => {
        console.error(error);
    });
  }