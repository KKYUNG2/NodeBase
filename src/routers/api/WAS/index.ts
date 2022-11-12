import {Router} from "express";
import Config from "../../../../config";
import mail from './mail'
import mailController from "../../controller/WAS/MailController";


const router = Router();

router.use('/mail', mail);

export default router;