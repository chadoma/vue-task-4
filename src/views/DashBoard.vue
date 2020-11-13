<template>
    <form @submit.prevent="dataIn">
        aaa
        <input type="text" v-model="name">
        <input type="text" v-model="zeni">
        <button type="submit">aaaaaaaaaaa</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { signUpStore } from "../store/User/sign-up-user";


export default defineComponent({
    setup() {
        const state = reactive({
            name: '',
            zeni: '',

            dataIn: async () => {
                await signUpStore.userDataPush(name);
            }
        });
        return {
            ...toRefs(state)
        };
    }
});
</script>
<!--https://throw-money-9c394.firebaseio.com/-->
