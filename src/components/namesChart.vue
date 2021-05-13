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
import VueHighcharts from "vue3-highcharts";
import { ref } from "vue";
import Servise from "../services/Servise";

export default {
  name: "Names-chart",
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
        },
        title: {
          text: "Детализация по сотрудникам",
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
              format: "{point.value}",
            },
            pointWidth: 16,
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
      const result = await this.categories.map((name) => {
        // const arrayWorking = this.working.map((obj) => obj.y);
        // let data;
        // arrayWorking[i] > res.data[name] ? (data = arrayWorking[i]) : (data = res.data[name]);
        // console.log(data, res.data[name]);
        return {
          y: res.data[name],
          value: res.data[name],
        };
      });
      this.completed = result;
    },

    async getWorking() {
      const res = await Servise.fetchNamesWorking();
      const result = await this.categories.map((name) => {
        const arrayCompleted = this.completed.map((obj) => obj.value);
        // let data;
        // arrayCompleted[i] > res.data[name] ? (data = arrayCompleted[i]) : (data = res.data[name]);
        // console.log(Math.max(...arrayCompleted));
        console.log(arrayCompleted.reduce((acc, n) => (acc + n) * 0.2));
        this.completed = this.completed.map((obj) => ({
          y: res.data[name] - obj.y > 0 ? res.data[name] - obj.y : obj.y,
          value: obj.value,
        }));
        return {
          y:
            Math.max(...arrayCompleted) > res.data[name]
              ? res.data[name] + arrayCompleted.reduce((acc, n) => (acc + n) * 0.2)
              : res.data[name],
          value: res.data[name],
          dataLabels: {
            // x: 30,
            crop: false,
            overflow: "allow",
            // align: 'right',
            // color: '#000',
          },
        };
      });
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

<style scoped></style>
