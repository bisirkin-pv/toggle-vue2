<template>
  <v-app>
    <v-app-bar dense fixed app>
      <v-toolbar-title>
        <RouterLink to="/" class="text-decoration-none black--text"
          >Feature Toggles</RouterLink
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text to="/about"> About </v-btn>
      <v-btn color="primary">
        <v-icon>mdi-account</v-icon>
        Sing in
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <the-snackbar></the-snackbar>
  </v-app>
</template>

<script>
import TheSnackbar from "@/components/single/TheSnackbar";

export default {
  components: {
    TheSnackbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
