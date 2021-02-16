<template>
  <div>
    <apexchart
      width="100%"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "Chart",
  props: {
    countries: Array,
  },
  setup(props) {
    const chartOptions = computed(() => ({
      chart: { id: "population-chart" },
      xaxis: { categories: props.countries.map((c) => c.code) },
    }));
    const series = computed(() => [
      {
        name: "Population",
        data: props.countries.map((c) => c.population),
      },
    ]);
    console.log(props.countries.map((c) => c.code));
    return {
      chartOptions,
      series,
    };
  },
};
</script>
