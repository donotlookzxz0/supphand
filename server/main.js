import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import pool from './config/db.js';
import limiter from './middleware/rateLimiter.js'

import authRoutes from './routes/authRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter())
app.use(cookieParser());

app.use('/auth', authRoutes)
app.use('/tickets', ticketRoutes)

app.get('/', async(req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`db name ${result.rows[0].current_database}`)
});

const port = process.env.PORT || 2000

app.listen(port, () => {
    console.log(`${process.env.PORT}`);
});

