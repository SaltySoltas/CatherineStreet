import express from "express";
import users_sql from '../sql/users_sql';
import mysql_db from '../services/mysql_db';
import users_controller from '../controllers/users_controller';

var users_router = express.Router();

users_router.get('/test', (req: express.Request, res: express.Response) => {
    res.send("Users test complete!");
});

// Get user by ID
users_router.get('/:id', users_controller.get_user_by_id);

// Create new user, respond with new user id
users_router.post('/create', users_controller.create_new_user);

users_router.post('/auth', users_controller.auth)

// module.exports = users_router;
export default users_router;