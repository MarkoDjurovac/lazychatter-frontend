import type { IUser } from '../types';

export async function authenticate(username: string, accessToken: string): Promise<IUser | null> {
    const res = await fetch('/users.json');
    const users: IUser[] = await res.json();
    const loginUser = users.find(user => user.uname === username && user.accessToken === accessToken);
    
    return loginUser || null;
}