<template>
  <v-card class="run-card">
    <v-card-subtitle>Укажите параметры</v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item v-for="param of params" :key="param.name">
          <v-text-field
            :label="param.name"
            v-model="param.value"
          ></v-text-field>
        </v-list-item>
      </v-list>
      <p>Результат: {{ message ? message : "" }}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="run">Выполнить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ToggleRunCard",
  props: {
    toggle: Object,
  },
  data: () => ({
    error: false,
    message: null,
    params: {},
  }),
  mounted() {
    this.params = JSON.parse(
      JSON.stringify(this.toggle.condition.parameters.inputParameters)
    );
  },
  watch: {
    "toggle.condition.parameters.inputParameters": {
      deep: true,
      handler(v) {
        this.params = JSON.parse(JSON.stringify(v));
      },
    },
  },
  methods: {
    run() {
      this.$api.toggle
        .runCondition({ name: this.toggle.name, inputParameters: this.params })
        .then((response) => {
          this.message = response.data;
        })
        .catch((error) => {
          this.message = { result: error.response.data.message };
        });
    },
  },
};
</script>

<style scoped>
.run-card {
  width: 250px;
}
</style>
