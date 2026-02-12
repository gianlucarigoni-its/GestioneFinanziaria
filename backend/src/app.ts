import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from "./api/routes/auth/authRouter";
import router from "./api/Router";


const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyparser.json());

app.use("/auth", authRouter);

app.use("/api", router);

export default app;

