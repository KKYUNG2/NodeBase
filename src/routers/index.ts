import config from '../../config'
import {Router} from "express";

import apiWAS from '../routers/api/WAS'
import Access from "./api/Access";

const router = Router();


router.use('/api/access', Access);

if (config.SERVER_TYPE == 'WAS') {
    router.use('/api', apiWAS)
}

export default router;