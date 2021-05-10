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
import { ref } from 'vue';
import Servise from '../services/Servise';

export default {
  name: 'Names-chart',
  props: {
    col: {
      type: String,
      require: true,
    },
  },
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
          type: 'bar',
          width: 600,
        },
        title: {
          text: 'Детализация по сотрудникам',
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
        tooltip: {
          className: 'tooltip',
          split: true,
        },
        series: [
          {
            name: 'working',
            data: this.working,
            cursor: 'pointer',
            color: 'red',
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
          series: {
            stacking: 'normal',
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
    async getCategories(department) {
      const res = await Servise.fetchNames();
      this.categories = await res.data[department];
    },

    async getCompleted() {
      const res = await Servise.fetchNamesCompleted();
      const result = await this.categories.map((name) => res.data[name]);
      this.completed = result;
    },

    async getWorking() {
      const res = await Servise.fetchNamesWorking();
      const result = await this.categories.map((name) => res.data[name]);
      this.working = result;
    },
  },
  async created() {
    await this.getCategories(this.col);
    await this.getCompleted();
    await this.getWorking();
  },
  watch: {
    async col() {
      await this.getCategories(this.col);
      await this.getCompleted();
      await this.getWorking();
    },
  },
};
</script>

<style scoped>

</style>
