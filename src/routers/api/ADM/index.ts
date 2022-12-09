import {Router} from "express";
import Config from "../../../../config";
import pay from './pay'

const router = Router();

router.use('/pay', pay);

export default router;