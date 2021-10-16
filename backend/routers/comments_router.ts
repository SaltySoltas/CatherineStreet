import express from 'express';

var comments_router = express.Router();

comments_router.get('/test', (req: express.Request, res: express.Response) => {
    res.send("Comments route test complete!")
})

export default comments_router;