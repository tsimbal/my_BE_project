import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRouter from './routes/api/contact.js';

const { PORT = 5000 } = process.env;
const app = express();

app.use(
  cors({
    origin: ['https://test-node-tsimbal.herokuapp.com'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

function start() {
  try {
    mongoose.connect(
      'mongodb+srv://tsimbal:Qwerty654321@cluster0.abyp07w.mongodb.net/contact_db?retryWrites=true&w=majority'
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
