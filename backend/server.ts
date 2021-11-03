import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import winston from 'winston';
import expressWinston from 'express-winston';
import main_router from './routers/main_router';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const INDEX_PATH = path.join(__dirname, "..", "frontend", "dist");
const SESSION_SECRET = process.env.SESSION_KEY || "catherinestreetsecret";
const oneWeek = 604800000;

const sessions = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    statusLevels: true,
    expressFormat: true,
    colorize: true,
    ignoreRoute: function (req, res) { return false; }
  }));

app.use(express.static(INDEX_PATH));

app.use(sessions({
    secret: SESSION_SECRET,
    saveUnitialized: true,
    cookie: {maxAge: oneWeek},
    resave: false
}));

app.use(cookieParser());

app.use('/api', main_router);

app.get("/a", (req: any, res: any) => {
    res.send("Hello world!");
});

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
