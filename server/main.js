import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
// import limiter from './middleware/rateLimiter.js'

import authRoutes from './routes/authRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import staffRoutes from './routes/staffRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
// app.use(limiter);
app.use(cookieParser());

app.use('/auth', authRoutes)
app.use('/tickets', ticketRoutes)
app.use('/staff', staffRoutes)
app.use('/comments', commentRoutes)

app.get('/', async(req, res) => {
    res.json({message: 'hi'})
});

const port = process.env.PORT || 2000

app.listen(port, () => {
    console.log(`${process.env.PORT}`);
});

