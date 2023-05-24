import type { IUser, IConversation, IMessage } from "../types";

export async function sendMessage( user: IUser, conversation: IConversation, message: string ) {
    const res = await fetch("conversations.json");
    const conversations: IConversation[] = await res.json();
    const currentConversation: IConversation = conversations.find( c => c.id === conversation.id );

    currentConversation.messages.push( {
        id: currentConversation.messages.length + 1,
        senderId: user.id,
        sent: true,
        text: message,
        timestamp: new Date().toISOString()
    } as IMessage); 

    console.log(currentConversation.messages);

    return currentConversation;
}

export async function sendAiMessage( user: IUser, conversation: IConversation ) {
    const res = await fetch("conversations.json");
    const conversations: IConversation[] = await res.json();
    const currentConversation: IConversation = conversations.find( c => c.id === conversation.id );

    currentConversation.messages.push( {
        id: currentConversation.messages.length + 1,
        senderId: user.id,
        sent: true,
        text: "I'm a bot, beep boop",
        timestamp: new Date().toISOString()
    } as IMessage);

    console.log(currentConversation.messages);

    return currentConversation;
}