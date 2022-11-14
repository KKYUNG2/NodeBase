import {json, Request, Response} from "express";
import UtilController from '../UtilController';

import MailService from '../../services/mail/mailService'
import DataChecker from "../../../modules/DataChecker";

class MailController extends UtilController {

    public send = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, ["targetMail"], [])
        ) as {
            targetMail: string
        };

        let result = await MailService.send(res, data.targetMail);

        if(result)
            return this.true(res, 'MS0');
        else
            return this.false(res, 'MF0')

    }

}

export default new MailController();