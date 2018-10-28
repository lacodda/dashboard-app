<template>
  <AppDraggableResizable class="widget__container"
    :w="widget.width"
    :h="widget.height"
    :x="widget.x"
    :y="widget.y"
    :z="widget.z"
    :minw="100"
    :minh="50"
    :grid="[10,10]"
    :handles="['br']"
    :parent="true"
    :selectable="true"
    :drag-handle="'.drag'"
    @dragstop="onDragStop"
    @resizestop="onResizeStop"
    @activated="onActivated">
    <div class="widget__header drag">
      <slot name="header">{{ widget.name }}</slot>
      <span class="close" @click="onClose">&times;</span>
    </div>
    <div class="widget__content">
      <slot name="content"></slot>
    </div>
  </AppDraggableResizable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import desktop from 'store/data/desktop';
import widget from 'store/data/widget';
import { zIndex } from '@/utils/helpers';

export default {
  name: 'AppWidgetDraggableResizable',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions('desktop', [
      'updateDimensions',
      'updatePosition',
      'updateZindex',
      'updateVisibility',
      'resetDefaults',
    ]),

    onResizeStop(left, top, width, height) {
      this.updateDimensions({ ...this.widget, width, height });
    },

    onDragStop(x, y) {
      this.updatePosition({ ...this.widget, x, y });
    },

    onActivated() {
      this.updateZindex({ ...this.widget, z: zIndex() });
    },

    onClose() {
      const { defaultX: x, defaultY: y } = desktop;
      const { width, height } = widget;
      this.updateVisibility({ ...this.widget, visible: false });
      this.resetDefaults({ ...this.widget, width, height, x, y });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
