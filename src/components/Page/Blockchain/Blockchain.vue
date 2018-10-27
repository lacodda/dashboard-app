<template>
  <div class="blockchain">
    <h1 class="page__header">Blockchain</h1>
    <div class="blockchain__control">
      <button @click="subscribe" :disabled="!isConnected || isSubscribed" class="btn btn--green">Запуск</button>
      <button @click="unsubscribe" :disabled="!isConnected || !isSubscribed" class="btn btn--red">Остановка</button>
      <button @click="reset" :disabled="!isConnected || transactions.length == 0" class="btn btn--orange">Сброс</button>
    </div>
    <div v-if="!isConnected" class="blockchain__loading">
      ...Соединение с API Blockchain
    </div>
    <div class="blockchain__transactions">
      <div v-if="sum > 0" class="blockchain__sum">Сумма: {{ sum | toBtc }} BTC</div>
      <table v-if="transactions.length > 0" class="table transactions">
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
        <tr v-for="(transaction, key) in reverseItems" :key="key" class="blockchain__transaction">
          <td class="transaction__from">{{ transaction.from.join('\n') }}</td>
          <td class="transaction__to">{{ transaction.to.join('\n') }}</td>
          <td class="transaction__sum">{{ transaction.sum | toBtc }} BTC</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Blockchain',

  props: {
    data: String,
  },

  computed: {
    ...mapGetters('blockchain', [
      'isConnected',
      'isSubscribed',
      'transactions',
      'sum',
    ]),

    reverseItems() {
      return this.transactions.slice().reverse();
    },
  },

  methods: {
    ...mapActions('blockchain', ['subscribe', 'unsubscribe', 'reset']),
  },

  filters: {
    toBtc: function(value) {
      if (!value) return '';
      return value / 100000000;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>