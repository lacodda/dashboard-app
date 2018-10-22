<template>
  <div>
    <app-nav/>

    <slot name="header">
    </slot>

    <main class="main">
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
</style>
