<template>
  <div>
    <SignUpForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SignUpForm from '@/components/SignUpForm.vue';

export default defineComponent({
  name: 'SignIn',
  components: {
    SignUpForm,
  },
});
</script>
