<template>
    <DashBoardWrap>
        <div class="dashboard__content">
            <div class="dashboard__heading-container">
                <h2 class="dashboard__heading-welcome">ようこそ{{ loginUser[0].username }}さん</h2>
                <h2 class="dashboard__heading-balance">残高: {{ loginUser[0].yen }}</h2>
                <md-button class="dashboard__btn" @click="logOutUser" v-show="loginUser">ログアウトする</md-button>
            </div>
            <UserList :users="dbUsers" :loginUser="loginUser"/>
        </div>

    </DashBoardWrap>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from '@vue/composition-api'
import { UserStore } from '@/store/User/user';
import DashBoardWrap from "@/components/DashBoardWrap.vue";
import UserList from "@/components/UserList.vue";

export default defineComponent({
    name: 'DashBoard',
    components: {
        DashBoardWrap,
        UserList
    },
    setup() {
        const state = reactive({
            loginUser: computed(() => {
                return UserStore.getLoggedInUser
            }),
            dbUsers:  computed(() =>{
               if (state.loginUser){
                  return UserStore.getUsers
               }
            }),
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            logOutUser: () => {
                if (state.loginUser) {
                    UserStore.clearUser(state.loginUser[0].uid)
                }
            }
        })

        return {
            ...toRefs(state)
        }
    }

})
</script>


