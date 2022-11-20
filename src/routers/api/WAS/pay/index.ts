import express from "express";

import pay from './pay';
import {validCheck} from "../../../../middlewares/JwtAuth";

let router = express.Router();

router.use('/', [validCheck], pay);

export default router;