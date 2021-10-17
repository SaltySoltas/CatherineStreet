import express from 'express';
import users_service from '../services/users_service';


export default {
    get_user_by_id (req: express.Request, res: express.Response, next: express.NextFunction) {
        let id = req.params.id;
        if(!id || !/^\d+$/.test(id)){
            res.status(400).send("Invalid user id");
            return;
        }

        users_service.get_user_by_id(id)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },

    create_new_user (req: express.Request, res: express.Response, next: express.NextFunction) {
        let {first_name, last_name} = req.body;
        if(!first_name || !last_name){
            res.status(400).send("Invalid first or last name");
            return;
        }
    
        users_service.create_new_user(first_name, last_name)
        .then(new_user_id => {
            res.status(200).send({user_id: new_user_id});
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }
}