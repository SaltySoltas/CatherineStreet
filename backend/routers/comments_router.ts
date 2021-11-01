import comments_controller from '../controllers/comments_controller';
import express from 'express';

var comments_router = express.Router();

comments_router.get('/test', (req: express.Request, res: express.Response) => {
    res.send("Comments route test complete!")
})

comments_router.get('/site_id/:url', comments_controller.get_site_id_test);
comments_router.get('/:url/:start/:limit', comments_controller.get_comments);

comments_router.post('/', comments_controller.post_comment);

comments_router.put('/:comment_id/reaction/:reaction_id/:user_id', comments_controller.add_comment_reaction);

export default comments_router;