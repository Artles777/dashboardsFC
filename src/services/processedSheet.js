const path = require('path');
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

let department;
let name;
let stages;
let documents;

const resultExcel = excelToJson({
  source: fs.readFileSync(path.resolve(__dirname, '..', 'listDashboards.xlsx')),
  columnToKey: {
    A: 'department',
    E: 'name',
    F: 'documents',
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
});

mapJson.forEach((row) => {
  if (name !== row.name) {
    newJsonExcel[row.department][name = row.name] = {
      completed: 0, working: 0, stages: {}, documents: {},
    };
  }
});

mapJson.forEach((row) => {
  if (newJsonExcel[row.department][row.name].completed !== row.completed) {
    newJsonExcel[row.department][row.name].completed += row.completed;
  }

  if (newJsonExcel[row.department][row.name].working !== row.working) {
    newJsonExcel[row.department][row.name].working += row.working;
  }
});

mapJson.forEach((row) => {
  if (stages !== row.stages) {
    newJsonExcel[row.department][row.name].stages[stages = row.stages] = {
      completed: 0, working: 0,
    };
  }
  if (documents !== row.documents) {
    newJsonExcel[row.department][row.name].documents[documents = row.documents] = {
      completed: 0, working: 0,
    };
  }
});

mapJson.forEach((row) => {
  if (newJsonExcel[department][name].stages[stages].completed !== row.completed) {
    newJsonExcel[row.department][row.name].stages[row.stages].completed += row.completed;
  }

  if (newJsonExcel[department][name].stages[stages].working !== row.working) {
    newJsonExcel[row.department][row.name].stages[row.stages].working += row.working;
  }

  if (newJsonExcel[department][name].documents[documents].completed !== row.completed) {
    newJsonExcel[row.department][row.name].documents[row.documents].completed += row.completed;
  }

  if (newJsonExcel[department][name].documents[documents].working !== row.working) {
    newJsonExcel[row.department][row.name].documents[row.documents].working += row.working;
  }
});

module.exports = {
  mapJson,
  newJsonExcel,
};
