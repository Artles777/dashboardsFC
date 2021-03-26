const path = require('path');
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = require('express')();
// js гавно

const PORT = 7500 || process.env.PORT;
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const resultExcel = excelToJson({
  source: fs.readFileSync(path.resolve(__dirname, 'listDashboards.xlsx')),
  columnToKey: {
    A: 'department',
    E: 'name',
    I: 'completed',
    J: 'working',
  },
});

let department;
let name;
const mapJson = resultExcel['Лист1'].slice(1);
const newJsonExcel = {};

mapJson.forEach((row) => {
  if (department !== row.department) newJsonExcel[department = row.department] = {};
  if (name !== row.name) newJsonExcel[department][name = row.name] = { completed: 0, working: 0 };
  if ([name].completed !== row.completed) {
    newJsonExcel[department][name].completed += row.completed;
    newJsonExcel[department][name].working += row.working;
  }
});

app.get('/', (req, res) => {
  res.send(newJsonExcel);
});

app.get('/departments', (req, res) => {
  res.send(Object.keys(newJsonExcel));
});

app.get('/department/:id', (req, res) => {
  const { id } = req.params;
  const dep = Object.keys(newJsonExcel);
  res.send(dep[id]);
});

app.get('/names', (req, res) => {
  const names = [...new Set(mapJson.map((row) => row.name))];
  res.send(names);
});

app.get('/names/:id', (req, res) => {
  const { id } = req.params;
  const names = [...new Set(mapJson.map((row) => row.name))];
  res.send(names[id]);
});

app.get('/departments/names', (req, res) => {
  const names = Object.values(newJsonExcel).map((n) => Object.keys(n));
  const depNames = Object.keys(newJsonExcel);
  const result = depNames.map((n, idx) => ({
    [n]: names[idx],
  }));
  res.send(result);
});

app.get('/departments/names/:id', (req, res) => {
  const { id } = req.params;
  const names = Object.values(newJsonExcel).map((n) => Object.keys(n));
  res.send(id <= names.length ? names[id] : names[0]);
});

app.get('/completed', (req, res) => {
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.completed))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  res.send(completed);
});

app.get('/completed/:id', (req, res) => {
  const { id } = req.params;
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.completed))
    .map((sum) => sum.reduce((acc, n) => acc + n, 0));
  res.send(JSON.stringify(completed[id]));
});

app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}/`);
});
