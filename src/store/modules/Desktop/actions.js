import * as types from '@/store/types';

export default {
  async init({ commit }) {
    commit(types.INIT_DESKTOP);
  },
};
