const { Router } = require('express');
const { newJsonExcel, mapJson } = require('../processedSheet');

const router = Router();

router.get('/', (req, res) => {
  res.send(newJsonExcel);
});

router.get('/test', (req, res) => {
  res.send(mapJson);
});

module.exports = router;
