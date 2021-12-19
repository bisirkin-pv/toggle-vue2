<template>
  <div class="vue-datetime">
    <label :class="{ active: isActive }">{{ label }}</label>
    <vue-datetime
      :value="value"
      class="vue-datetime-input"
      format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      :min-datetime="minDatetime"
      :max-datetime="maxDatetime"
      @input="$emit('update:value', $event)"
    ></vue-datetime>
    <v-icon
      v-if="isActive"
      class="vue-datetime-clear"
      @click.stop="$emit('update:value', null)"
      >mdi-close
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "DateTimeField",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: String,
    minDatetime: String,
    maxDatetime: String,
  },
  data: () => ({}),
  computed: {
    isActive() {
      return !!this.value;
    },
  },
};
</script>

<style>
.vue-datetime {
  border-bottom: 1px solid #2c3e50;
  position: relative;
  height: 48px;
  margin-bottom: 24px;
}

.vue-datetime .vue-datetime-input input.vdatetime-input {
  width: calc(100% - 42px);
  padding: 0 8px;
  min-height: 36px;
  margin-top: 16px;
  cursor: pointer;
}

.vue-datetime label {
  position: absolute;
  left: 0;
  top: 22px;
  font-size: 16px;
}

.vue-datetime label.active {
  transform-origin: top left;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 12px;
}

.vue-datetime .vue-datetime-clear {
  position: absolute;
  right: 0;
  top: 20px;
  cursor: pointer;
}
</style>
