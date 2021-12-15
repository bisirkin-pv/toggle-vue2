<template>
  <v-card>
    <v-card-title>Создание Feature Toggle</v-card-title>
    <v-card-text>
      <toggle-edit-form
        :toggle="editToggle"
        :condition-engines="conditionEngines"
        @validate="v => this.valid = v"
      ></toggle-edit-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        @click="$emit('close')"
      >Закрыть</v-btn>
      <v-btn
        class="primary"
        @click="$emit('save', editToggle)"
        :disabled="!valid || !changed"
      >Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ToggleEditForm from "@/components/ToggleEditForm";

export default {
  name: "ToggleEditCard",
  components: { ToggleEditForm },
  props: {
    toggle: {
      type: Object
    },
    conditionEngines: Array
  },
  data: () => ({
    valid: false,
    editToggle: {}
  }),
  mounted() {
    this.editToggle = JSON.parse(JSON.stringify(this.toggle))
  },
  watch: {
    toggle: {
      deep: true,
      handler(obj){
        this.editToggle = JSON.parse(JSON.stringify(obj))
      }
    }
  },
  computed:{
    changed(){
      return JSON.stringify(this.toggle) !== JSON.stringify(this.editToggle)
    }
  }
}
</script>

<style scoped>

</style>