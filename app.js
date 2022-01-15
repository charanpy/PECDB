// core packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');

// project files
const AppError = require('./lib/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());

// routes middleware
const departmentRoutes = require('./routes/department');
const classSectionRoutes = require('./routes/classSection');
const subjectRoutes = require('./routes/subject');
const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/student');

app.use('/api/v1/department', departmentRoutes);
app.use('/api/v1/grade', classSectionRoutes);
app.use('/api/v1/subject', subjectRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/student', studentRoutes);

app.all('*', (req, _, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
