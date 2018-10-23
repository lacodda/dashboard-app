<template>
  <div class="layout-default">
    <app-nav/>

    <slot name="header">
    </slot>

    <main class="layout-default__main">
      <slot/>
    </main>

    <slot name="footer">
    </slot>
  
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.layout-default {
  &__main {
    width: 100%;
    height: 100%;
  }
}
</style>
