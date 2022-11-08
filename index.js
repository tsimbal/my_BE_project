import 'dotenv/config';
import { readFile } from 'fs/promises';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
const swaggerDoc = JSON.parse(
  await readFile(new URL('./swagger/openapi.json', import.meta.url))
);

import * as middleware from './middlewares/index.js';

import contactRouter from './routes/api/contact.js';
import authRouter from './routes/api/auth.js';
import userRouter from './routes/api/user.js';
import productRouter from './routes/api/product.js';
import categoryRouter from './routes/api/category.js';
import currencyRouter from './routes/api/currency.js';

const { PORT = 5000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false;

      return compression.filter(req, res);
    },
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/contacts', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', middleware.auth, userRouter);
app.use('/api/products', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/currency', currencyRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({
    message,
  });
});

function start() {
  try {
    mongoose.connect(
      'mongodb+srv://tsimbal:Qwerty654321@cluster0.abyp07w.mongodb.net/test_node_db?retryWrites=true&w=majority'
    );
    app.listen(PORT, () =>
      console.log(`Server has been started on PORT: ${PORT}`)
    );
  } catch (error) {
    console.log('Server error!!!', error.message);
    process.exit(1);
  }
}

start();
