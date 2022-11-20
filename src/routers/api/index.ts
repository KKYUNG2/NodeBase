import {Router} from "express";

import Config from '../../../config'
import apiWAS from './WAS'
import Access from "./Access";

let router = Router();

router.use("/api/access", Access);

if (Config.SERVER_TYPE === "WAS") {
    router.use("/api", apiWAS);
}
console.log(router);

export default router;
