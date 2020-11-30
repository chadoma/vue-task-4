<template>
    <div class="user">
        <h3 class="user__heading">User一覧</h3>
        <ul class="user__users">
            <li class="user__user-title">ユーザー名</li>
            <li class="user__user-name" v-for="(user) in users" :key="user.uid">
                {{ user.username }}
                <div class="user__btn-wrap">
                    <md-button @click="isOpenUserWallet(user.uid)" class="user__btn-watch">wallet
                        を見る
                    </md-button>
                    <md-button @click="isOpenUserPayment(user.uid)" class="user__btn-send">送る</md-button>
                </div>
            </li>
        </ul>
        <!-- dialog-->
        <md-dialog @md-closed="resetUser" class="md-accent dialog" :md-active.sync="showWalletDialog">
            <md-dialog-title class="md-primary dialog__title">{{ userName }}さんの残高</md-dialog-title>
            <p class="dialog__para">{{ userWallet }}円</p>
        </md-dialog>

        <md-dialog class="md-accent dialog" :md-active.sync="showPaymentDialog">
            <md-dialog-title class="md-primary dialog__title">
                あなたの残高: {{loginUser[0].yen}}<br />
                <span>送る金額</span>
            </md-dialog-title>
        <div class="input-content">
            <md-field>
                <label>数字を入力してください</label>
                <md-input v-model="pay"></md-input>
            </md-field>
            <md-button @click="sendPayment" class="input-button">送信</md-button>
        </div>
        </md-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { DbUser } from "../store/user.model";

export default defineComponent({
    props: {
        users: {
            type: Array as () => DbUser[]
        },
        loginUser: {
            type: Array
        }
    },
    setup(props) {
        const state = reactive({
            showWalletDialog: false,
            showPaymentDialog: false,
            userWallet: null as number | null,
            pay: null as number | null,
            userName: '',
            isOpenUserWallet: (id: string) => {
                const targetUserIndex: number = state.getUserWallet(id)
                state.userName = (props.users![targetUserIndex]).username
                state.showWalletDialog = true;
            },
            isOpenUserPayment: (id: string) => {
                state.getUserWallet(id)
                state.showPaymentDialog = true
            },
            getUserWallet: (id: string): number => {
                const targetUserIndex = props.users!.findIndex((user) => user!.uid === id)
                state.userWallet = (props.users![targetUserIndex]).yen
                return targetUserIndex
            },
            sendPayment: () => {
                console.log(state.pay)
            },
            resetUser: () => {
                state.userWallet = null
                state.pay = null
                state.userName = ''
            }
        });
            return {
                ...toRefs(state)
        };
    }
});
</script>

<style lang="scss" scoped>
.dialog {
    &__title {
        width: 350px;
        height: 100px;
        font-size: 2.7rem;
        text-align: center;
        font-weight: 400;
        background-color: #515764;
        margin: 0;
    }
    &__para {
        text-align: center;
        font-size: 2.3rem;
        font-weight: 400;
        padding-bottom: 30px;
        background-color: #515764;
    }
}
.input-content {
    height: 130px;
    background-color: #515764;
    position: relative;
}
.input-button {
    width: 20px;
    background-color: orange;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
