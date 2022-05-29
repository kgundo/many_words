import express from 'express'
import fs from 'fs';
import dotenv from 'dotenv';
import helmet from 'helmet';
import errorhandler from 'errorhandler';
import cors from 'cors';

import { router } from './router';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env'});
} else {
    dotenv.config({ path: '.env.example'});
}

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(helmet());

const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGINS,
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['Content-Length', 'Authorization', 'Accept-Language'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: process.env.BODY_MAX_SIZE || '5MB'}));

app.use(function (req, res, next) {
    res.removeHeader('Server');
    next();
});

app.use('/api/v1', router);

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
};

app.use('/ping', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    res.send('OK!');
});

export { app };

/*
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.listen(3000, () => {
    console.log("Start on port 3000.")
})

type User = {
    id: number
    name: string
    email: string
};

const users: User[] = [
    { id: 1, name: "User1", email: "user1@test.local" },
    { id: 2, name: "User2", email: "user2@test.local" },
    { id: 3, name: "User3", email: "user3@test.local" }
]

//一覧取得
app.get('/users', (req: express.Request, res: express.Response) => {
    res.send(JSON.stringify(users))
})
*/