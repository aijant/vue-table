import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    users: [],
  },
  actions: {
    GET_USERS({ commit }) {
      return axios(
        "http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}",
        {
          method: "GET",
        }
      ).then((response) => {
        commit("SET_USERS", response.data);
      });
    },
  },
  mutations: {
    SET_USERS: (state, users) => {
      state.users = users;
    },
  },
  getters: {
    USERS(state) {
      return state.users;
    },
  },
});

export default store;
