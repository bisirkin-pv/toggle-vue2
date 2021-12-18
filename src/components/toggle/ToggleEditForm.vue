<template>
  <v-form v-model="valid" class="mt-3">
    <v-row>
      <v-col cols="11">
        <v-text-field
          v-model="toggle.name"
          label="Название *"
          :rules="requiredRule"
          clearable
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-switch v-model="toggle.enabled"></v-switch>
      </v-col>
      <v-col cols="12" sm="6">
        <date-time-field
          label="Дата начала"
          :value.sync="toggle.startDate"
        ></date-time-field>
      </v-col>
      <v-col cols="12" sm="6">
        <date-time-field
          label="Дата окончания"
          :value.sync="toggle.endDate"
        ></date-time-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="toggle.description"
          label="Описание *"
          :rules="requiredRule"
          clearable
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="toggle.type"
          label="Тип *"
          :items="featureTogglesTypes"
          item-text="type"
          item-value="type"
          :rules="requiredRule"
          clearable
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import DateTimeField from "@/components/fields/DateTimeField";

export default {
  name: "ToggleEditForm",
  components: { DateTimeField },
  props: {
    toggle: {
      type: Object,
    },
    conditionEngines: Array,
    featureTogglesTypes: Array,
  },
  data: () => ({
    valid: false,
    requiredRule: [(v) => !!v || "Необходимо заполнить поле"],
  }),
  watch: {
    valid(v) {
      this.$emit("validate", v);
    },
  },
};
</script>

<style scoped></style>
