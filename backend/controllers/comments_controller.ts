import comments_service from '../services/comments_service';
import express from 'express';

function is_valid_url(url:string): boolean {
    try{
        new URL(url);
    }catch(_){
        return false;
    }
    return true;
}

export default {
    get_site_id_test (req: express.Request, res: express.Response, next: express.NextFunction) {
        let url = req.params.url;
        if(!url || !is_valid_url(url)){
            res.status(400).send("Invalid url");
            return;
        }

        comments_service.get_website_id(url)
        .then(id => {
            res.status(200).send({id: id});
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    post_comment (req: express.Request, res: express.Response, next: express.NextFunction) {
        let {user_id, url, text} = req.body;

        // Could make the error response here more detailed with more elaborate if/else
        // Helper?
        if(!user_id || !url || !is_valid_url(url) || !text){
            res.status(400).send("Invalid comment post");
            return;
        }

        comments_service.post_comment(user_id, url, text)
        .then(result => {
            res.status(200).send({comment_id: result});
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }

}