const { Router } = require('express');
const { newJsonExcel } = require('../processedSheet');

const router = Router();

router.get('/completed', (req, res) => {
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.completed))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  res.send(JSON.stringify(completed));
});

router.get('/completed/:id', (req, res) => {
  const { id } = req.params;
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.completed))
    .map((sum) => sum.reduce((acc, n) => acc + n, 0));
  res.send(JSON.stringify(completed[id]));
});

router.get('/working', (req, res) => {
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.working))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  res.send(JSON.stringify(completed));
});

router.get('/working/:id', (req, res) => {
  const { id } = req.params;
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.working))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  res.send(JSON.stringify(completed[id]));
});

module.exports = router;
