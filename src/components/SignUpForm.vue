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
                    type="email"
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
                    v-model.trim="confirmPassword"
                    type="text"
                    required
                    class="register__input"
                    autocomplete="off"
                    name="password2"
                />
                <label for="pass2" class="register__label">パスワード確認</label>
                <div class="register__underline"></div>
            </div>

            <md-button class="register__btn md-light" :disabled="displayButton" type="submit">登録する</md-button>
            <span class="danger">{{ displayError }}</span>


        </form>
        <div class="register__right-box">
            <h2 class="register__with">ソーシャルアカウントでログイン</h2>
            <md-button class="register__social-facebook">Log in with Face book</md-button>
            <md-button class="register__social-twitter">Log in with Twitter</md-button>
            <md-button class="register__social-google">Log in with Google+</md-button>
            <p class="register__login">
                既にアカウントをお持ちの方
                <router-link :to="{ name: 'SignIn' }">ログイン</router-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from '@vue/composition-api';
import { UserStore } from '../store/User/user';
import { useValidator } from "../util-function/validation";


export default defineComponent({
    setup() {
        const { isValidEmail, isValidPassword } = useValidator();
        const state = reactive({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            //ユーザー登録
            signUpUser: () => {
                {
                    UserStore.signUpUser({
                        username: state.username,
                        email: state.email,
                        password: state.password
                    });
                }
            },
            displayButton: computed((): boolean => {
                return !isValidEmail(state.email) || isValidPassword(state.password, state.confirmPassword);
            }),
            displayError: computed(() => {
                return UserStore.getErrorMessage;
            })
        });
                return {
                    ...toRefs(state)
        };
    }
});
</script>

<style lang="scss" scoped>
.danger {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 400;
    color: #fff;
    background-color: #FF5058;
}
</style>
