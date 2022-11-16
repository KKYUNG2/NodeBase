import express from "express";

import pay from './pay';

let router = express.Router();

router.use('/', pay);

export default router;