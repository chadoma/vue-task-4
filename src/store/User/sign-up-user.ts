import store from '@/store';
import axios from '@/plugins/axios';
import { Module, VuexModule, getModule, Action } from 'vuex-module-decorators';


@Module({ dynamic: true, store, name: 'User', namespaced: true })
class SignUpModule extends VuexModule {

  /**
   * ユーザー登録
   * param email password
   */
  @Action
  public async signUpUser({email, password}:{email: string, password: string}) {
    try {
      const res = await axios.post(
        `/accounts:signUp?key=${ process.env.VUE_APP_FIREBASE_API_KEY }`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        });
      console.log(res);
    } catch (error) {
      throw new error
    }
  }
}

export const signUpStore = getModule(SignUpModule);
