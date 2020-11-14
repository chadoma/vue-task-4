import store from '../index';
import {
    Module,
    VuexModule,
    getModule,
    Action,
    Mutation, MutationAction
} from 'vuex-module-decorators';
import { User, DbUser } from "../user.model";
import { auth, db } from "../../firebase/credentials";
import router from '../../router';


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class SignUpModule extends VuexModule {

    private loggedInUser: User[] | null = [];
    private error: string | null = null;
    spinner = false;

    /**
     * 登録したユーザーを保存
     * @param user
     */
    @Mutation
    saveSignUpAndSignInUser(user: User) {
        this.loggedInUser!.push(user);
    }

    /**
     * エラ〜メッセージをerrorStateに保存
     * @param message
     */
    @Mutation
    saveError(message: string) {
        this.error = message;
    }

    @Mutation
    inspectSpinner(road: boolean) {
        this.spinner = road;
    }

    /**
     * Authentication, firestore へのユーザー登録
     * param email password
     * param uid username yen
     */
    @Action
    signUpUser({ email, password, username }: { email: string, password: string, username: string }) {
        const yen = 500;
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                    console.log(res);
                    const userSignUpAndLogin = {
                        email: res.user!.email,
                        uid: res.user!.uid,
                        yen,
                        username
                    };
                    db.collection('Users').add({
                        uid: res.user!.uid,
                        username,
                        yen
                    })
                      .then(doc => {
                          this.saveSignUpAndSignInUser(userSignUpAndLogin as User);
                          router.push('dashboard');
                      });
                }
            )
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
    signInUser({ email: email, password: password }: { email: string, password: string }) {
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                const userLogin = {
                    email: res.user!.email,
                    uid: res.user!.uid
                };
                this.saveSignUpAndSignInUser(userLogin as User);
                console.log(res);

                router.push('/dashboard');
            })
            .catch(error => {
                console.log(error.message);
                this.saveError(error.message);
            });
    }



    //エラーはあるか
    get getErrorMessage() {
        return this.error;
    }

    //ユーザーを取得
    get getLoggedInUser() {
        return this.loggedInUser;
    }
}


export const UserStore = getModule(SignUpModule);
// console.log(UserStore.loggedInState);
