<template>
  <v-card-text>
    <v-form ref="toggle_condition_form" v-model="valid" class="mt-3">
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            :items="conditionEngines"
            :rules="requiredRule"
            v-model="condition.id"
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
        <v-col cols="11">
          <v-textarea
            v-model="condition.condition.body"
            :rules="requiredRule"
            :error-messages="conditionValidateErrorMessage"
            clearable
            dense
            label="Условие, написанное на выбранном языке *"
            @input="inputCondition"
            :messages="conditionValidateSuccessMessage"
          >
          </v-textarea>
        </v-col>
        <v-col cols="1">
          <v-btn icon :color="validateColor">
            <v-icon>{{
              conditionValid ? "mdi-check-decagram" : "mdi-alert-decagram"
            }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3" offset="9">
          <v-btn
            block
            color="primary"
            @click="validateCondition"
            :disabled="!condition.condition.body || !condition.type"
            >Проверить</v-btn
          >
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
  data() {
    return {
      valid: true,
      requiredRule: [(v) => !!v || "Необходимо заполнить поле"],
      conditionRule: [(v) => !!v || "Необходимо заполнить поле"],
    };
  },
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
    conditionValidateErrorMessage() {
      return !this.condition.condition.error
        ? ""
        : this.condition.condition.error;
    },
    conditionValidateSuccessMessage() {
      return this.condition.condition?.result?.time
        ? `Время выполнения: ${this.condition.condition?.result?.time}, Результат: ${this.condition.condition?.result?.result}`
        : null;
    },
    conditionValid() {
      return !!this.condition.condition.result;
    },
    validateColor() {
      return this.conditionValid
        ? "success"
        : !this.condition.condition.error
        ? "primary"
        : "error";
    },
  },
  watch: {
    valid(v) {
      this.$emit("validate", v && this.conditionValid);
    },
    conditionValid(v) {
      this.$emit("validate", v && this.valid);
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
      this.condition.id = value.id;
      this.condition.type = value.type;
      this.condition.language = value.language;
    },
    removeParameter(name) {
      this.condition.parameters.inputParameters =
        this.condition.parameters.inputParameters.filter(
          (el) => el.name !== name
        );
    },
    validateCondition() {
      this.$emit("check-condition", this.condition);
    },
    inputCondition() {
      if (this.condition.condition.error) {
        this.condition.condition.error = null;
      }
      if (this.condition.condition.result) {
        this.condition.condition.result = null;
      }
    },
  },
};
</script>

<style scoped></style>
,
