import Vue from 'vue';
import 'components';
import App from './App.vue';
import router from './router';
import store from 'store';

import VueNativeSock from 'vue-native-websocket';

Vue.use(VueNativeSock, process.env.VUE_APP_BLOCKCHAIN_API, {
  store,
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
  passToStoreHandler: function(event, payload, next) {
    if (!event.startsWith('SOCKET_')) return;

    for (let namespaced in this.store._mutations) {
      let mutation = namespaced.split('/').pop();
      console.log('namespaced', mutation, event.toUpperCase());
      if (mutation === event.toUpperCase())
        this.store.commit(namespaced, payload);
    }

    for (let namespaced in this.store._actions) {
      let action = namespaced.split('/').pop();

      if (!action.startsWith('socket_')) continue;

      let camelcased =
        'socket_' +
        event
          .replace('SOCKET_', '')
          .toLowerCase()
          .replace(/[\W\s_]+(\w)/g, (match, p1) => p1.toUpperCase());

      if (action === camelcased) this.store.dispatch(namespaced, payload);
    }

    next(event, payload);
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
