export interface UserModel {
    email: string | null
    uid: string
    username: string
    yen: number
}

export interface DbUser {
    uid: string,
    username: string,
    yen: number
}
