const { Router } = require('express');
const { mapJson, newJsonExcel } = require('../processedSheet');

const router = Router();

router.get('/names', (req, res) => {
  const names = [...new Set(mapJson.map((row) => row.name))];
  res.send(names);
});

router.get('/names/:id', (req, res) => {
  const { id } = req.params;
  const names = [...new Set(mapJson.map((row) => row.name))];
  res.send(names[id]);
});

router.get('/name/completed', (req, res) => {
  const result = {};
  const completed = [];
  Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.forEach((value) => completed.push(value.completed)));
  const names = [...new Set(mapJson.map((row) => row.name))];
  names.forEach((n, idx) => {
    result[n] = completed[idx];
  });
  res.send(result);
});

router.get('/name/working', (req, res) => {
  const result = {};
  const completed = [];
  Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.forEach((value) => completed.push(value.working)));
  const names = [...new Set(mapJson.map((row) => row.name))];
  names.forEach((n, idx) => {
    result[n] = completed[idx];
  });
  res.send(result);
});

module.exports = router;
