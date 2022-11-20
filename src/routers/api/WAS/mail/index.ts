import express from "express";

import mail from './mail';
import {validCheck} from "../../../../middlewares/JwtAuth";

let router = express.Router();

router.use('/', [validCheck], mail);

export default router;