<template>
  <v-row class="toggle-condition-param-form">
    <v-col cols="12">
      <v-text-field
        label="Имя параметра *"
        :rules="requiredRule"
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
  </v-row>
</template>

<script>
export default {
  name: "ToggleConditionParamEditForm",
  props: {
    parameter: Object,
  },
  data: () => ({
    requiredRule: [(v) => !!v || "Необходимо заполнить поле"],
  }),
};
</script>

<style scoped></style>
