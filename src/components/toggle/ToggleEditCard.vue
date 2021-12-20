<template>
  <v-card>
    <v-card-title>Создание Feature Toggle</v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <toggle-edit-form
            :condition-engines="conditionEngines"
            :feature-toggles-types="featureTogglesTypes"
            :toggle="editToggle"
            @validate="(v) => (this.valid = v)"
          ></toggle-edit-form>
        </v-col>
        <v-col cols="12">
          <v-card flat>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn
                v-if="Object.keys(editToggle.condition || {}).length === 0"
                color="primary"
                outlined
                @click="addCondition"
                >Добавить условие
              </v-btn>
              <v-btn v-else color="primary" outlined @click="deleteCondition"
                >Удалить условие
              </v-btn>
            </v-card-title>
            <toggle-condition-edit-form
              v-if="editToggle.condition"
              :condition="editToggle.condition"
              :condition-engines="conditionEngines"
              @validate="(v) => (this.validCondition = v)"
              @check-condition="checkCondition"
            ></toggle-condition-edit-form>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined @click="$emit('close')">Закрыть</v-btn>
      <v-btn
        :disabled="
          !valid || !changed || (editToggle.condition && !validCondition)
        "
        class="primary"
        @click="$emit('save', editToggle)"
        >Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ToggleEditForm from "@/components/toggle/ToggleEditForm";
import ToggleConditionEditForm from "@/components/toggle/ToggleConditionEditForm";
import Vue from "vue";

export default {
  name: "ToggleEditCard",
  components: { ToggleEditForm, ToggleConditionEditForm },
  props: {
    toggle: {
      type: Object,
    },
    conditionEngines: Array,
    featureTogglesTypes: Array,
  },
  data: () => ({
    valid: false,
    validCondition: false,
    editToggle: {},
  }),
  mounted() {
    this.editToggle = JSON.parse(JSON.stringify(this.toggle));
  },
  watch: {
    toggle: {
      deep: true,
      handler(obj) {
        this.editToggle = JSON.parse(JSON.stringify(obj));
      },
    },
  },
  computed: {
    changed() {
      return JSON.stringify(this.toggle) !== JSON.stringify(this.editToggle);
    },
  },
  methods: {
    addCondition() {
      Vue.set(this.editToggle, "condition", {
        type: null,
        language: null,
        parameters: {
          inputParameters: [],
        },
        condition: {
          body: null,
        },
      });
    },
    deleteCondition() {
      this.editToggle.condition = null;
    },
    checkCondition(condition) {
      this.$api.toggle
        .checkCondition(condition)
        .then((response) => {
          Vue.set(this.editToggle.condition.condition, "error", null);
          Vue.set(this.editToggle.condition.condition, "result", response.data);
        })
        .catch((error) => {
          Vue.set(
            this.editToggle.condition.condition,
            "error",
            error.response.data.message
          );
        });
    },
  },
};
</script>

<style scoped></style>
