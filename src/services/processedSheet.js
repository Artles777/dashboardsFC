const path = require('path');
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

let department;
let name;
let stages;

const resultExcel = excelToJson({
  source: fs.readFileSync(path.resolve(__dirname, '..', 'listDashboards.xlsx')),
  columnToKey: {
    A: 'department',
    E: 'name',
    G: 'stages',
    I: 'completed',
    J: 'working',
  },
});

const mapJson = resultExcel['Лист1'].slice(1);
const newJsonExcel = {};

mapJson.forEach((row) => {
  if (department !== row.department) {
    newJsonExcel[department = row.department] = {};
  }
  if (name !== row.name) {
    newJsonExcel[department][name = row.name] = {
      completed: 0, working: 0, stages: {},
    };
  }
  if (newJsonExcel[department][name].completed !== row.completed) {
    newJsonExcel[department][name].completed += row.completed;
    newJsonExcel[department][name].working += row.working;
  }
  if (stages !== row.stages) {
    newJsonExcel[department][name].stages[stages = row.stages] = { completed: 0, working: 0 };
  }
  if (newJsonExcel[department][name].stages[stages].completed !== row.completed) {
    newJsonExcel[department][name].stages[stages].completed += row.completed;
    newJsonExcel[department][name].stages[stages].working += row.working;
  }
});

module.exports = {
  mapJson,
  newJsonExcel,
};
