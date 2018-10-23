<template>
  <div>
    <h1>Blockchain</h1>
    <button @click="onSubscribe">Subscribe</button>
    <button @click="onUnsubscribe">Unsubscribe</button>
    <div class="new-msg">
      {{ message }}
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
    ...mapGetters('blockchain', ['message']),
  },

  methods: {
    ...mapActions('blockchain', ['onSubscribe', 'onUnsubscribe']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
