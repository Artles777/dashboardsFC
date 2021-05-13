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
      heightToCount: 0,
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
          height: 800 + this.heightToCount,
        },
        title: {
          text: "Детализация по документам",
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
          },
        },
      };
    },
  },
  methods: {
    async getCategories(department) {
      const res = await Servise.fetchDocuments();
      this.categories = await res.data[department];
      if (this.categories.length > 25) {
        this.heightToCount = 800;
      } else if (this.categories.length <= 10) {
        this.heightToCount = -300;
      } else {
        this.heightToCount = 0;
      }
    },

    async getCompleted(department) {
      const res = await Servise.fetchDocumentsCompleted();
      const result = await this.categories.map((document) => res.data[department][document]);
      this.completed = result;
    },

    async getWorking(department) {
      const res = await Servise.fetchDocumentsWorking();
      const result = await this.categories.map((document) => res.data[department][document]);
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

<style scoped>
.highcharts-bar-series {
  opacity: 1;
}
</style>
