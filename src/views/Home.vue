<template>
  <Chart />
  <ChartDepartment />
</template>

<script>
import Chart from '../components/Chart.vue';
import ChartDepartment from '../components/ChartDepartment.vue';

export default {
  name: 'Home',
  components: {
    Chart,
    ChartDepartment,
  },
};
</script>
