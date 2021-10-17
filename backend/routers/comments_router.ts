import comments_controller from '../controllers/comments_controller';
import express from 'express';

var comments_router = express.Router();

comments_router.get('/test', (req: express.Request, res: express.Response) => {
    res.send("Comments route test complete!")
})

comments_router.get('/site_id/:url', comments_controller.get_site_id_test);

comments_router.post('/', comments_controller.post_comment);

export default comments_router;