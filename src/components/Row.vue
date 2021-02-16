<template>
  <div class="row" @click="handleSelect">
    <span class="flag">
      <img :src="country.flag" />
    </span>
    <b class="name">{{ country.name }}</b>
    <span class="region">{{ country.region }}</span>
    <i class="population" v-if="!editing">
      {{ country.population.toLocaleString() }}
    </i>
    <input
      class="population"
      type="number"
      v-if="editing"
      v-model="data.population"
    />
    <button v-if="editing" @click="handleSave">Save</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Table-Row",
  props: {
    country: Object,
    editing: Boolean,
    select: Function,
  },
  setup(props, { emit }) {
    const data = reactive({ ...props.country });

    const handleSelect = () => emit("select");
    const handleSave = (e) => {
      e.stopPropagation();
      emit("update", { ...data });
    };

    return { data, handleSelect, handleSave };
  },
};
</script>

<style scoped>
div.row {
  padding: 10px;
  display: flex;
}

.flag {
  display: flex;
  /* align-items: ; */
  width: 80px;
}

.flag img {
  height: 20px;
  width: auto;
}

.name {
  text-align: left;
  width: 500px;
}

.region {
  text-align: left;
  width: 100px;
}

.population {
  text-align: right;
  width: 150px;
}

button {
  margin-left: 10px;
}
</style>
