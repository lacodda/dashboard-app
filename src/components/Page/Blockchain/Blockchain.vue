<template>
  <div>
    <h1>Blockchain</h1>
    <button @click="onSubscribe" :disabled="!isConnected">Subscribe</button>
    <button @click="onUnsubscribe" :disabled="!isConnected">Unsubscribe</button>
    <button @click="onReset" :disabled="!isConnected">Reset</button>
    <div class="transactions__wrapper">
      <div v-if="sum > 0" class="transactions__sum">{{ sum | toBtc }} BTC</div>
      <table v-if="transactions.length > 0" class="table transactions">
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
        <tr v-for="(transaction, key) in reverseItems" :key="key" class="transaction__item">
          <td class="transaction__from">{{ transaction.from.join('\n') }}</td>
          <td class="transaction__to">{{ transaction.to.join('\n') }}</td>
          <td class="transaction__sum">{{ transaction.sum | toBtc }} BTC</td>
        </tr>
      </table>
      <!-- <div v-if="transactions.length > 0" class="transactions">
        <div v-for="(transaction, key) in transactions" :key="key" class="transaction__item">
          <div class="transaction__from">{{ transaction.from.join(`\n`) }}</div>
          <div class="transaction__to">{{ transaction.to.join("\n") }}</div>
          <div class="transaction__sum">{{ transaction.sum }}</div>
        </div>
      </div> -->
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
    ...mapGetters('blockchain', ['isConnected', 'transactions', 'sum']),

    reverseItems() {
      return this.transactions.slice().reverse();
    },
  },

  methods: {
    ...mapActions('blockchain', ['onSubscribe', 'onUnsubscribe', 'onReset']),
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
.transactions {
}
.transaction {
  &__item {
    > * {
    }
  }
  &__from {
    width: 40%;
  }
  &__to {
    width: 40%;
  }
  &__sum {
    width: auto;
  }
}
</style>
