import store from '../index';
import axios from '../../plugins/axios';
import {
    Module,
    VuexModule,
    getModule,
    Action,
    Mutation
} from 'vuex-module-decorators';
import { SignUpUser } from "../sign-up-user.model";
import { auth } from "../../firebase/credentials";


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class SignUpModule extends VuexModule {
    //Loginしているか
    private loggedIn = false;
    private user: SignUpUser[] | null = [];
    private error: string | null = null;

    /**
     * サインインしたユーザーを保存
     * @param user
     */
    @Mutation
    public saveSignUpUser(user: SignUpUser) {
        console.log(user);
        this.user!.push(user);
        this.loggedIn = true;
        console.log(this.user);
    }

    /**
     * エラ〜メッセージをerrorStateに保存
     * @param error
     */
    @Mutation
    public saveError(error: string) {
        this.error = error;
    }

    /**
     * ユーザー登録
     * param email password
     */
    @Action
    public signUpUser({ email: email, password: password }: { email: string, password: string }) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                // console.log(res);
                this.saveSignUpUser({
                    email: res.user!.email,
                    refreshToken: res.user!.refreshToken,
                    uid: res.user!.uid
                })
            })
            .catch(error => {
                console.log(error);
                this.saveError(error);
            });

    }

    // @Action
    // public async signUpUser(
    //     {
    //         email,
    //         password
    //     }: {
    //         email: string;
    //         password: string;
    //     }) {
    //     try {
    //         const res = await axios.post(
    //             `/accounts:signUp?key=${ process.env.VUE_APP_FIREBASE_API_KEY }`,
    //             {
    //                 email: email,
    //                 password: password,
    //                 returnSecureToken: true
    //             }
    //
    //         );
    //         this.saveUser(res.data);
    //
    //     } catch (error) {
    //         throw new error();
    //     }
    // }

    @Action
    public async userDataPush(name: string) {
        try {
            const res = await axios.post(
                'https://throw-money-9c394.firebaseio.com/',
                {
                    withCredentials: true,
                    name: name
                }
            );
            console.log(res);

        } catch (error) {
            console.log(error);
        }

    }

    public get loggedInState() {
        return this.loggedIn;
    }

}


export const signUpStore = getModule(SignUpModule);
console.log(signUpStore.loggedInState);
