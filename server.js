const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const indexRoutes = require('./routes/index');
const healthCheckRoutes = require('./routes/healthCheck');
const printRoutes = require('./routes/print');
const { scheduleKeepAwake } = require('./services/scheduleKeepAwake'); // Importa la función de mantenimiento

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

if (process.argv.includes('--keep-awake')) {
  console.log("⏱️ Scheduled the printer keep-awake process...");
  scheduleKeepAwake();
}

app.use('/', indexRoutes);
app.use('/health-check', healthCheckRoutes);
app.use('/api', printRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
