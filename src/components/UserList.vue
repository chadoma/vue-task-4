<template>
    <div class="user">
        <h3 class="user__heading">User一覧</h3>

        <ul class="user__users">
            <li class="user__user-title">ユーザー名</li>

            <li class="user__user-name" v-for="(user) in users" :key="user.uid">
                {{ user.username }}
                <div class="user__btn-wrap">
                    <md-button @click="showWallet(user.uid)" class="user__btn-watch">wallet
                        を見る
                    </md-button>
                    <md-button class="user__btn-send">送る</md-button>
                </div>
            </li>
        </ul>

        <md-dialog @md-closed="resetUser" class="md-accent dialog" :md-active.sync="showDialog">
            <md-dialog-title class="md-primary dialog__title">{{userName}}さんの残高</md-dialog-title>
            <p class="dialog__para">{{userWallet}}円</p>
        </md-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { DbUser } from "../store/user.model";


export default defineComponent({
    props: {
        users: {
            type: Array
        }
    },
    setup(props) {
        const state = reactive({
        showDialog: false,
            userWallet: null as number | null,
            userName: '' as string,
            showWallet: (id: string) => {
                const targetUser = props.users!.findIndex((user: any) => user.uid === id);
                state.userWallet = (props.users![targetUser] as DbUser).yen;
                state.userName = (props.users![targetUser] as DbUser).username;
                state.showDialog = true
            },
            resetUser: () => {
                state.userWallet = null
                state.userName = ''
            }
        });
        return {
            ...toRefs(state),
        };
    }
});
</script>

<style lang="scss" scoped>
  .dialog {
      &__title {
          width: 300px;
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
</style>
