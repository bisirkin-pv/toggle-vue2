<template>
  <v-card>
    <v-card-title
      >Описание условия <v-spacer></v-spacer>
      <toggle-run-button :toggle="toggle"></toggle-run-button
    ></v-card-title>
    <v-card-text>
      <ul>
        <li>
          <strong>Тип и язык: </strong>{{ toggle.condition.type }}
          {{ toggle.condition.language }}
        </li>
        <li>Параметры:</li>
        <ul
          v-for="param of toggle.condition.parameters.inputParameters"
          :key="param.name"
        >
          <li><strong>Имя: </strong>{{ param.name }}</li>
          <ul>
            <li><strong>Тестовое значение: </strong>{{ param.value }}</li>
            <li><strong>Описание: </strong>{{ param.description }}</li>
          </ul>
        </ul>
        <li>
          <strong>Условие: </strong>
          <pre>{{ toggle.condition.condition.body }}</pre>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
import ToggleRunButton from "@/components/toggle/ToggleRunButton";

export default {
  name: "ToggleConditionCard",
  components: { ToggleRunButton },
  props: {
    toggle: Object,
  },
};
</script>

<style scoped></style>
