<template>
    <div ref="root"></div>


</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import gsap from 'gsap';



export default defineComponent({
setup(){
    const root = ref(null)

    onMounted(()=> {
        console.log(root.value)
    })
    return {
        root,
    }
}
});
</script>

<style scoped>
body {
    font-family: 'Oswald', sans-serif;
    background: #1a1a1d;
    color: #FFF;
    font-size: 80px;
    text-transform: uppercase;
    padding: 90px;
}

</style>
