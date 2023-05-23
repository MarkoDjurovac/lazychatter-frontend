import type { IUser, IConversation } from '../types';

export async function getConversations( user: IUser ) {
    const res = await fetch('/conversations.json');
    const conversations: IConversation[] = await res.json().then( result => 
        result.filter(conversation => 
            conversation.participants.find(participant => participant.id === user.id)
        )
    );

    return conversations;
}