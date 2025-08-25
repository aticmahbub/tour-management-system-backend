import express, {Response, Request} from 'express';
import {userRoutes} from './app/modules/user/user.routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors);
app.use('/api/v1/user', userRoutes);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Tour management server is up and running'});
});
export default app;
