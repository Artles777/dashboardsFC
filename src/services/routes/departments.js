const { Router } = require("express");
const { newJsonExcel } = require("../processedSheet");

const router = Router();

router.get("/api/departments", (req, res) => {
  res.send(Object.keys(newJsonExcel));
});

router.get("/api/department/:id", (req, res) => {
  const { id } = req.params;
  const dep = Object.keys(newJsonExcel);
  res.send(dep[id]);
});

router.get("/api/departments/names", (req, res) => {
  const result = {};
  const names = Object.values(newJsonExcel).map((n) => Object.keys(n));
  Object.keys(newJsonExcel).forEach((data, idx) => {
    result[data] = names[idx];
  });
  res.send(result);
});

router.get("/api/departments/names/:id", (req, res) => {
  const { id } = req.params;
  const names = Object.values(newJsonExcel).map((n) => Object.keys(n));
  res.send(id <= names.length ? names[id] : names[0]);
});

router.get("/api/departments/completed", (req, res) => {
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

router.get("/api/departments/working", (req, res) => {
  const result = {};
  const completed = Object.values(newJsonExcel)
    .map((n) => Object.values(n))
    .map((dep) => dep.map((value) => value.working))
    .map((sum) => sum.reduce((acc, n) => acc + n));
  Object.keys(newJsonExcel).forEach((data, idx) => {
    result[data] = completed[idx];
  });
  res.send(result);
});

router.get("/api/departments/stages", (req, res) => {
  let dep;
  const result = {};
  const stages = {};

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.stages).forEach(([s]) => {
        if (dep !== department) stages[(dep = department)] = [];
        stages[department].push(s);
      });
    });
  });

  Object.entries(stages).forEach(([department, stage]) => {
    result[department] = stage.filter((k, i, arr) => arr.indexOf(k) === i);
  });
  res.json(result);
});

router.get("/api/departments/documents", (req, res) => {
  let dep;
  const result = {};
  const documents = {};

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.documents).forEach(([s]) => {
        if (dep !== department) documents[(dep = department)] = [];
        documents[department].push(s);
      });
    });
  });

  Object.entries(documents).forEach(([department, stage]) => {
    result[department] = stage.filter((k, i, arr) => arr.indexOf(k) === i);
  });
  res.json(result);
});

module.exports = router;
