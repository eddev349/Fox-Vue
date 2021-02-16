<template>
  <div class="container">
    <Loader v-if="loading" />
    <div v-if="!loading">
      <div class="filters">
        <div>
          <label>Region:</label>
          <select v-model="data.region">
            <option v-for="item in regions" :value="item" :key="item">
              {{ item || "View all countries" }}
            </option>
          </select>
        </div>
        <div>
          <label>View Mode:</label>
          <select v-model="data.viewMode">
            <option value="table">Table</option>
            <option value="graph">Graph</option>
          </select>
        </div>
      </div>
      <Table
        :countries="list"
        v-on:update="handleUpdate($event)"
        v-if="data.viewMode === 'table'"
      />
      <Chart v-if="data.viewMode === 'graph'" :countries="list" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import Loader from "./Loader.vue";
import Chart from "./Chart";
import Table from "./Table.vue";

export default {
  name: "Main",
  components: { Loader, Table, Chart },
  setup() {
    const store = useStore();
    store.dispatch("loadData");

    const data = reactive({ region: "", viewMode: "table" });

    const list = computed(() => {
      const countries = store.state.countries;
      if (!data.region) {
        return countries;
      }
      return countries.filter((c) => c.region === data.region);
    });

    const regions = computed(() => {
      const values = store.state.countries.reduce(
        (res, c) => ({ ...res, [c.region]: 1 }),
        { "": 1 }
      );

      return Object.keys(values);
    });

    const handleUpdate = (event) => store.commit("updateCountry", event);

    return {
      data,
      loading: computed(() => store.state.loading),
      list,
      regions,
      handleUpdate,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
}

div.filters {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}

div.filters > div {
  padding: 0 30px;
}

div.filters select {
  margin-left: 10px;
  width: 200px;
  height: 30px;
  padding: 0 10px;
  outline: none;
}
</style>
