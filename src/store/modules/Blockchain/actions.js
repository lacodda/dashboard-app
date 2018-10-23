import Vue from 'vue';
import * as types from 'store/types';

export default {
  async init({ commit }) {
    commit(types.INIT_BLOCKCHAIN);
  },

  onSubscribe() {
    Vue.prototype.$socket.sendObj({ op: 'unconfirmed_sub' });
  },

  onUnsubscribe() {
    Vue.prototype.$socket.sendObj({ op: 'unconfirmed_unsub' });
  },

  onReset({ commit }) {
    commit(types.RESET_BLOCKCHAIN);
  },
};
