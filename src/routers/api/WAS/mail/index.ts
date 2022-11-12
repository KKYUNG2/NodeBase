import express from "express";

import mail from './mail';

let router = express.Router();

router.use('/', mail);

export default router;