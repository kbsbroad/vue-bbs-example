const toggleDrawer = (state, payload) => {
  state.drawer = Boolean(payload);
};

export default {
  toggleDrawer,
};
