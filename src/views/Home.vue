<template>
  <DepartmentsChart
    @changeDepartment="selectionCol"
  />
  <NamesChart :col="departmentCol" />
</template>

<script>
import { ref } from 'vue';
import DepartmentsChart from '../components/Departments-chart.vue';
import NamesChart from '../components/Names-chart.vue';

export default {
  name: 'Home',
  data() {
    return {
      departmentCol: ref('3 отдел'),
    };
  },
  components: {
    DepartmentsChart,
    NamesChart,
  },
  methods: {
    selectionCol(department) {
      this.departmentCol = department;
    },
  },
};
</script>
