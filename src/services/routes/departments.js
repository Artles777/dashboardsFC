const { Router } = require('express');
const { newJsonExcel } = require('../processedSheet');

const router = Router();

router.get('/departments', (req, res) => {
  res.send(Object.keys(newJsonExcel));
});

router.get('/department/:id', (req, res) => {
  const { id } = req.params;
  const dep = Object.keys(newJsonExcel);
  res.send(dep[id]);
});

router.get('/departments/names', (req, res) => {
  const result = {};
  const names = Object.values(newJsonExcel).map((n) => Object.keys(n));
  Object.keys(newJsonExcel).forEach((n, idx) => {
    result[n] = names[idx];
  });
  res.send(result);
});

router.get('/departments/names/:id', (req, res) => {
  const { id } = req.params;
  const names = Object.values(newJsonExcel).map((n) => Object.keys(n));
  res.send(id <= names.length ? names[id] : names[0]);
});

router.get('/departments/completed', (req, res) => {
  const result = {};
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.completed))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  Object.keys(newJsonExcel).forEach((n, idx) => {
    result[n] = completed[idx];
  });
  res.send(result);
});

router.get('/departments/working', (req, res) => {
  const result = {};
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.working))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  Object.keys(newJsonExcel).forEach((n, idx) => {
    result[n] = completed[idx];
  });
  res.send(result);
});

module.exports = router;
