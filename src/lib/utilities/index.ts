import type { UserInput, User} from "$lib/types";

/*
 * Helper function to get user input from the form.
 * @function
 * @param event The event that triggered the function call.
 * @returns An object containing the user input.
 */
function getUserInput(event: Event) {
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const formData: FormData = new FormData(form);

    return {
        username: formData.get('username') as string,
        password: formData.get('password') as string
    } as UserInput;
}

/*
 * Checks if the user input meets the required criteria.
 * @function
 * @param userInput The user input to validate.
 * @returns An object containing the validation result.
 */
function validateUserInput(userInput: UserInput) {
    const usernameRegExp: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9_]{4,}$/;
    const passwordRegExp: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    
    if (!userInput.username || !userInput.password) {
        return {
            "isValid": false,
            "message": "Please fill in all fields."
        };
    }

    if (!usernameRegExp.test(userInput.username)) {
        return {
            "isValid": false,
            "message": "Username must be at least 5 characters long and can only contain letters, numbers and underscores."
        }
    }

    if (!passwordRegExp.test(userInput.password)) {
        return {
            "isValid": false,
            "message": "Password must be at least 8 characters long and contain at least one uppercase letter, one number and one special character."
        }
    }

    return {
        "isValid": true
    }
}

function getParticipants(participants: User[]): string {
    return participants.map((participant) => participant.username).join(', ');
}

const Utils = {
    getUserInput: getUserInput,
    validateUserInput: validateUserInput,
    getParticipants: getParticipants
}

export { Utils };