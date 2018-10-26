<template>
  <div style="height: 100vh">
    <h1>Desktop</h1>
    <AppDropdown :data="hiddenWidgets" @onItemClicked="onItemClicked"/>
    <div style="height: 100%; width: 80%; position: relative; margin: 0 auto;">
      <AppWidgetDraggableResizable v-for="(widget, index) in widgets"
        v-if="widget.visible"
        :key="index"
        :widget="widget">
        <template slot="header">Header</template>
        <template slot="content">
          <h2>{{index+1}}</h2>
        </template>
      </AppWidgetDraggableResizable>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Desktop',

  computed: {
    ...mapGetters('desktop', ['widgets']),

    hiddenWidgets() {
      return this.widgets
        .filter(widget => !widget.visible)
        .map(({ id, name: label }) => ({ id, label }));
    },
  },

  methods: {
    ...mapActions('desktop', ['updateVisibility']),

    onItemClicked({ id }) {
      this.updateVisibility({ id, visible: true });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
