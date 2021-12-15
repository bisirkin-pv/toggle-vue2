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
        <v-col
          cols="12"
          sm="4"
        >
          <v-autocomplete
            v-model="condition"
            :items="conditionEngines"
            deletable-chips
            dense
            item-text="type"
            item-value="type"
            label="Фильтр по типу"
            multiple
            small-chips
            clearable
          >
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          sm="8">
          <v-text-field
            v-model.lazy="search"
            dense
            label="Фильтр по имени"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <toggle-list
        :toggles="filteredToggles"
        @edit-toggle="editToggleEvent"
        @remove-toggle="removeToggle"
      ></toggle-list>
    </v-card-text>
    <v-dialog
      v-model="showCreateDialog"
      width="50%"
    >
      <toggle-edit-card
        :condition-engines="conditionEngines"
        :toggle="toggle"
        @close="showCreateDialog=false"
        @save="saveToggle"
      ></toggle-edit-card>
    </v-dialog>
  </v-card>
</template>

<script>
import ToggleList from "@/components/ToggleList";
import ToggleEditCard from "@/components/ToggleEditCard";

export default {
  name: "TogglesCard",
  components: {ToggleList, ToggleEditCard},
  data: () => ({
    featureToggles: [],
    conditionEngines: [{type: 'OPERATIONAL'}, {type: 'TEST'}],
    condition: [],
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
      condition: {}
    }
  }),
  mounted() {
    fetch('toggles.json')
      .then((response) => response.json())
      .then(json => this.featureToggles = json.featureToggles)
  },
  computed: {
    filteredToggles() {
      if (this.condition.length > 0) {
        return this.featureToggles
          .filter(el => this.condition.includes(el.type))
          .filter(el => el.name.startsWith(this.search) || !this.search)
      } else {
        return this.featureToggles.filter(el => el.name.startsWith(this.search) || !this.search)
      }
    }
  },
  methods: {
    addToggle() {
      this.toggle = JSON.parse(JSON.stringify(this.toggleDefault))
      this.showCreateDialog = true
    },
    editToggleEvent(toggle) {
      this.toggle = JSON.parse(JSON.stringify(toggle))
      this.showCreateDialog = true
    },
    removeToggle(toggle) {
      console.log('removeToggle', toggle)
    },
    saveToggle(toggle) {
      console.log('saveToggle', toggle)
      this.showCreateDialog = false
    }
  }
};
</script>
