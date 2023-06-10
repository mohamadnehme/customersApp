const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api/customers', require('./routes/customerRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
