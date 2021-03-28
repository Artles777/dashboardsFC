<template>
  <vue-highcharts
    class="chart-columns"
    type="chart"
    :options="chartOptions"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
    @click="columnSelection"
  />
</template>

<script>
import VueHighcharts from 'vue3-highcharts';
import { ref } from 'vue';
import Servise from '../services/Servise';

export default {
  name: 'Departments-chart',
  data() {
    return {
      categories: ref([]),
      completed: ref([]),
      working: ref([]),
    };
  },
  components: {
    VueHighcharts,
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'column',
          width: 600,
        },
        title: {
          text: 'Информация по отделам',
        },
        accessibility: {
          enabled: true,
          exposeAsGroupOnly: true,
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
        tooltip: {
          className: 'tooltip',
          split: true,
        },
        series: [
          {
            name: 'working',
            data: this.working,
            color: 'red',
            cursor: 'pointer',
            stack: 0,
          },
          {
            name: 'completed',
            data: this.completed,
            cursor: 'pointer',
            stack: 0,
          },
        ],
        plotOptions: {
          column: {
            stacking: 'percent',
          },
          series: {
            pointWidth: 40,
            dataLabels: {
              enabled: true,
              format: '{point.y}',
            },
          },
        },
      };
    },
  },
  methods: {
    async getCategories() {
      const res = await Servise.fetchDepartments();
      this.categories = await res.data;
    },

    async getCompleted() {
      const res = await Servise.fetchCompleted();
      const data = await res.data.map((y, i) => ({
        y,
        className: `col-${i + 1}`,
      }));
      this.completed = data;
    },

    async getWorking() {
      const res = await Servise.fetchWorking();
      const data = await res.data.map((y, i) => ({
        y,
        className: `col-${i + 1}`,
      }));
      this.working = data;
    },

    columnSelection(e) {
      if (!e.point) return;
      this.cols = this.$el.querySelectorAll('.highcharts-point');
      if (e.target.classList.contains('fill-point')) {
        this.cols.forEach((el) => (el.classList.contains(e.point.className)
          ? el.classList.remove('fill-point')
          : el.classList.remove('opacity-points')));
      } else if (!e.target.classList.contains('opacity-points')) {
        this.cols.forEach((el) => (el.classList.contains(e.point.className)
          ? el.classList.add('fill-point')
          : el.classList.add('opacity-points')));
      } else {
        this.cols.forEach((el) => (el.classList.contains(e.point.className)
          ? (
            el.classList.remove('opacity-points'),
            el.classList.add('fill-point')
          )
          : (
            el.classList.remove('fill-point'),
            el.classList.add('opacity-points')
          )
        ));
      }
      this.$emit('changeDepartment', e.point.category);
    },
  },
  async created() {
    this.getCategories();
    this.getCompleted();
    this.getWorking();
  },
};
</script>

<style>
  .fill-point {
    stroke: azure;
    stroke-width: 2;
  }
  .opacity-points {
    fill-opacity: 0.1;
  }
  .tooltip {
    display: none;
  }
</style>
