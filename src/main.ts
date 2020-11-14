import Vue from 'vue';
import App from '@/App.vue';
import router from './router';
import store from './store';
import VueCompositionAPI from '@vue/composition-api';
require('@/assets/main.scss');
// import VueMaterial from 'vue-material'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import "vue-material/dist/vue-material.min.css";
import 'vue-material/dist/theme/default.css'


Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
// Vue.use(VueMaterial);
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

// import {auth} from "./firebase/credentials";
// import {User} from "./store/user.model";
// import { UserStore } from "./store/User/user";

// auth.onAuthStateChanged(user => {
//     if (user) {
//     console.log(user);
//     UserStore.testUser({email: user.email, uid: user.uid} as User)
//   } else if (user) {
//     console.log(user)
//     UserStore.testUser(user)
//   }
//
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

