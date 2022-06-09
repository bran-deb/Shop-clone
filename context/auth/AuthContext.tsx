import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    // methods
    loginUser: (email: string, password: string) => Promise<boolean>
}


export const AuthContext = createContext({} as ContextProps)