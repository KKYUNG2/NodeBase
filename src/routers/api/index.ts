import {Router} from "express";

import Config from '../../../config'
import apiWAS from './WAS'
import apiDFS from './DFS'
import Access from "./Access";

let router = Router();

router.use("/api/access", Access);

if (Config.SERVER_TYPE === "WAS") {
    router.use("/api", apiWAS);
}

if (Config.SERVER_TYPE === "DFS") {
    router.use("/api", apiDFS);
}


export default router;
