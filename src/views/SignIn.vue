<template>
  <div>
    <SignInForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SignInForm from '../components/SignInForm.vue';
export default defineComponent({
  components: {
    SignInForm,
  },
});
</script>
