<template>
  <v-expansion-panels multiple>
    <v-expansion-panel v-for="toggle of toggles" :key="toggle.id">
      <v-expansion-panel-header class="pa-3">
        <v-list-item>
          <v-list-item-content class="align-start">
            <v-list-item-title>
              <v-chip class="mr-3" small>{{ toggle.type }}</v-chip>
              <strong>{{ toggle.name }}</strong>
            </v-list-item-title>
            <v-list-item-subtitle
              ><strong>Период действия: </strong>{{ toggle.startDate }} -
              {{ toggle.endDate }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch
              v-model="toggle.enabled"
              @click.stop="switchToggleClick(toggle)"
            ></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card flat>
          <v-card-text class="pt-0">
            <p v-if="toggle.description">
              {{ toggle.description }}
            </p>
            <toggle-condition-card
              v-if="toggle.condition"
              :condition="toggle.condition"
            ></toggle-condition-card>
          </v-card-text>
          <v-card-actions>
            <v-btn icon @click="confirmDelete(toggle)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              text
              outlined
              color="primary"
              @click="editToggleClick(toggle)"
              >Редактировать</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-dialog v-model="showConfirmDelete" width="40%">
      <v-card>
        <v-card-title>Внимание</v-card-title>
        <v-card-text>Вы действительно хотите удалить toggle?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="showConfirmDelete = false">Нет</v-btn>
          <v-btn color="error" @click="deleteToggleClick">Да</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-expansion-panels>
</template>

<script>
import ToggleConditionCard from "@/components/toggle/ToggleConditionCard";

export default {
  name: "ToggleList",
  components: { ToggleConditionCard },
  props: {
    toggles: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    currentToggle: null,
    showConfirmDelete: false,
  }),
  methods: {
    editToggleClick(toggle) {
      this.$emit("edit-toggle", toggle);
    },
    confirmDelete(toggle) {
      this.currentToggle = toggle;
      this.showConfirmDelete = true;
    },
    deleteToggleClick() {
      this.$emit("remove-toggle", this.currentToggle);
      this.showConfirmDelete = false;
    },
    switchToggleClick(toggle) {
      this.$emit("switch-toggle", toggle);
    },
  },
};
</script>

<style scoped></style>
