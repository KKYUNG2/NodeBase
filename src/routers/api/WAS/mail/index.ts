import express from "express";

import mail from './mail';
import {jwtAuthCheck} from "../../../../middlewares/JwtAuth";

let router = express.Router();

router.use('/', [jwtAuthCheck], mail);

export default router;