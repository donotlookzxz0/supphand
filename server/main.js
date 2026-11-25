import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import pool from './config/db.js';

import authRoutes from './routes/authRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import staffRoutes from './routes/staffRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

const app = express();

const corsOptions = {
    origin: process.env.PROD_FE || process.env.LOCALHOST_DEV_FE,
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/auth', authRoutes)
app.use('/tickets', ticketRoutes)
app.use('/staff', staffRoutes)
app.use('/comments', commentRoutes)

app.get('/', async(req, res) => {
    res.json({message: 'hi'})
});

app.get('/healthx', (req, res) => {
    res.status(200).json('success')
})

app.get('/v/spb', async (req, res) => {
    
    try {
        const res = await pool.query("SELECT * FROM users ORDER BY id ASC LIMIT 2")
        res.status(200).json(res.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed query'})
    }
})

const port = process.env.PORT || 2000

app.listen(port, () => {
    console.log(`${process.env.PORT}`);
});