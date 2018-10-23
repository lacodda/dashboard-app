import localForage from 'localforage';

export default class PersistentStore {
  constructor() {
    // Initialize persistent storage
    this.store = localForage.createInstance({
      name: process.env.VUE_APP_PERSISTENT_STORE_KEY,
    });
  }

  /**
   * Drop store
   *
   * @memberof PersistentStore
   */
  dropStore() {
    this.store.dropInstance();
  }

  /**
   * Persist state into browser storage
   *
   * @param {*} key
   * @param {*} state
   * @memberof PersistentStore
   */
  setState(key, state) {
    this.store.setItem(key, state);
  }

  /**
   *  Persist state into browser storage with id
   *
   * @param {*} key
   * @param {*} state
   * @memberof PersistentStore
   */
  setStateById(key, state) {
    state = state.map(i => ({
      id: i.id,
      state: { ...i },
    }));

    this.store.setItem(key, state);
  }

  /**
   * Get persisted state by key
   *
   * @param key
   * @returns {Promise<*>}
   */
  async getState(key) {
    const state = await this.store.getItem(key);

    if (!state) {
      return null;
    }

    return state;
  }

  /**
   * Get persisted state by key and id
   *
   * @param key
   * @param id
   * @returns {Promise<*>}
   */
  async getStateById(key, id) {
    const state = await this.store.getItem(key);

    if (!state) {
      return null;
    }

    return state.find(i => i.id === id);
  }
}
