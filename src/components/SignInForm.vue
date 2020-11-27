<template>
    <div class="register">
        <form class="register__left-box signin" @submit.prevent="signInUser">
            <h1 class="register__heading">ログイン</h1>
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

                <div class="register__data signin">
                    <input
                        id="pass"
                        v-model.trim="password"
                        type="password"
                        required
                        class="register__input"
                        autocomplete="off"
                        name="password"
                    />
                    <label for="pass" class="register__label">パスワード</label>
                    <div class="register__underline"></div>
                </div>

                <md-button class="register__btn md-light" :disabled="displayButton" type="submit">ログインする</md-button>
                <div>
                    <span class="danger">{{ displayError }}</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from '@vue/composition-api';
import { UserStore } from '../store/User/user';
import { useValidator } from '../util-function/authValidation';

export default defineComponent({
    setup() {
        const {isValidEmail, isValidPasswordLength} = useValidator()
        const state = reactive({
            email: '',
            password: '',

            signInUser: () => {
                {
                    UserStore.signInUser({
                        email: state.email,
                        password: state.password
                    });
                }
            },

            displayButton: computed((): boolean =>{
               return !isValidEmail(state.email) || isValidPasswordLength(state.password)
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
.signin {
    margin-top: 35px;
}

.signin input {
    margin-bottom: 15px;
}

.signin button {
    margin-top: 50px;
}

.danger {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 400;
    color: #fff;
    background-color: #FF5058;
}
</style>
