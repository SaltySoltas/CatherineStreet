import express from 'express';
import session, { SessionData } from 'express-session';
import users_service from '../services/users_service';
import util from './util';

export default {

    

    get_user_by_id (req: express.Request, res: express.Response) {
        let {user_id} = util.parse_path_ints(req);

        util.api_precondition_is_defined(user_id, "Could not parse user_id int");

        users_service.get_user_by_id(user_id)
        .then(user => {
            res.status(200).send({
                user: user
            });
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    create_new_user (req: express.Request, res: express.Response) {
        let {first_name, last_name, google_id} = req.body;

        util.api_precondition(!!first_name, "Invalid first name");
        util.api_precondition(!!last_name, "Invalid last name");
    
        users_service.create_new_user(first_name, last_name, google_id)
        .then(new_user_id => {
            res.status(200).send({user_id: new_user_id});
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    get_user_by_google_id (req: express.Request, res: express.Response) {
        let {google_id} = req.params;

        util.api_precondition(util.is_big_int(google_id), "Invalid google id");

        users_service.get_user_by_google_id(google_id)
        .then(user => {
            res.status(200).send({user: user});
        })
        .catch((err: any) => {
            res.status(400).send(err);
        })
    },

    create_session (req: express.Request, res: express.Response) {
        let {user_id} = util.parse_path_ints(req);
        //return session if successful
        var session_id = req.session.id;
        users_service.create_or_update_session(user_id, session_id).then(() => {
            res.status(200).send();
        })
        .catch((err: any) => {
            res.status(400).send(err);
        })
        
    }
}