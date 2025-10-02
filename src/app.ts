import express, {Response, Request} from 'express';
import cors from 'cors';
import {router} from './app/routes';
import {globalErrorHandler} from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from 'express-session';
import './app/config/passport';
import {envVars} from './app/config/env';

const app = express();

app.use(
    expressSession({
        secret: envVars.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: envVars.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(cookieParser());
app.use('/api/v1/', router);

app.use(passport.initialize());
// app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Tour management system server is up and running',
    });
});

app.use(globalErrorHandler);

app.use(notFound);
export default app;
