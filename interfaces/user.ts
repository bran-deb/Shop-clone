

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password?: string,//backend
    role: string,
    //agregar createdAt y updatedAt
    createdAt?: string;
    updatedAt?: string;
}

type role = | 'admin' | 'client'