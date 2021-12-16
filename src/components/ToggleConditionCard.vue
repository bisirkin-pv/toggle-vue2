<template>
  <v-card>
    <v-card-title
      >Описание условия <v-spacer></v-spacer>
      <v-btn icon color="mx-4"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
    </v-card-title>
    <v-card-text>
      <ul>
        <li><strong>Тип и язык: </strong>{{ condition.language }}</li>
        <ul>
          <li
            v-for="param of condition.parameters.parameters"
            :key="param.name"
          >
            <strong>{{ param.name }}: </strong>{{ param.description }}
          </li>
        </ul>
        <li><strong>Условие: </strong>{{ condition.condition.body }}</li>
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
