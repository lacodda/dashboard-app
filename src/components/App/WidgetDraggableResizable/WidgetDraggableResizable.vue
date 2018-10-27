<template>
  <AppDraggableResizable class="widget__container"
    :w="widget.width"
    :h="widget.height"
    :x="widget.x"
    :y="widget.y"
    :z="widget.z"
    :minw="100"
    :minh="50"
    :grid="[20,20]"
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
      this.updateVisibility({ ...this.widget, visible: false });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
