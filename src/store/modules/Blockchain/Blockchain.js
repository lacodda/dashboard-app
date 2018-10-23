import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
