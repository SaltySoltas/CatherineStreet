import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import winston from 'winston';
import expressWinston from 'express-winston';

import main_router from './routers/main_router';
import errors_middleware from './errors/errors_middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const INDEX_PATH = path.join(__dirname, "..", "frontend", "dist");

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

app.use('/api', main_router);

app.get("/a", (req: any, res: any) => {
    res.send("Hello world!");
});


// THIS MUST BE THE LAST .use
// So that all normal functionality is done BEFORE error handling
app.use(errors_middleware);

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
