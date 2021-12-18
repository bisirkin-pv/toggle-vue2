export default {
  install(Vue, store) {
    Vue.prototype.$notifier = {
      showMessage({ content = "", color = "primary", timeout = 5000 }) {
        store.dispatch("snackbar/setSnackbar", {
          content,
          color,
          timeout,
        });
      },
    };
  },
};
