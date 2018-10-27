import * as types from 'store/types';
import PersistentStore from 'services/persistent-store.service';
import generateWidgets from '@/utils/generateWidgets';

const persistentStore = new PersistentStore();

/* eslint-disable */

export default () => {
  return store => {
    store.subscribe(async ({ type, payload }) => {
      switch (type) {
        case `desktop/${types.INIT}`:
          try {
            const widgets =
              (await persistentStore.getState('widgets')) ||
              generateWidgets('Tile', 5);

            if (widgets.length > 0) {
              widgets.forEach(widget => {
                store.dispatch('desktop/addWidget', widget);
              });
            }
          } catch (e) {
            console.error(e.message);
          }

          break;

        case `desktop/${types.SAVE}`:
          try {
            persistentStore.setState('widgets', store.state.desktop.widgets);
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
