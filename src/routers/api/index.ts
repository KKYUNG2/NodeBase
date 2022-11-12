import {Router} from "express";

import Config from '../../../config'
import apiWAS from './WAS'

let router = Router();

if (Config.SERVER_TYPE === "WAS") {
    router.use("/api", apiWAS);
}

export default router;
