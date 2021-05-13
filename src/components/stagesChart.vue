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
import VueHighcharts from "vue3-highcharts";
import { ref } from "vue";
import Servise from "../services/Servise";

export default {
  name: "Stages-chart",
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
          type: "bar",
          width: 600,
          height: 350,
        },
        title: {
          text: "Детализация по этапам",
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
            text: "<span style='font-size: 0.8rem'>Количество документов</span>",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        series: [
          {
            name: "working",
            data: this.working,
            cursor: "pointer",
            color: "#FF0000",
            states: {
              hover: {
                brightness: 0.3,
              },
            },
          },
          {
            name: "completed",
            data: this.completed,
            cursor: "pointer",
          },
        ],
        plotOptions: {
          series: {
            states: {
              inactive: {
                enabled: false,
              },
            },
            stacking: "normal",
            dataLabels: {
              enabled: true,
              format: "{point.y}",
            },
            pointWidth: 20,
          },
        },
      };
    },
  },
  methods: {
    async getCategories(department) {
      const res = await Servise.fetchStages();
      this.categories = await res.data[department];
    },

    async getCompleted(department) {
      const res = await Servise.fetchStagesCompleted();
      const result = await this.categories.map((stage) => res.data[department][stage]);
      this.completed = result;
    },

    async getWorking(department) {
      const res = await Servise.fetchStagesWorking();
      const result = await this.categories.map((stage) => res.data[department][stage]);
      this.working = result;
    },
  },
  async created() {
    await this.getCategories(this.col);
    await this.getCompleted(this.col);
    await this.getWorking(this.col);
  },
  watch: {
    async col() {
      await this.getCategories(this.col);
      await this.getCompleted(this.col);
      await this.getWorking(this.col);
    },
  },
};
</script>
