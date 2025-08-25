import express, {Response, Request} from 'express';
import cors from 'cors';
import {router} from './app/routes';
import {globalErrorHandler} from './app/middlewares/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Tour management server is up and running'});
});

app.use(globalErrorHandler);
export default app;
