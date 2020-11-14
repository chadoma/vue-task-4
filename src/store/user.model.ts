export interface User {
    email: string
    uid: string
}

export interface DbUser extends User{
    username: string
    yen: number
}

