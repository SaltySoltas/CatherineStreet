import comments_service from '../services/comments_service';
import express from 'express';
import util from './util';

function is_valid_url(url: string | undefined): boolean {
    if(url === undefined){
        return false;
    }

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
        let {url} = req.params;

        util.api_precondition(is_valid_url(url), "Invalid url passed");

        comments_service.get_website_id(url)
        .then(id => {
            res.status(200).send({id: id});
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    post_comment (req: express.Request, res: express.Response) {
        // Don't need to parse user_id to int, request body json has data types associated
        let {user_id, url, text, parent_id} = req.body;

        if(parent_id === undefined) parent_id = null;

        util.api_precondition_is_defined(user_id, "user_id is a required field");
        util.api_precondition(is_valid_url(url), "Invalid url passed");
        util.api_precondition(!!text, "Invalid comment text");

        comments_service.post_comment(user_id, url, text, parent_id)
        .then(result => {
            res.status(200).send({comment_id: result});
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    get_comments (req: express.Request, res: express.Response) {
        let url = req.query['url'] as string;
        let {parent_id, start, limit, sort_type} = util.parse_query_ints(req);

        if(util.is_undefined(req.query['parent_id'])) parent_id = null;

        util.api_precondition(is_valid_url(url), "Invalid url passed");
        util.api_precondition_is_defined(start, "Could not parse start int");
        util.api_precondition_is_defined(limit, "Could not parse limit int");
        util.api_precondition_is_defined(parent_id, "Could not parse parent_id int");

        comments_service.get_comments(url, parent_id, start, limit, sort_type)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    add_comment_reaction (req: express.Request, res: express.Response) {
        let {comment_id, reaction_id, user_id} = util.parse_path_ints(req);

        util.api_precondition_is_defined(comment_id, "Could not parse comment_id int");
        util.api_precondition_is_defined(reaction_id, "Could not parse reaction_id int");
        util.api_precondition_is_defined(user_id, "Could not parse user_id int");


        comments_service.add_comment_reaction(comment_id, reaction_id, user_id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    remove_comment_reaction (req: express.Request, res: express.Response) {
        let {comment_id, reaction_id, user_id} = util.parse_path_ints(req);

        util.api_precondition_is_defined(comment_id, "Could not parse comment_id int");
        util.api_precondition_is_defined(reaction_id, "Could not parse reaction_id int");
        util.api_precondition_is_defined(user_id, "Could not parse user_id int");


        comments_service.remove_comment_reaction(comment_id, reaction_id, user_id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    get_comment_reactions (req: express.Request, res: express.Response) {
        let {comment_id} = util.parse_path_ints(req);

        util.api_precondition_is_defined(comment_id, "comment_id is undefined");

        comments_service.get_comment_reactions(comment_id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }

}