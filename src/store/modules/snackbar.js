export const state = () => ({
  snackbars: [],
});

const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },
  DELETE_SNACKBAR(state, snackbar) {
    const idx = state.snackbars.indexOf(snackbar);
    if (idx >= 0) {
      state.snackbars.splice(idx, 1);
    }
  },
};

const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true;
    snackbar.color = snackbar.color || "primary";
    commit("SET_SNACKBAR", snackbar);
  },
  delSnackbar({ commit }, snackbar) {
    commit("DELETE_SNACKBAR", snackbar);
  },
};

const getters = {
  getSnackbars: (state) => {
    return state.snackbars;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
