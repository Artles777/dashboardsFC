const { Router } = require('express');
const { newJsonExcel } = require('../processedSheet');

const router = Router();

router.get('/api/completed', (req, res) => {
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.completed))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  res.send(JSON.stringify(completed));
});

router.get('/api/completed/:id', (req, res) => {
  const { id } = req.params;
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.completed))
    .map((sum) => sum.reduce((acc, n) => acc + n, 0));
  res.send(JSON.stringify(completed[id]));
});

router.get('/api/working', (req, res) => {
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.working))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  res.send(JSON.stringify(completed));
});

router.get('/api/working/:id', (req, res) => {
  const { id } = req.params;
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.working))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  res.send(JSON.stringify(completed[id]));
});

module.exports = router;
