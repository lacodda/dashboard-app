<template>
  <AppDraggableResizable class="widget__container"
    :w="widget.width"
    :h="widget.height"
    :x="widget.x"
    :y="widget.y"
    :z="widget.z"
    :minw="300"
    :minh="100"
    :grid="[20,20]"
    :handles="['br']"
    :parent="true"
    :selectable="true"
    :drag-handle="'.drag'"
    @dragstop="onDragStop"
    @resizestop="onResizeStop"
    @activated="onActivated">
    <div class="widget__header drag">
      <slot name="header"></slot>
      <span class="close">&times;</span>
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
      'updateVisibility',
    ]),

    onActivated() {
      this.$set(this.widget, 'z', zIndex());
    },

    onResizeStop(left, top, width, height) {
      this.updateDimensions({ ...this.widget, width, height });
    },

    onDragStop(x, y) {
      this.updatePosition({ ...this.widget, x, y });
    },
  },
};
</script>
<style lang="scss" scoped>
.widget {
  &__container {
    background-color: aquamarine;
    border: 1px solid salmon;
    user-select: none;
  }
  &__header {
    padding: 0.5rem;
    width: 100%;
    line-height: 1;
    background: salmon;
  }
  &__content {
    text-align: center;
  }
}
.drag {
  cursor: move;
}
.close {
  float: right;
  cursor: pointer;
}
</style>
