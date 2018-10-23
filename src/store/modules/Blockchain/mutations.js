import * as types from 'store/types';
console.log('types', types.SOCKET_ONOPEN);

export default {
  [types.INIT_BLOCKCHAIN](state) {},
  [types.SOCKET_ONOPEN](state, event) {
    state.socket.isConnected = true;
  },
  [types.SOCKET_ONCLOSE](state, event) {
    state.socket.isConnected = false;
  },
  [types.SOCKET_ONERROR](state, event) {
    console.error(state, event);
  },
  // default handler called for all methods
  [types.SOCKET_ONMESSAGE](state, message) {
    const data = JSON.parse(message.data);

    state.socket.message = data.x.hash;
  },
  // mutations for reconnect methods
  [types.SOCKET_RECONNECT](state, count) {
    console.info(state, count);
  },
  [types.SOCKET_RECONNECT_ERROR](state) {
    state.socket.reconnectError = true;
  },
};
