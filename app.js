// core packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// project files
const AppError = require('./lib/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes middleware
const departmentRoutes = require('./routes/department');
const classSectionRoutes = require('./routes/classSection');

app.use('/api/v1/department', departmentRoutes);
app.use('/api/v1/grade', classSectionRoutes);

app.all('*', (req, _, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
