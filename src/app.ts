import express, {Response, Request} from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Tour management server is up and running'});
});
export default app;
