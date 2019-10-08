// third-party libraries
import express from 'express';

// controllers
import {creatRole, getRoles} from '../role/roleController';

const roleRouter = express.Router();

roleRouter.route('/')
// .post()
.get(getRoles);


export default roleRouter;
