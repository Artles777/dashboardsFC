const { Router } = require("express");
const { newJsonExcel } = require("../processedSheet");

const router = Router();

router.get("/api/stages/completed", (req, res) => {
  let dep;
  let stage;
  const stages = {};

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.stages).forEach(([s]) => {
        if (dep !== department) stages[(dep = department)] = {};
        if (s !== stage) stages[department][(stage = s)] = 0;
      });
    });
  });

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.stages).forEach(([s, valueStage]) => {
        if (stages[department][stage] !== valueStage.completed) {
          stages[department][s] += valueStage.completed;
        }
      });
    });
  });

  res.json(stages);
});

router.get("/api/stages/working", (req, res) => {
  let dep;
  let stage;
  const stages = {};

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.stages).forEach(([s]) => {
        if (dep !== department) stages[(dep = department)] = {};
        if (s !== stage) stages[department][(stage = s)] = 0;
      });
    });
  });

  Object.entries(newJsonExcel).forEach(([department, value]) => {
    Object.values(value).forEach((name) => {
      Object.entries(name.stages).forEach(([s, valueStage]) => {
        if (stages[department][stage] !== valueStage.working) {
          stages[department][s] += valueStage.working;
        }
      });
    });
  });

  res.json(stages);
});

module.exports = router;
