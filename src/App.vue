<template>
    <div id="app">
        <NavComponent v-if="!displayNavigation" />
        <router-view />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import NavComponent from '@/components/NavComponent.vue';
import { UserStore } from "./store/User/user";


export default defineComponent({
    components: {
        NavComponent
    },
    setup(){
      const displayNavigation = computed(()=>{
          return UserStore.getLoggedInUserState
      })
        return {
          displayNavigation,
        }
    }

});
</script>
