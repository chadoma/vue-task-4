<template>
    <DashBoardWrap>
        <div class="dashboard__content">
            <div class="dashboard__heading-container">
            <h2 class="dashboard__heading-welcome">ようこそ{{ loginUser[0].username }}さん</h2>
            <h2 class="dashboard__heading-balance">残高: {{ loginUser[0].yen }}</h2>
            </div>
        </div>
    </DashBoardWrap>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from '@vue/composition-api'
import { UserStore } from '@/store/User/user';
import DashBoardWrap from "@/components/DashBoardWrap.vue";

export default defineComponent({
    name: 'DashBoard',
    components: {
        DashBoardWrap,
    },
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


