import {Router} from "express";
import Config from '../../config'
import apiWAS from '../routers/api/WAS'
import Access from "./api/Access";

const router = Router();

router.use('/api/access', Access);

if (Config.SERVER_TYPE === 'WAS') {
    router.use('/api', apiWAS)
}

export default router;