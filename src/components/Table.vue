<template>
  <ul class="table-component">
    <li v-for="item in countries" :key="item.code">
      <Row
        :country="item"
        :editing="item.code === data.editing"
        v-on:select="setEditing(item.code)"
        v-on:update="handleUpdate($event)"
      />
    </li>
  </ul>
</template>

<script>
import { reactive } from "vue";
import Row from "./Row";

export default {
  name: "Table",
  components: {
    Row,
  },
  props: {
    countries: Array,
  },
  setup(_, { emit }) {
    const data = reactive({ editing: null, region: "" });

    const setEditing = (value) => (data.editing = value);
    const handleUpdate = (event) => {
      data.editing = null;
      emit("update", event);
    };

    return {
      data,
      setEditing,
      handleUpdate,
    };
  },
};
</script>

<style scoped>
ul.table-component {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul.table-component > li {
  border-bottom: 1px solid #eee;
}

ul.table-component > li:hover {
  background-color: #eee;
}
</style>
