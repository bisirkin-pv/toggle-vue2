<template>
  <v-card-text>
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          :items="conditionEngines"
          :rules="requiredRule"
          item-text="name"
          item-value="id"
          label="Тип и язык условия *"
          return-object
          @change="changeType"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-btn color="secondary" outlined @click="addParam"
          >Добавить параметр</v-btn
        >
      </v-col>
    </v-row>
    <toggle-condition-param-edit-form
      v-for="(parameter, index) of condition.parameters.inputParameters"
      :key="index"
      :parameter="parameter"
    ></toggle-condition-param-edit-form>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="condition.condition.body"
          clearable
          dense
          label="Условие, написанное на выбранном языке"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import ToggleConditionParamEditForm from "@/components/toggle/ToggleConditionParamEditForm";

export default {
  name: "ToggleConditionEditForm",
  components: { ToggleConditionParamEditForm },
  props: {
    conditionEngines: Array,
    condition: Object,
  },
  data: () => ({
    requiredRule: [(v) => !!v || "Необходимо заполнить поле"],
  }),
  methods: {
    addParam() {
      this.condition.parameters.inputParameters.push({
        name: null,
        description: null,
      });
    },
    changeType(value) {
      this.condition.type = value.type;
      this.condition.language = value.language;
    },
  },
};
</script>

<style scoped></style>
,
