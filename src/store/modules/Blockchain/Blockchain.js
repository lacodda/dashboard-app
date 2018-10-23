import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  isConnected: false,
  reconnectError: false,
  transactions: [],
  sum: 0,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
