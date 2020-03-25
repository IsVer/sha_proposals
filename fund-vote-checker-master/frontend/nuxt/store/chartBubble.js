export const state = () => ({
  showManager: [0, 1, 2],
  showESG: [0, 1],
  toggleAll: [0]
});

export const mutations = {
  ChangeControlArray(state, obj) {
    // {name: "showManager", update: [1,2,3]}
    state[obj.name] = obj.update;
  }
};

// export const getters = {
//   test(state, getters) {
//     return state.test ? "yes" : "no"
//   }
// };
