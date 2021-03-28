const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = require('express')();
const HomeRouter = require('./services/routes/home');
const DepartmentsRouter = require('./services/routes/departments');
const NamesRouter = require('./services/routes/names');
const ValuesRouter = require('./services/routes/values');

const PORT = 7500 || process.env.PORT;
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(HomeRouter);
app.use(DepartmentsRouter);
app.use(NamesRouter);
app.use(ValuesRouter);

app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}/`);
});
