<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) of snackbars.filter((el) => el.showing)"
      :key="snackbar.content + Math.random()"
      :value="snackbar.showing"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      @input="input(snackbar)"
      multi-line
      bottom
      right
      :style="`bottom: ${index * 76 + 8}px`"
    >
      {{ snackbar.content }}

      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="close(snackbar)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "TheSnackbar",
  data() {
    return {};
  },

  computed: {
    snackbars() {
      return this.$store.getters["snackbar/getSnackbars"];
    },
  },
  methods: {
    input(snackbar) {
      this.$store.dispatch("snackbar/delSnackbar", snackbar);
    },
    close(snackbar) {
      this.$store.dispatch("snackbar/delSnackbar", snackbar);
    },
  },
};
</script>
