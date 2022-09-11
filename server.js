const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bParser = require('body-parser');
// const dotenv = require('dotenv');

const empRoutes = require('./routes/EmployeeRoutes');
const authRoutes = require('./routes/AuthRouter');

// dotenv.config();

mongoose.connect('mongodb://localhost:27017/Metis', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database connection established');
});

const app = express();
app.use(morgan('dev'));
app.use(bParser.urlencoded({extended: true}));
app.use(bParser.json());
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} Port`);
});

app.use('/api/employee', empRoutes);
app.use('/api', authRoutes);