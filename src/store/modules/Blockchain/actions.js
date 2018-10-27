import * as types from 'store/types';

export default {
  async init({ commit }) {
    commit(types.INIT);
  },

  subscribe({ commit }) {
    commit(types.SUBSCRIBE_BLOCKCHAIN);
  },

  unsubscribe({ commit }) {
    commit(types.UNSUBSCRIBE_BLOCKCHAIN);
  },

  reset({ commit }) {
    commit(types.RESET_BLOCKCHAIN);
  },
};
