const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bParser = require('body-parser');
const cors = require('cors');
// const dotenv = require('dotenv');

const empRoutes = require('./routes/EmployeeRoutes');
const authRoutes = require('./routes/AuthRouter');
const userRoutes = require('./routes/UserRouter');

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

app.use(cors({ origin: '*' }));
app.use('/api/auth', authRoutes);
app.use('/api/employee', empRoutes);
app.use('/api/user', userRoutes);