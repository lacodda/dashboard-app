<template>
  <nav>
    <ul class="menu">
      <li class="nav-item" v-for="(route, key) in routes" :key="key">
        <router-link class="nav-link" exact-active-class="is-active"
          :to="route"
          :data-text="route.title">
          {{ route.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Nav',

  computed: {
    routes() {
      return this.$router.options.routes.filter(route =>
        route.hasOwnProperty('title'),
      );
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
