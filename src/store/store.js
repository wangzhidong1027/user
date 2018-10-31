import Vue from "vue";
import Vuex from "vuex";
import Car from "./module/car"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    car: Car
  }
});
