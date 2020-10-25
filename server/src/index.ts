import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDatabase from './config/database';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import passportConfig from './config/passport';
const PORT = 8000;
const app = express();
app.use(express.json());

app.use(session({
  secret: 'hjgcccvyeiftew48445154723rsdf44r7gfwfdedfytfdt',
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(morgan('dev'));
passportConfig(passport);
app.use('/api/', authRouter);
app.use('/user/', passport.authenticate('jwt', {session: false}), userRouter);
connectDatabase();


app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
})