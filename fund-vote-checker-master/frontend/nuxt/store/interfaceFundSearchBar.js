export const state = () => ({
  showInterface: false,
  selectedFunds: []
});

export const mutations = {
  ChangeSelectedFunds(state, array) {
    state.selectedFunds = array;
  },
  ChangeShowInterface(state, bool) {
    state.showInterface = bool;
  }
};
