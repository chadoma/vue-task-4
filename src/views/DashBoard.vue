<template>
        <div class="dashboard">
            <div class="dashboard__wrapper">
                <div class="dashboard__phrase-slider">
                    <span class="dashboard__phrase">Time&nbsp;is&nbsp;money&nbsp;Be&nbsp;careful&nbsp;not&nbsp;to&nbsp;regret&nbsp;it&nbsp;later.</span>
                    <span class="dashboard__phrase">Time&nbsp;is&nbsp;money&nbsp;Be&nbsp;careful&nbsp;not&nbsp;to&nbsp;regret&nbsp;it&nbsp;later.</span>
                </div>
            </div>
                <h2 v-if="loginUser">ようこそ{{ loginUser[0].username }}</h2>
                <ul>
                    <li v-for="(user, index) in loginUser" :key="index">
                        {{ user.username }}::: {{ user.yen }}
                    </li>
                </ul>
        </div>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from '@vue/composition-api'
import { UserStore } from '@/store/User/user';

export default defineComponent({
    name: 'DashBoard',
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


