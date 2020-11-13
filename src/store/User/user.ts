import store from '../index';
import {
    Module,
    VuexModule,
    getModule,
    Action,
    Mutation,
} from 'vuex-module-decorators';
import { User } from "../user.model";
import { auth } from "../../firebase/credentials";
import router from '../../router';


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class SignUpModule extends VuexModule {
    //Loginしているか
    private loggedIn = false;
    private loggedInUser: User[] | null = [];
    private error: string | null = null;

    /**
     * 登録したユーザーを保存
     * @param user
     */
    @Mutation
    public saveSignUpUser(user: User) {
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
                const userSignUpAndLogin = {
                    email: res.user!.email,
                    uid: res.user!.uid,
                    refreshToken: res.user!.refreshToken
                }
                this.saveSignUpUser(userSignUpAndLogin as User)
                router.push('/');
            })
            .catch(error => {
                console.log(error.message);
                this.saveError(error.message);
            });

    }

    /**
     * ユーザーログイン
     * param email password
     */
    @Action
    public signInUser({email: email, password: password}: {email: string, password: string}){
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                const userLogin = {
                    email: res.user!.email,
                    uid: res.user!.uid,
                    refreshToken: res.user!.refreshToken
                }
                this.saveSignUpUser(userLogin as User)
                console.log(res);
                router.push('/')
            })
            .catch(error=>{
                console.log(error.message);
                this.saveError(error.message)
            })
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
