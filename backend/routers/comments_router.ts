import comments_controller from '../controllers/comments_controller';
import express from 'express';

var comments_router = express.Router();

comments_router.get('/test', (req: express.Request, res: express.Response) => {
    res.send("Comments route test complete!")
})

comments_router.get('/site_id/:url', comments_controller.get_site_id_test);
comments_router.get('/', comments_controller.get_comments);

comments_router.post('/', comments_controller.post_comment);

comments_router.put('/:comment_id/reactions/:reaction_id/:user_id', comments_controller.add_comment_reaction);
comments_router.delete('/:comment_id/reactions/:reaction_id/:user_id', comments_controller.remove_comment_reaction);
comments_router.get('/:comment_id/reactions', comments_controller.get_comment_reactions);

export default comments_router;