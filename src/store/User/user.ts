import store from '../index';
import {
    Module,
    VuexModule,
    getModule,
    Action,
    Mutation, MutationAction
} from 'vuex-module-decorators';
import { UserModel } from "../user.model";
import { auth, db } from "../../firebase/credentials";
import router from '../../router';
import { shallowReactive } from "@vue/composition-api";
import firebase from 'firebase';


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class User extends VuexModule {

    private loggedInUser: UserModel[] = [];
    private error: string | null = null;
    spinner = false;

    /**
     * 登録したユーザーを保存
     * @param user
     */
    @Mutation
    saveSignUpAndSignInUser(user: any) {
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

    /**
     * スピンナーの有無
     * @param load
     */
    @Mutation
    inspectSpinner(load: boolean) {
        this.spinner = load;
    }

    /**
     * Authentication, firestore へのユーザー登録 ログイン
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
                    db.collection('Users').add(userSignUpAndLogin)
                      .then(doc => {

                          this.saveSignUpAndSignInUser(userSignUpAndLogin);
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
                const userLoginId = res.user!.uid;
                console.log(res.user!.uid);
                this.getDbUser(userLoginId);
                // this.saveSignUpAndSignInUser(userLogin as User);
                // router.push('/dashboard');
            })
            .catch(error => {
                console.log(error.message);
                this.saveError(error.message);
            });
    }

    /**
     * loginユーザーのDBデータ取得
     */
    @Action
    async getDbUser(userLoginId: string) {
        const querySnapshot = await db
            .collection('Users')
            .where('uid', '==', userLoginId)
            .get();
        console.log(querySnapshot.docs[0].data());
        this.saveSignUpAndSignInUser(querySnapshot.docs[0].data())
        await router.push('/dashboard')
    }


    //エラーはあるか
    get getErrorMessage() {
        return this.error;
    }

    //ユーザーを取得
    get getLoggedInUser() {
        return this.loggedInUser;
    }

    //ログインしているか？
    get loggedInUserState() {
        return this.loggedInUser.length > 0;
    }
}


export const UserStore = getModule(User);
// console.log(UserStore.loggedInState);
