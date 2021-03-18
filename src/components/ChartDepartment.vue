<template>
  <vue-highcharts
    class="chart-columns"
    type="chart"
    :options="chartOptions"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
  />
</template>

<script>
import VueHighcharts from 'vue3-highcharts';
import { reactive } from 'vue';

export default {
  name: 'ChartDepartment',
  components: {
    VueHighcharts,
  },
  props: {
    departmentsData: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
    },
  },
  computed: {
    categories() {
      return reactive(Object.keys(this.departmentsData[this.idx]));
    },
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          width: 500,
        },
        title: {
          text: 'Детализация по каждому отделу',
        },
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        xAxis: {
          categories: this.categories,
        },
        yAxis: {
          title: {
            text: '<span style="font-size: 0.8rem">Количество документов</span>',
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: false,
        series: [
          {
            name: 'working',
            data: this.seriesData('working'),
            cursor: 'pointer',
            color: 'red',
          },
          {
            name: 'completed',
            data: this.seriesData('completed'),
            cursor: 'pointer',
          },
        ],
        plotOptions: {
          series: {
            stacking: 'normal',
            allowPointSelect: true,
            dataLabels: {
              enabled: true,
              format: '{point.y} шт.',
            },
          },
        },
      };
    },
  },
  methods: {
    seriesData(action) {
      const data = [];
      this.categories.forEach((k) => {
        data.push(this.departmentsData[this.idx][k][action]);
      });
      return reactive(data);
    },
  },
  mounted() {
    console.log('Render bar');
    console.log(this.seriesData);
  },
  updated() {
    console.log('Updated bar department');
    console.log(this.seriesData);
  },
};
</script>

<style scoped>
</style>
