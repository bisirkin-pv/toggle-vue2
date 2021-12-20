<template>
  <v-menu
    transition="slide-y-transition"
    bottom
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-cog-play</v-icon></v-btn>
    </template>
    <toggle-run-card :toggle="toggle"></toggle-run-card>
  </v-menu>
</template>

<script>
import ToggleRunCard from "@/components/toggle/ToggleRunCard";

export default {
  name: "ToggleRunButton",
  components: { ToggleRunCard },
  props: {
    toggle: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
