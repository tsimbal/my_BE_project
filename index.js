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
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
  })
);

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
app.use('/api/contacts', middleware.addedHeaders, contactRouter);
app.use('/api/auth', middleware.addedHeaders, authRouter);
app.use('/api/user', middleware.auth, middleware.addedHeaders, userRouter);
app.use('/api/products', middleware.addedHeaders, productRouter);
app.use('/api/category', middleware.addedHeaders, categoryRouter);
app.use('/api/currency', middleware.addedHeaders, currencyRouter);

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
