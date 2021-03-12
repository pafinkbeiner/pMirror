import { createStore, action } from "easy-peasy";

const store = createStore({
    user: undefined,
    setUser: action((state, payload) => {
      state.user = payload;
    }),
  });

export default store;