import {Router} from "express";
import Config from "../../../../config";
import mail from './mail'
import pay from './pay'

const router = Router();

router.use('/mail', mail);
router.use('/pay', pay);

export default router;