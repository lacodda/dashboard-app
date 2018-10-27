<template>
  <div class="desktop">
    <h1 class="page__header">Desktop</h1>
    <div class="desktop__control">
      <AppDropdown class="desktop__restore"
        :data="hiddenWidgets" 
        :placeholder="'Восстановить удаленные окна'" 
        @onItemClicked="onItemClicked"/>
    </div>
    <div class="desktop__board-wrapper">
      <div class="desktop__board">
        <AppWidgetDraggableResizable v-for="(widget, index) in widgets"
          v-if="widget.visible"
          :key="index"
          :widget="widget">
          <template slot="header"></template>
          <template slot="content"></template>
        </AppWidgetDraggableResizable>
      </div>
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
