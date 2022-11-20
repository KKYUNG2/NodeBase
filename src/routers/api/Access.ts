
import {Router, Request, Response} from "express";

import AccessController from "../controller/AccessController";

let router = Router();

router.post("/user", AccessController.access)

export default router;
