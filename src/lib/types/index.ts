/*
 * Represents a user
 * @typedef {Object} User
 * @property {string} id - The user's id
 * @property {string} username - The user's username
 * @property {Chat[] | null} chatList - The user's chat list
 */
export type User = {
    id: string;
    username: string;
    chatList: Chat[] | null;
}

/*
 * Represents the user input
 * @typedef {Object} UserInput
 * @property {string} username - The user's username
 * @property {string} password - The user's password
 * @property {string[]} chatIds - The user's chat ids
 */
export type UserInput = {
    username: string;
    password: string;
    chatIds: string[];
}

/*
 * Represents a chat between users
 * @typedef {Object} Chat
 * @property {string} chatId - The chat's id
 * @property {User[]} participants - The chat's participants
 * @property {Message[]} messages - The chat's messages
 */
export type Chat = {
    chatId: string;
    participants: User[];
    messages: Message[];
}

/*
 * Represents a message in a chat
 * @typedef {Object} Chat
 * @property {string} id - The chat's id
 * @property {User[]} participants - The chat's participants
 * @property {Message[]} messages - The chat's messages
 */
export type Message = {
    id: string | null;
    chatID: string;
    messageText: string;
    aiOptions: string | null;
}