import { createStore } from "vuex";
import axios from "axios";

const state = {
  loading: false,
  countries: [],
};

const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },

  setCountries(state, countries) {
    state.countries = countries;
  },

  updateCountry(state, country) {
    state.countries = state.countries.map((item) => {
      if (item.code !== country.code) {
        return item;
      }

      return {
        ...item,
        population: parseInt(country.population, 10) || 0,
      };
    });
  },
};

const actions = {
  loadData({ commit }) {
    commit("setLoading", true);
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      const countries = res.data.map((c) => ({
        code: c.alpha2Code,
        name: c.name,
        region: c.region,
        flag: c.flag,
        population: c.population,
        area: c.area,
      }));
      commit("setCountries", countries);
      commit("setLoading", false);
    });
  },
};

export default createStore({ state, mutations, actions });
