<template>
  <v-card>
    <v-card-title>Описание условия <v-spacer></v-spacer> </v-card-title>
    <v-card-text>
      <ul>
        <li>
          <strong>Тип и язык: </strong>{{ condition.type }}
          {{ condition.language }}
        </li>
        <ul>
          <li
            v-for="param of condition.parameters.inputParameters"
            :key="param.name"
          >
            <strong>{{ param.name }}: </strong>{{ param.description }}
          </li>
        </ul>
        <li>
          <strong>Условие: </strong>
          <pre>{{ condition.condition.body }}</pre>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ToggleConditionCard",
  props: {
    condition: Object,
  },
};
</script>

<style scoped></style>
