export interface User {
    _id: string
    name: string
    email: string
    avatar: string
}

export interface TokenUser extends User {
    token: string
}

export interface PasswordUser extends User {
    password: string
}