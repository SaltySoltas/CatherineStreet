
import login_controller from '../controllers/login_controller';
import express from 'express';

var login_router = express.Router();

login_router.use('/google', login_controller.google_login);

export default login_router;