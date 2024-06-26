import express from 'express';
import {PORT} from './env.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.listen(PORT,()=>{
    console.log(`server listening on http://localhost:${PORT}`)
})