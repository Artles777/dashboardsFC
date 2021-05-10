const { Router } = require('express');
const { newJsonExcel } = require('../processedSheet');

const router = Router();

router.get('/api/documents/completed', (req, res) => {
  let dep;
  let document;
  const documents = {};

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.documents).forEach(([doc]) => {
        if (dep !== department) documents[dep = department] = {};
        if (doc !== document) documents[department][document = doc] = 0;
      });
    });
  });

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.documents).forEach(([doc, valueStage]) => {
        if (documents[department][document] !== valueStage.completed) {
          documents[department][doc] += valueStage.completed;
        }
      });
    });
  });

  res.json(documents);
});

router.get('/api/documents/working', (req, res) => {
  let dep;
  let document;
  const documents = {};

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.documents).forEach(([doc]) => {
        if (dep !== department) documents[dep = department] = {};
        if (doc !== document) documents[department][document = doc] = 0;
      });
    });
  });

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.documents).forEach(([doc, valueStage]) => {
        if (documents[department][document] !== valueStage.working) {
          documents[department][doc] += valueStage.working;
        }
      });
    });
  });

  res.json(documents);
});

module.exports = router;
