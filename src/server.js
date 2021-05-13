const bodyParser = require("body-parser");

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const { PORT } = require("./services/constants");
const HomeRouter = require("./services/routes/home");
const DepartmentsRouter = require("./services/routes/departments");
const NamesRouter = require("./services/routes/names");
const ValuesRouter = require("./services/routes/values");
const StagesRouter = require("./services/routes/stages");
const DocumentsRouter = require("./services/routes/documents");

const app = express();
app.use(express.static("dist"));

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use(HomeRouter);
app.use(DepartmentsRouter);
app.use(NamesRouter);
app.use(ValuesRouter);
app.use(StagesRouter);
app.use(DocumentsRouter);

app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}/`);
});
