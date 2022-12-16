import express from "express";

import position from './position';
import {jwtAuthCheck} from "../../../../middlewares/JwtAuth";

let router = express.Router();

router.use('/', [jwtAuthCheck], position);

export default router;