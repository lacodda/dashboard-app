import * as types from 'store/types';
import PersistentStore from 'services/persistent-store.service';

const persistentStore = new PersistentStore();

/* eslint-disable */

export default () => {
  return store => {
    store.subscribe(async ({ type, payload }) => {
      switch (type) {
        case types.INIT:
          try {

          } catch (e) {
            console.error(e.message);
          }

          break;

        case types.SAVE:
          try {

          } catch (e) {
            console.error(e.message);
          }

          break;

        default:
          break;
      }
    });
  };
};
