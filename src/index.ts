import { IError } from './types/errors/IErrorResp';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import express, { NextFunction, Request, Response, Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
const swaggerDoc = JSON.parse(
  `${await readFile(new URL('./swagger/openapion', import.meta.url))}`
);

import * as middleware from './middlewares/index';

import contactRouter from './routes/api/contact';
import authRouter from './routes/api/auth';
import userRouter from './routes/api/user';
import productRouter from './routes/api/product';
import categoryRouter from './routes/api/category';
import currencyRouter from './routes/api/currency';

const { PORT = 5000 } = process.env;
const app: Express = express();

app.use(cookieParser());
app.use(cors({ origin: [`${process.env.CLIENT_URL}`], credentials: true }));

app.use(compression());
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
app.use('/api/user', middleware.addedHeaders, middleware.auth, userRouter);
app.use('/api/products', middleware.addedHeaders, productRouter);
app.use('/api/category', middleware.addedHeaders, categoryRouter);
app.use('/api/currency', middleware.addedHeaders, currencyRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((error: IError, req: Request, res: Response, _: NextFunction) => {
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
  } catch (error: unknown) {
    const typedError = error as Error;

    console.log('Server error!!!', typedError.message);
    process.exit(1);
  }
}

start();
