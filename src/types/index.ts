export interface IUser {
    id: number;
    name: string;
    profilePicture: string;
    uname: string;
    accessToken: string;
}

export interface IMessage {
    id: number;
    sender: IUser;
    recipient: IUser;
    sent: boolean;
    text: string;
    timestamp: string;
}
  
export interface IConversation {
    id: number;
    title: string;
    user: IUser,
    participants: IUser[];
    messages: IMessage[];
}