<template>
  <div style="height: 100vh">
    <h1>Desktop</h1>
    <div style="height: 100%; width: 80%; position: relative; margin: 0 auto;">
      <AppWidgetDraggableResizable v-for="(widget, index) in widgets"
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
import widgets from '@/data/widgets';
export default {
  name: 'Desktop',

  data() {
    return {
      widgets,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
