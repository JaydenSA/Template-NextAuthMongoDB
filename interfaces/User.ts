export interface UserDocument {
    _id: string;
    email: string;
    password: string;
    name: string;
    username: string;
    image: string;
    surname: string;
}

export interface UserInputs {
    email: string;
    password: string;
    name: string;
    surname: string;
}

export interface userProfile {
    email: string;
    name: string;
    surname: string;
    image: string;
}