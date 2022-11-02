import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import contactRouter from './routes/api/contact.js';

const { PORT = 5000, DB_HOST } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRouter);

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

async function start() {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT, () =>
      console.log(`Server has been started on PORT: ${PORT}`)
    );
  } catch (error) {
    console.log('Server error!!!', error.message);
    process.exit(1);
  }
}

start();
