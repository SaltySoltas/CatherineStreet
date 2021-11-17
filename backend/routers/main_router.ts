import comments_router from "./comments_router";
import users_router from "./users_router";
import express from 'express';
import login_router from "./login_router";

var main_router = express.Router();

main_router.use('/comments', comments_router);
main_router.use('/users', users_router);
main_router.use('/login', login_router);

export default main_router;
