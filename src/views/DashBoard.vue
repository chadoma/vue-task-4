<template>
    <div>
        <h2 v-if="loginUser">ようこそ{{ loginUser[0].email }}</h2>
    </div>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from '@vue/composition-api'
import { UserStore } from '@/store/User/user';

export default defineComponent({
    setup() {
        const state = reactive({
            loginUser: computed(() => {
               return UserStore.getLoggedInUser
            })
        })
        return {
            ...toRefs(state)
        }
    }

})
</script>

<!--TODO
loginしたユーザー配列を取得してくる
-->

<!--TODO
loginしたユーザーを表示
-->
