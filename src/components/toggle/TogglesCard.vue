<template>
  <v-card>
    <v-card-title>
      Toggles
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addToggle">
        <v-icon left>mdi-plus</v-icon>
        Создать
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4">
          <v-autocomplete
            v-model="searchToggleTypes"
            :items="toggleTypes"
            clearable
            deletable-chips
            dense
            label="Фильтр по типу"
            multiple
            small-chips
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            v-model.lazy="search"
            clearable
            dense
            label="Фильтр по имени"
          ></v-text-field>
        </v-col>
      </v-row>
      <toggle-list
        :toggles="filteredToggles"
        @edit-toggle="editToggleEvent"
        @remove-toggle="removeToggle"
        @switch-toggle="switchToggle"
      ></toggle-list>
    </v-card-text>
    <v-dialog v-model="showCreateDialog" width="50%">
      <toggle-edit-card
        :condition-engines="conditionEngines"
        :feature-toggles-types="toggleTypes"
        :toggle="toggle"
        @close="showCreateDialog = false"
        @save="saveToggle"
      ></toggle-edit-card>
    </v-dialog>
  </v-card>
</template>

<script>
import ToggleList from "@/components/toggle/ToggleList";
import ToggleEditCard from "@/components/toggle/ToggleEditCard";

export default {
  name: "TogglesCard",
  components: { ToggleList, ToggleEditCard },
  data: () => ({
    toggles: [],
    conditionEngines: [],
    toggleTypes: [],
    searchToggleTypes: [],
    search: null,
    showCreateDialog: false,
    toggle: {},
    toggleDefault: {
      id: null,
      name: null,
      enabled: false,
      startDate: null,
      endDate: null,
      type: null,
      description: null,
      condition: null,
    },
  }),
  created() {
    Promise.all([
      this.$api.ref.toggleTypes(),
      this.$api.ref.conditionEngines(),
      this.$api.toggle.getToggles(),
    ]).then((response) => {
      this.toggleTypes =
        response[0].status === 200 ? response[0].data.types : [];
      const data =
        response[1].status === 200 ? response[1].data.conditionEngines : [];
      this.conditionEngines = data.map((el, idx) => {
        return { id: idx, name: `${el.type} ${el.language}`, ...el };
      });
      this.toggles =
        response[2].status === 200 ? response[2].data.featureToggles : [];
    });
  },
  computed: {
    filteredToggles() {
      if (this.searchToggleTypes.length > 0) {
        return this.toggles
          .filter((el) => this.searchToggleTypes.includes(el.type))
          .filter(
            (el) =>
              el.name
                .toLowerCase()
                .startsWith((this.search || "").toLowerCase()) || !this.search
          );
      } else {
        return this.toggles.filter(
          (el) =>
            el.name
              .toLowerCase()
              .startsWith((this.search || "").toLowerCase()) || !this.search
        );
      }
    },
  },
  methods: {
    loadToggles() {
      this.$api.toggle.getToggles().then((response) => {
        this.toggles =
          response.status === 200 ? response.data.featureToggles : [];
      });
    },
    addToggle() {
      this.toggle = JSON.parse(JSON.stringify(this.toggleDefault));
      this.showCreateDialog = true;
    },
    editToggleEvent(toggle) {
      this.toggle = JSON.parse(JSON.stringify(toggle));
      this.showCreateDialog = true;
    },
    removeToggle(toggle) {
      this.$api.toggle.deleteToggle(toggle.id).then(() => {
        this.toggles = this.toggles.filter((el) => el.id !== toggle.id);
        this.$notifier.showMessage({
          content: `Toggle успешно удален`,
          color: "success",
        });
      });
    },
    saveToggle: function (toggle) {
      const action = !toggle.id ? "addToggle" : "updateToggle";
      const msgAction = !toggle.id ? "создан" : "обновлен";
      this.$api.toggle[action](toggle).then(() => {
        this.loadToggles();
        this.$notifier.showMessage({
          content: `Toggle успешно ${msgAction}`,
          color: "success",
        });
      });
      this.showCreateDialog = false;
    },
    switchToggle(toggle) {
      this.$api.toggle.updateToggle(toggle).then(() => {
        this.$notifier.showMessage({
          content: `Toggle успешно обновлен`,
          color: "success",
        });
      });
    },
  },
};
</script>
