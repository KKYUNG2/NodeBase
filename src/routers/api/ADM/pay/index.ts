import express from "express";

import pay from './pay';
import {jwtAuthCheck} from "../../../../middlewares/JwtAuth";

let router = express.Router();

router.use('/', [jwtAuthCheck], pay);

export default router;