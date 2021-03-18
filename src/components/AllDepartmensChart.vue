<template>
  <div>Test</div>
  <div>
    <p class="subtitle">
      {{ data }}
    </p>
  </div>
</template>

<script>
import { reactive } from 'vue';
import Servise from '../services/Servise';

export default {
  name: 'AllDepartmensChart',
  data() {
    return {
      data: reactive([]),
    };
  },
  computed: {
    seriesData() {
      return this.data;
    },
  },
  methods: {
    async getData() {
      const res = await Servise.fetchData();
      this.data = await res.data;
    },
  },
  async created() {
    this.getData();
  },
};
</script>

<style scoped>

</style>
