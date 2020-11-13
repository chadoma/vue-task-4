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

              <md-button class="register__btn md-light" type="submit">ログインする</md-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const state = reactive({
      email: '',
      password: '',
    });
    return {
      ...toRefs(state),
    };
  },
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
</style>
