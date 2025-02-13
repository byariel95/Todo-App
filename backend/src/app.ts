import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/user.routes';
import { TaskRoutes } from './routes/task.router';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server is running..!' });
})

app.use('/', UserRoutes);
app.use('/', TaskRoutes);


export default app;

