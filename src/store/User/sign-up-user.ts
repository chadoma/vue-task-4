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


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class SignUpModule extends VuexModule {
    //Loginしているか
    private loggedIn = false;
    private user: SignUpUser[] = [];

    @Mutation
    public saveUser(data: SignUpUser[]) {
        console.log(data);
        this.user.push(data as any);
        this.loggedIn = true;
        console.log(this.user);
    }

    /**
     * ユーザー登録
     * param email password
     */
    @Action
    public async signUpUser(
        {
            email,
            password
        }: {
            email: string;
            password: string;
        }) {
        try {
            const res = await axios.post(
                `/accounts:signUp?key=${ process.env.VUE_APP_FIREBASE_API_KEY }`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }

            );
            this.saveUser(res.data);

        } catch (error) {
            throw new error();
        }
    }

    public get loggedInState() {
        return this.loggedIn;
    }

}


export const signUpStore = getModule(SignUpModule);
console.log(signUpStore.loggedInState);
