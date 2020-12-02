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

        <md-dialog @md-closed="resetUser" class="md-accent dialog" :md-active.sync="showPaymentDialog">
            <md-dialog-title class="md-primary dialog__title">
                あなたの残高: {{ loginUser[0].yen }}<br />
                <span>送る金額</span>
            </md-dialog-title>
            <div class="input-content">
                <md-field>
                    <label>半角数字で入力してください</label>
                    <md-input v-model="amount"></md-input>
                </md-field>
                <md-button @click="calcWallet" class="input-button">送信</md-button>
            </div>
        </md-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { DbUser, UserModel } from "../store/user.model";
import { useValidator } from '../util-function/validation';
import { UserStore } from "../store/User/user";


export default defineComponent({
    props: {
        users: {
            type: Array as () => DbUser[]
        },
        loginUser: {
            type: Array as () => UserModel[]
        }
    },
    setup(props) {
        const { isValidInteger, isValidOverPay } = useValidator();
        const state = reactive({
            showWalletDialog: false,
            showPaymentDialog: false,
            userWallet: null as number | null,
            amount: null as string | null,
            userName: '',
            sendTargetUid: '',
            isOpenUserWallet: (id: string) => {
                const targetUserIndex: number = state.getUserWallet(id);
                state.userName = (props.users![targetUserIndex]).username;
                state.showWalletDialog = true;
            },
            isOpenUserPayment: (id: string) => {
                state.sendTargetUid = id;
                state.showPaymentDialog = true;
            },
            getUserWallet: (id: string): number => {
                const targetUserIndex = props.users!.findIndex((user) => user!.uid === id);
                state.userWallet = (props.users![targetUserIndex]).yen;
                return targetUserIndex;
            },
            // 自分の財布から送る額を計算
            calcWallet: () => {
                state.getUserWallet(state.sendTargetUid);
                // 値は入力されているか、整数か
                if (state.amount && isValidInteger(state.amount) && props.loginUser![0].yen) {
                    // 現在額が支払額より上回っていないか
                    const calcMyWallet = isValidOverPay(state.amount, props.loginUser![0].yen);
                    state.saveUsersWallet(state.amount, calcMyWallet!);
                } else {
                    console.log('入力内容が間違っています');
                }
            },
            // 送る側、送った側の値を更新
            saveUsersWallet: (amount: string, calcMyWallet: number) => {
                if (state.sendTargetUid && state.userWallet && calcMyWallet) {
                    const calcTargetWallet = state.userWallet + parseInt(amount);
                    state.showPaymentDialog = false;

                    UserStore.saveUsersWallet({
                        sendTargetUid: state.sendTargetUid,
                        calcTargetWallet: calcTargetWallet,
                        calcMyWallet: calcMyWallet
                    });
                } else {
                    console.log('入力内容が間違っています');
                }
            },
            resetUser: () => {
                state.userWallet = null;
                state.amount = null;
                state.userName = '';
                state.sendTargetUid = '';
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
