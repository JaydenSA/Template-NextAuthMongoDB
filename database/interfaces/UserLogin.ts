export interface UserLoginDocument {
    _id?: string;
    email: string;
    password: string;
    role: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
}