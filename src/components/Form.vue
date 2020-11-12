<template>
  <div class="register" @submit.prevent="signUpUser">
    <form class="register__left-box">
      <h1 class="register__heading">新規登録</h1>
      <div class="register__data">
        <input
            id="username"
            v-model.trim="username"
            type="text"
            required
            class="register__input"
            autocomplete="off"
            name="username"
        />
        <label for="username" class="register__label">氏名</label>
        <div class="register__underline"></div>
      </div>
      <div class="register__data">
        <input
            id="email"
            v-model.trim="email"
            type="text"
            required
            class="register__input"
            autocomplete="off"
            name="email"
        />
        <label for="email" class="register__label">メールアドレス</label>
        <div class="register__underline"></div>
      </div>
      <div class="register__data">
        <input
            id="pass"
            v-model.trim="password"
            type="text"
            required
            class="register__input"
            autocomplete="off"
            name="password"
        />
        <label for="pass" class="register__label">パスワード</label>
        <div class="register__underline"></div>
      </div>
      <div class="register__data">
        <input
            id="pass2"
            v-model="password2"
            type="text"
            required
            class="register__input"
            autocomplete="off"
            name="password2"
        />
        <label for="pass2" class="register__label">パスワード確認</label>
        <div class="register__underline"></div>
      </div>
      <button class="register__btn" type="submit">登録する</button>
    </form>
    <div class="register__right-box">
      <h2 class="register__with">ソーシャルアカウントでログイン</h2>
      <button class="register__social-facebook">Log in with Face book</button>
      <button class="register__social-twitter">Log in with Twitter</button>
      <button class="register__social-google">Log in with Google+</button>
      <p class="register__login">
        既にアカウントをお持ちの方
        <router-link :to="{ name: 'SignIn' }">ログイン</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { signUpStore } from '../store/User/sign-up-user';

export default defineComponent({
  setup() {
    const state = reactive({
      username: '',
      email: '',
      password: '',
      password2: '',
      //ユーザー登録
      signUpUser: async () => {
        if (
            state.email.toString() !== '' &&
            state.password.toString() === state.password2.toString()
        ) {
          await signUpStore.signUpUser({
            email: state.email,
            password: state.password,
          });
          console.log(state.email, state.password);
        } else {
          console.log('違います');
        }
      },
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
