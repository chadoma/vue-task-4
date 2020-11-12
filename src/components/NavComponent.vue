<template>
    <div class="nav">
        <div class="nav__container">
            <h1 class="nav__heading">Title</h1>
            <nav class="nav__nav">
                <router-link class="nav__link-in md-accent" to="/sign-in"></router-link>
                <router-link class="nav__link" to="/sign-up"></router-link>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';


export default defineComponent({
    setup() {
        const signInUser = () => {
            console.log('aaa');
        };
        return {
            signInUser
        };
    }
});
</script>
