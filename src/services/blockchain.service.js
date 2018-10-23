import VueNativeSock from 'vue-native-websocket';

export default store => [
  VueNativeSock,
  process.env.VUE_APP_BLOCKCHAIN_API,
  {
    store,
    format: 'json',
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
    passToStoreHandler: function(event, payload) {
      if (!event.startsWith('SOCKET_')) return;

      for (let namespaced in this.store._mutations) {
        let mutation = namespaced.split('/').pop();
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
    },
  },
];
