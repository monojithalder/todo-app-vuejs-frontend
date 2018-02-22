// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'


Vue.config.productionTip = false
Vue.use(Vuex)

export const mainStore = new Vuex.Store({
    state: {
        count: 0,
        login: false,
        user: {}
    },
    mutations: {    
        // Mutations
        increment: state => state.count++,
        decrement: state => state.count--,
        //setValue: state => state.count = 500
        setValue: function (state,value) {
            //console.log(value)
            //state = value
            Vue.set(state, 'count', value.count)
            Vue.set(state, 'login', value.login)
            Vue.set(state, 'user', value.user)
        },
        getLocalStorageValue: function (state) {
            if(localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        },
        setLocalStorageValue: function (state) {
            localStorage.setItem('store', JSON.stringify(state));
        }
        
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: mainStore,
  components: { App },
  template: '<App/>',
  mounted() {
      this.$store.commit('getLocalStorageValue')
  }
})
