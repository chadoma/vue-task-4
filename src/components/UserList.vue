<template>
    <div class="user">
        <h3 class="user__heading">User一覧</h3>
        <ul class="user__users">
            <li class="user__user-title">ユーザー名</li>

            <li class="user__user-name">
                aaaa
                <div class="user__btn-wrap">
                    <md-button class="user__btn-watch">walletを見る</md-button>
                    <md-button class="user__btn-send">送る</md-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";
export default defineComponent({

})
</script>

<!--ユーザーを全員表示-->
