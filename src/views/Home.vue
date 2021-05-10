<template>
  <div class="wrapper">
    <DepartmentsChart
      @changeDepartment="selectionCol"
    />
    <NamesChart :col="departmentCol" />
  </div>
  <div class="wrapper">
    <StagesChart :col="departmentCol" />
    <DocumentsChart :col="departmentCol" />
  </div>
</template>

<script>
import { ref } from 'vue';
import DepartmentsChart from '../components/departmentsChart.vue';
import NamesChart from '../components/namesChart.vue';
import StagesChart from '../components/stagesChart.vue';
import DocumentsChart from '../components/documentsChart.vue';

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
    StagesChart,
    DocumentsChart,
  },
  methods: {
    selectionCol(department) {
      this.departmentCol = department;
    },
  },
};
</script>

<style scoped>
  .wrapper {
    display: flex;
    padding-bottom: 40px;
  }
</style>
