import store from '../index';
import axios from '../../plugins/axios';
import {
    Module,
    VuexModule,
    getModule,
    Action,
    Mutation,
    MutationAction
} from 'vuex-module-decorators';
import { SignUpUser } from "../sign-up-user.model";
import { auth } from "../../firebase/credentials";
import router from '../../router';


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class SignUpModule extends VuexModule {
    //Loginしているか
    private loggedIn = false;
    private loggedInUser: SignUpUser[] | null = [];
    private error: string | null = null;

    /**
     * サインインしたユーザーを保存
     * @param user
     */
    @Mutation
    public saveSignUpUser(user: SignUpUser) {
        console.log(user);
        this.loggedInUser!.push(user);
        this.loggedIn = true;
        console.log(this.loggedInUser);
    }

    /**
     * エラ〜メッセージをerrorStateに保存
     * @param message
     */
    @Mutation
    public saveError(message: string) {
        this.error = message;
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
                router.push('/');
            })
            .catch(error => {
                console.log(error.message);
                this.saveError(error.message);
            });

    }

    //ログインしているか
    public get loggedInState() {
        return this.loggedIn;
    }
    //エラーはあるか
    public get errorMessage() {
        return this.error
    }

}


export const signUpStore = getModule(SignUpModule);
console.log(signUpStore.loggedInState);
