import * as types from 'store/types';

const getWidget = (state, id) => state.widgets.find(widget => widget.id === id);

export default {
  [types.INIT]() {},
  [types.SAVE]() {},

  [types.ADD_WIDGET](state, widget) {
    state.widgets.push(widget);
  },

  [types.UPDATE_DIMENSIONS](state, { id, width, height }) {
    const widget = getWidget(state, id);
    widget.width = width;
    widget.height = height;
  },

  [types.UPDATE_POSITION](state, { id, x, y }) {
    const widget = getWidget(state, id);
    widget.x = x;
    widget.y = y;
  },

  [types.UPDATE_ZINDEX](state, { id, z }) {
    const widget = getWidget(state, id);
    widget.z = z;
  },

  [types.UPDATE_VISIBILITY](state, { id, visible }) {
    const widget = getWidget(state, id);
    widget.visible = visible;
  },
};
