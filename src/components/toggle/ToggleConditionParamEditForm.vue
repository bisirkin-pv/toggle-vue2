<template>
  <v-row class="toggle-condition-param-form">
    <v-col cols="12">
      <v-text-field
        label="Имя параметра *"
        :rules="nameRule"
        v-model="parameter.name"
        clearable
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        label="Описание параметра *"
        :rules="requiredRule"
        v-model="parameter.description"
        clearable
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="12" offset="10">
      <v-btn text outlined @click="$emit('remove', parameter.name)"
        >Удалить</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ToggleConditionParamEditForm",
  props: {
    parameter: Object,
    errorNameMessage: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      requiredRule: [(v) => !!v || "Необходимо заполнить поле"],
      nameRule: [
        (v) => !!v || "Необходимо заполнить поле",
        (v) => !v || this.errorNameMessage || true,
      ],
    };
  },
};
</script>

<style scoped></style>
