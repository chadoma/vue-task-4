<template>
  <div id="app">
    <NavComponent />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import NavComponent from '@/components/NavComponent.vue';
export default defineComponent({
  components: {
    NavComponent,
  },
});
</script>
