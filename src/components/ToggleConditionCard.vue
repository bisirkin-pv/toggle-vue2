<template>
  <v-card>
    <v-card-title>Описание условия <v-spacer></v-spacer>
      <v-btn icon color="mx-4"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
    </v-card-title>
    <v-card-text>
      <ul>
        <li><strong>Тип и язык: </strong>JAVA</li>
        <li><strong>Параметры: </strong>12</li>
        <li><strong>Условие: </strong>Integer.valueOf("12") > 12</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ToggleConditionCard"
}
</script>

<style scoped>

</style>