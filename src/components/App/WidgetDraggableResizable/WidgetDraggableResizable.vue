<template>
    <!-- <app-draggable-resizable
        class="block"
        :parent="false"
        :drag-handle="'.draggable'"
        :drag-cancel="'.no-drag'"
        :minw="widgetState.dimensions.minW"
        :minh="widgetState.dimensions.minH"
        :h="widgetState.dimensions.h"
        :w="widgetState.dimensions.w"
        :x="widgetState.position.x"
        :y="widgetState.position.y"
        :z="widgetState.position.z"
        :grid="[10,10]"
        :handles="['br']"
        :active="selected === id"
        @activated="onActivate(id)"
        @resizing="onResizing(id, $event)"
        @resizestop="onResizeStop"
        @dragstop="onDragStop">
        <div @mousedown="onMouseDown(id)" :class="{dragActive: selected === id}">
            <slot/>
        </div>
    </app-draggable-resizable> -->
  <AppDraggableResizable class="widget__container"
    :w="widget.width"
    :h="widget.height"
    :x="widget.x"
    :y="widget.y"
    :z="widget.z"
    :handles="['br']"
    :parent="true"
    :selectable="true"
    :drag-handle="'.drag'"
    @dragging="onDrag"
    @resizing="onResize"
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
import StoreWidgets from 'store/modules';
import { zIndex } from '@/utils/helpers';
// import StoreWidgets from 'store/modules/widgets';

export default {
  name: 'AppWidgetDraggableResizable',
  props: {
    // id: {
    //   type: String,
    //   required: true,
    // },
    // widgetState: {
    //   type: Object,
    //   required: true,
    // },

    widget: {
      type: Object,
      required: true,
    },
  },

  mounted: function() {},

  computed: {
    selected() {
      const selected = this.$store.getters.selected;
      return selected ? selected.id : null;
    },
  },

  methods: {
    onResize: function(x, y, width, height) {
      // this.x = x;
      // this.y = y;
      // this.width = width;
      // this.height = height;
    },
    onDrag: function(x, y) {
      // this.x = x;
      // this.y = y;
    },

    onActivated() {
      this.$set(this.widget, 'z', zIndex());
    },

    onResizing(id, event) {
      const { left, top, width, height } = event;

      // if (this.selected === id) {
      //   const widget = this.$store.getters.widget(this.selected);
      //   const position = widget.widgetState.position;
      //   const dimensions = widget.widgetState.dimensions;
      //   const changed =
      //     position.x !== left ||
      //     position.y !== top ||
      //     dimensions.w !== width ||
      //     dimensions.h !== height;

      //   if (changed) {
      //     this.$store.dispatch(StoreWidgets.Types.UPDATE_DIMENSIONS, {
      //       id: this.selected,
      //       dimensions: { w: width, h: height },
      //     });
      //   }
      // }
    },

    onResizeStop(event) {
      const { left, top, width, height } = event;
      // if (this.selected !== null) {
      //   this.$store.dispatch(StoreWidgets.Types.UPDATE_DIMENSIONS_PERSIST, {
      //     id: this.selected,
      //     dimensions: { w: width, h: height },
      //   });
      //   const event = {
      //     Action: 'OnDragResize',
      //     id: this.selected,
      //     position: { x: left, y: top },
      //     dimensions: { width, height },
      //   };
      //   // LoggerService.log(event);
      // }
    },

    onDragStop(event) {
      const { left, top, width, height } = event;
      // if (this.selected !== null) {
      //   const widget = this.$store.getters.widget(this.selected);
      //   if (
      //     widget.widgetState.position.x !== left ||
      //     widget.widgetState.position.y !== top
      //   ) {
      //     this.$store.dispatch(StoreWidgets.Types.UPDATE_POSITION, {
      //       id: this.selected,
      //       position: { x: left, y: top },
      //     });

      //     const event = {
      //       Action: 'onDragResize',
      //       id: this.selected,
      //       position: { x: left, y: top },
      //       dimensions: { w: width, h: height },
      //     };
      //     // LoggerService.log(event);
      //   }
      // }
    },

    onActivate(id) {
      console.log('onActivate', id);

      // this.updateOrder(id);
    },

    onMouseDown(id) {
      console.log('onMouseDown', id);
      // this.updateOrder(id)
    },

    updateOrder(id) {
      console.log('updateOrder', id);
      // this.$store.dispatch(StoreWidgets.Types.UPDATE_ORDER, id);
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
