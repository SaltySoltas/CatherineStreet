const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const INDEX_PATH = path.join(__dirname, "..", "frontend", "dist");

app.use(express.static(INDEX_PATH));

app.get("/a", (req: any, res: any) => {
    res.send("Hello world!");
});

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
