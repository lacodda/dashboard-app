import Vue from 'vue';
import * as types from 'store/types';
import Transaction from 'store/models/transaction';

export default {
  [types.INIT]() {},

  [types.SOCKET_ONOPEN](state, event) {
    state.isConnected = true;
  },

  [types.SOCKET_ONCLOSE](state, event) {
    state.isConnected = false;
  },

  [types.SOCKET_ONERROR](state, event) {
    console.error(state, event);
  },

  // default handler called for all methods
  [types.SOCKET_ONMESSAGE](state, message) {
    const data = JSON.parse(message.data);
    const transaction = new Transaction(data);

    state.transactions.push({ ...transaction });
    state.sum = state.sum + transaction.sum;
  },

  // mutations for reconnect methods
  [types.SOCKET_RECONNECT](state, count) {
    console.info(state, count);
  },

  [types.SOCKET_RECONNECT_ERROR](state) {
    state.reconnectError = true;
  },

  [types.SUBSCRIBE_BLOCKCHAIN](state) {
    Vue.prototype.$socket.sendObj({ op: 'unconfirmed_sub' });
    state.isSubscribed = true;
  },

  [types.UNSUBSCRIBE_BLOCKCHAIN](state) {
    Vue.prototype.$socket.sendObj({ op: 'unconfirmed_unsub' });
    state.isSubscribed = false;
  },

  [types.RESET_BLOCKCHAIN](state) {
    state.transactions = [];
    state.sum = 0;
  },
};
