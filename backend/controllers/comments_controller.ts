import comments_service from '../services/comments_service';
import express from 'express';

function is_valid_url(url:string): boolean {
    let url_obj;
    try{
        url_obj = new URL(url);
    }catch(_){
        return false;
    }
    // Don't want comments on people's file systems, only internet pages
    return url_obj.protocol != 'file';
}

export default {
    get_site_id_test (req: express.Request, res: express.Response) {
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

    post_comment (req: express.Request, res: express.Response) {
        // Don't need to parse user_id to int, request body json has data types while path and query params are automatically strings
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
        });
    },

    get_comments (req: express.Request, res: express.Response) {
        let {url, start, limit} = req.params;

        if(!url || !is_valid_url(url) || !start || !limit){
            res.status(400).send("Invalid request");
            return;
        }

        let start_int = parseInt(start);
        let limit_int = parseInt(limit);

        if(isNaN(start_int) || isNaN(limit_int)){
            res.status(400).send("Could not parse ints");
            return;
        }

        comments_service.get_comments(url, start_int, limit_int)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });

    }

}