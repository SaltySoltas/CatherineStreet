import users_service from '../services/users_service';
import express from 'express';
import login_service from '../services/login_service';
import util from './util';


export default {
    google_login (req: express.Request, res: express.Response) {
        let {token} = req.body

        util.api_precondition(!!token, "Invalid google OAuth token passed");

        login_service.do_google_auth(token)
        .then(user => {
            users_service.create_or_update_session(user as number, req.session.id).then(() => {
                res.status(200).send({
                    user: user
                });
            })
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },
}