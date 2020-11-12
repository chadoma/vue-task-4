<template>
  <div>
    <Form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Form from '@/components/Form.vue';

export default defineComponent({
  name: 'SignIn',
  components: {
    Form,
  },
});
</script>
