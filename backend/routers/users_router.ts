import express from "express";
import users_sql from '../sql/users_sql';
import mysql_db from '../services/mysql_db';
import { nextTick } from "process";

var users_router = express.Router();

users_router.get('/test', (req: express.Request, res: express.Response) => {
    res.send("Users test complete!");
});

// Get user by ID
users_router.get('/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let db = new mysql_db();
    let query = users_sql.get_user_by_id(Number(req.params.id));
    db.connection.query(query, (err, result) => {
        if(err){
            next(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
});

/* 
* Create new user
* Body {
*     first_name: "User first name",
*     last_name: "User last name"
* }
* 
* Response contains the id of the newly created user
*/
users_router.post('/create', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let {first_name, last_name} = req.body;
    if(!first_name || !last_name){
        res.status(400).send("Invalid first or last name");
        return;
    }

    let db = new mysql_db();

    let create_query = users_sql.create_user(first_name, last_name);
    db.connection.query(create_query, (err, result) => {
        if(err){
            next(err);
        }else{
            console.log(result);
            db.connection.query(users_sql.get_last_insert(), (err, result) => {
                if(err){
                    next(err);
                }else{
                    console.log(result);
                    res.send(result);
                }
            })
        }
    })
});

// module.exports = users_router;
export default users_router;