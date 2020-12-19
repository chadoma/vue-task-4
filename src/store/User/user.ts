import store from '../index';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { DbUser, SaveUsersWallet, UserModel } from "../user.model";
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

    @Mutation
    saveDbUsers(dbUsers: DbUser) {
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
            router.push('/sign-in');
        }
    }

    /**
     * 送り先のユーザーyenを更新
     * @param targetId
     * @param calcWallet
     */
    @Mutation
    updateDbUser({ sendTargetUid, calcTargetWallet }: { sendTargetUid: string, calcTargetWallet: number }) {
        const index = this.dbUsers.findIndex(user => user.uid === sendTargetUid);
        this.dbUsers[index].yen = calcTargetWallet;
    }


    /**
     * 送ったユーザーのyenを更新
     * @param targetId
     * @param calcWallet
     */
    @Mutation
    updateLoginUser({ myId, calcMyWallet }: { myId: string, calcMyWallet: number }) {
        const index = this.loggedInUser.findIndex(user => user.uid === myId);
        this.loggedInUser[index].yen = calcMyWallet;
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
                    const userSignUpAndLogin: UserModel = {
                        email: res.user!.email!,
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
    signInUser({ email, password }: { email: string, password: string }) {
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
        const userSignUpAndLogin = querySnapshot.docs[0].data();
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
                .catch(error => console.log(error));
        });
    }

    /**
     * Users DBから全てのユーザーを取得
     */
    @Action
    getDbUsers() {
        db.collection("Users").get()
          .then((data) => {
              data.docs.forEach(doc => {
                  const dbUser: DbUser = {
                      uid: doc.data().uid,
                      username: doc.data().username,
                      yen: doc.data().yen
                  };
                  this.saveDbUsers(dbUser);

              });
          })
          .catch(error => console.log(error));
    }

    /**
     * 更新対象のユーザーyenを更新
     * @param sendTargetUid
     * @param calcTargetWallet
     * @param calcMyWallet
     */
    @Action
    async saveUsersWallet({ sendTargetUid, calcTargetWallet, calcMyWallet }: SaveUsersWallet) {

        try {
            const myId = this.getLoggedInUser[0].uid;
            const targetUserRef = await db.collection('Users')
                                          .where('uid', '==', sendTargetUid).get();
            const myUserRef = await db.collection('Users')
                                      .where('uid', '==', myId).get();
            await db.runTransaction(async transaction => {
                transaction
                    .update(db.collection('Users').doc(targetUserRef.docs[0].id), {
                        'yen': calcTargetWallet
                    })
                    .update(db.collection('Users').doc(myUserRef.docs[0].id), {
                        'yen': calcMyWallet
                    });
            })
                    .then(res => {
                        this.updateDbUser({ sendTargetUid, calcTargetWallet });
                        this.updateLoginUser({ myId, calcMyWallet });
                    });
        } catch (e) {
            throw new Error(`Failed transaction: ${ e.message }`);
        }
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
    get loggedInUserState() {
        return this.loggedInUser.length > 0;
    }
}

export const UserStore = getModule(User);
