import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import main_router from './routers/main_router';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const INDEX_PATH = path.join(__dirname, "..", "frontend", "dist");

app.use(express.json());

app.use(express.static(INDEX_PATH));

app.use('/api', main_router);

app.get("/a", (req: any, res: any) => {
    res.send("Hello world!");
});

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
