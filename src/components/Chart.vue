<template>
  <vue-highcharts
    class="chart-columns"
    type="chart"
    :options="chartOptions"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
    @click="changeIdx"
  />
</template>

<script>
import VueHighcharts from 'vue3-highcharts';
import { reactive } from 'vue';

export default {
  name: 'Chart',
  components: {
    VueHighcharts,
  },
  props: {
    seriesData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cols: [],
    };
  },
  computed: {
    categories() {
      return reactive(Object.keys(this.seriesData).map((key) => `${key} отдел`));
    },
    chartOptions() {
      return {
        chart: {
          type: 'column',
          width: 500,
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
          shared: true,
        },
        series: [
          {
            name: 'working',
            data: this.values('working'),
            color: 'red',
            cursor: 'pointer',
            stack: 0,
          },
          {
            name: 'completed',
            data: this.values('completed'),
            cursor: 'pointer',
            stack: 0,
          },
        ],
        plotOptions: {
          column: {
            stacking: 'percent',
            id: 'navig',
          },
          series: {
            // allowPointSelect: true,
            pointWidth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.y}<br/>шт.',
            },
          },
        },
      };
    },
  },
  methods: {
    changeIdx(e) {
      if (e.point) {
        this.$emit('changeIdx', e.point.index + 1);
        this.columnSelection(e);
      }
    },
    columnSelection(e) {
      if (e.point) {
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
      }
    },
    values(action) {
      const reducer = (result, current) => result + current;
      const serialsArr = Object.values(this.seriesData)
        .map((col) => Object.values(col)
          .map((v) => v[action]));
      const completed = serialsArr.map((arr) => arr.reduce(reducer));
      return completed.map((y, i) => ({
        y,
        className: `col-${i + 1}`,
      }));
    },
  },
  mounted() {
    console.log('Render chart');
  },
  updated() {
    console.log('Updated chart');
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
