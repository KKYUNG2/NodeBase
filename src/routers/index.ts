import {Router} from "express";
import Config from '../../config'
import apiWAS from '../routers/api/WAS'
import apiDFS from '../routers/api/DFS'
import Access from "./api/Access";

const router = Router();

router.use('/api/access', Access);

if (Config.SERVER_TYPE === 'WAS') {
    router.use('/api', apiWAS)
}

if (Config.SERVER_TYPE === 'DFS') {
    router.use('/api', apiDFS)
}

export default router;