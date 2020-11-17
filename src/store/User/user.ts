import store from '../index';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { DbUser, UserModel } from "../user.model";
import { auth, db } from "../../firebase/credentials";
import router from '../../router';


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class User extends VuexModule {

    private loggedInUser: UserModel[] = [];
    private dbUsers: DbUser[] = [];
    private error: string | null = null;

    /**
     * 登録したユーザーを保存
     * @param user
     */
    @Mutation
    saveSignUpAndSignInUser(user: UserModel) {
        this.loggedInUser!.push(user);
    }

    /**
     * データベースのユーザーを保存
     * @param dbUsers
     */
    @Mutation
    saveDbUsers(dbUsers: DbUser){
        this.dbUsers.push(dbUsers);
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
     * logout ユーザーをlogoutさせる
     * params uid
     */
    @Mutation
    clearLoginUser(uid: string) {
        if (uid) {
            const user = this.loggedInUser.findIndex(user => user.uid === uid);
            this.loggedInUser.splice(user, 1);
            router.push('/sign-up');
        }
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
                    const userSignUpAndLogin = {
                        email: res.user!.email,
                        uid: res.user!.uid,
                        yen,
                        username
                    };
                    this.getDbUsers();
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
                this.getDbUsers();
                this.getDbUser(userLoginId);
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
        const userSignUpAndLogin = querySnapshot.docs[0].data()
        this.saveSignUpAndSignInUser(userSignUpAndLogin as UserModel);
        await router.push('/dashboard');
    }

    /**
     * logout ユーザーをlogoutさせる
     * params uid
     */
    @Action
    clearUser(uid: string) {
        auth.onAuthStateChanged(user => {
            auth.signOut().then(() => {
                this.clearLoginUser(uid);
            })
                .catch(error => console.log(error))
        });
    }

    /**
     * Users DBから全てのユーザーを取得
     */
    @Action
    getDbUsers() {
        db.collection("Users").get()
            .then((data)=> {
               data.docs.forEach(doc => {
                   const dbUser: DbUser = {
                       uid: doc.data().uid,
                       username: doc.data().username,
                       yen: doc.data().yen
                   }
                  this.saveDbUsers(dbUser)

               })
            })
            .catch(error => console.log(error))
    }

    //エラーはあるか
    get getErrorMessage() {
        return this.error;
    }

    //ユーザーを取得
    get getLoggedInUser() {
        return this.loggedInUser;
    }

    get getUsers() {
        const userUid = this.loggedInUser[0].uid;
        return this.dbUsers.filter(user => user.uid !== userUid);
    }

    //ログインしているか？
    get getLoggedInUserState() {
        return this.loggedInUser.length > 0;
    }

    //ログインユーザーのyenを取得
    get getLoggedInUserPayment(){
        return this.loggedInUser[0].yen
    }

}


export const UserStore = getModule(User);
