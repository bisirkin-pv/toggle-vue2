<template>
  <v-card-text>
    <v-form v-model="valid" class="mt-3">
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
          <v-btn
            :disabled="disabledAddParameter"
            color="secondary"
            outlined
            @click="addParam"
            >Добавить параметр
          </v-btn>
        </v-col>
      </v-row>
      <toggle-condition-param-edit-form
        v-for="(parameter, index) of condition.parameters.inputParameters"
        :key="index"
        :error-name-message="uniqueParamNameError"
        :parameter="parameter"
        @remove="removeParameter"
      ></toggle-condition-param-edit-form>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="condition.condition.body"
            :rules="requiredRule"
            clearable
            dense
            label="Условие, написанное на выбранном языке *"
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-form>
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
    valid: true,
    requiredRule: [(v) => !!v || "Необходимо заполнить поле"],
  }),
  computed: {
    disabledAddParameter() {
      return (
        this.condition.parameters.inputParameters.filter((el) => !el.name)
          .length > 0
      );
    },
    uniqueParamNameError() {
      const uniqNameLen = Object.keys(
        this.condition.parameters.inputParameters
          .map((el) => el.name)
          .reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
          }, {})
      ).length;
      return this.condition.parameters.inputParameters.length !== uniqNameLen
        ? "Введите уникальное имя"
        : null;
    },
  },
  watch: {
    valid(v) {
      this.$emit("validate", v);
    },
  },
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
    removeParameter(name) {
      this.condition.parameters.inputParameters =
        this.condition.parameters.inputParameters.filter(
          (el) => el.name !== name
        );
    },
  },
};
</script>

<style scoped></style>
,
