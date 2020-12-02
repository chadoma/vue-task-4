export interface UserModel {
    email: string
    uid: string
    username: string
    yen: number
}

export interface DbUser {
    uid: string,
    username: string,
    yen: number
}

export interface SaveUsersWallet{
    sendTargetUid: string
    calcTargetWallet: number
    calcMyWallet: number
}

