import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';

import middlewareJwt from '../middleware/passportJWT';
import middlewareGoogle from '../middleware/passport.google';
import errorHandler from '../middleware/error.handler';

import authRouter from '../routes/auth';
import authorRouter from '../routes/author';
import bookRouter from '../routes/book';
import orderRouter from '../routes/order';
import userRouter from '../routes/user';

import { db } from '../utils/create.admin';

const PORT = process.env.PORT || 8080;
const URL = process.env.URL;
const SECRET_COOKIE = process.env.SECRET_COOKIE;

const app = express();

app.use(cookieParser(SECRET_COOKIE));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

middlewareJwt(passport);
middlewareGoogle(passport);

app.use('/api/auth', authRouter);
app.use('/api/catalog', authorRouter);
app.use('/api/catalog', bookRouter);
app.use('/api/catalog', orderRouter);
app.use('/api/user', userRouter);
app.use(errorHandler);

async function runServer() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, () => {
      console.log(`Server has been started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(`Server message: ${e.message}`);

    await mongoose.connection.close();

    process.exit(1);
  }
}

runServer().then((error) => {
  console.warn(error);
});

export default app;
