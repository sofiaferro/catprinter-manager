const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const indexRoutes = require('./routes/index');
const healthCheckRoutes = require('./routes/healthCheck');
const printRoutes = require('./routes/print');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.use('/', indexRoutes);
app.use('/health-check', healthCheckRoutes);
app.use('/api', printRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});