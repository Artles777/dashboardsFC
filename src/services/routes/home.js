const { Router } = require('express');
const { newJsonExcel, mapJson } = require('../processedSheet');

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/data', (req, res) => {
  res.send(newJsonExcel);
});

router.get('/api/test', (req, res) => {
  res.send(mapJson);
});

module.exports = router;
