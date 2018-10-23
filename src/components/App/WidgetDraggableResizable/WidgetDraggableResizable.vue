<template>
    <draggable-resizable
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
    </draggable-resizable>
</template>

<script>
import StoreWidgets from 'store/modules';
// import StoreWidgets from 'store/modules/widgets';
// import LoggerService from 'services/logger.service';

export default {
  name: 'widget-draggable-resizable',
  props: {
    id: {
      type: String,
      required: true,
    },
    widgetState: {
      type: Object,
      required: true,
    },
  },

  mounted: function() {
    // this.$nextTick(function() {
    //   LoggerService.log({ Action: 'Loaded' });
    // });
  },

  computed: {
    selected() {
      const selected = this.$store.getters.selected;
      return selected ? selected.id : null;
    },
  },

  methods: {
    onResizing(id, event) {
      const { left, top, width, height } = event;

      if (this.selected === id) {
        const widget = this.$store.getters.widget(this.selected);
        const position = widget.widgetState.position;
        const dimensions = widget.widgetState.dimensions;
        const changed =
          position.x !== left ||
          position.y !== top ||
          dimensions.w !== width ||
          dimensions.h !== height;

        if (changed) {
          this.$store.dispatch(StoreWidgets.Types.UPDATE_DIMENSIONS, {
            id: this.selected,
            dimensions: { w: width, h: height },
          });
        }
      }
    },

    onResizeStop(event) {
      const { left, top, width, height } = event;
      if (this.selected !== null) {
        this.$store.dispatch(StoreWidgets.Types.UPDATE_DIMENSIONS_PERSIST, {
          id: this.selected,
          dimensions: { w: width, h: height },
        });
        const event = {
          Action: 'OnDragResize',
          id: this.selected,
          position: { x: left, y: top },
          dimensions: { width, height },
        };
        // LoggerService.log(event);
      }
    },

    onDragStop(event) {
      const { left, top, width, height } = event;
      if (this.selected !== null) {
        const widget = this.$store.getters.widget(this.selected);
        if (
          widget.widgetState.position.x !== left ||
          widget.widgetState.position.y !== top
        ) {
          this.$store.dispatch(StoreWidgets.Types.UPDATE_POSITION, {
            id: this.selected,
            position: { x: left, y: top },
          });

          const event = {
            Action: 'onDragResize',
            id: this.selected,
            position: { x: left, y: top },
            dimensions: { w: width, h: height },
          };
          // LoggerService.log(event);
        }
      }
    },

    onActivate(id) {
      this.updateOrder(id);
    },

    onMouseDown(id) {
      // this.updateOrder(id)
    },

    updateOrder(id) {
      this.$store.dispatch(StoreWidgets.Types.UPDATE_ORDER, id);
    },
  },
};
</script>
