import * as types from 'store/types';

export default {
  async init({ commit }) {
    commit(types.INIT);
  },

  async addWidget({ commit }, payload) {
    commit(types.ADD_WIDGET, payload);
    commit(types.SAVE);
  },

  updateDimensions({ commit }, payload) {
    commit(types.UPDATE_DIMENSIONS, payload);
    commit(types.SAVE);
  },

  updatePosition({ commit }, payload) {
    commit(types.UPDATE_POSITION, payload);
    commit(types.SAVE);
  },

  updateVisibility({ commit }, payload) {
    commit(types.UPDATE_VISIBILITY, payload);
    commit(types.SAVE);
  },
};
