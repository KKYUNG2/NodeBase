import {json, Request, Response} from "express";
import UtilController from '../UtilController';

import MailService from '../../services/mail/mailService'
import DataChecker from "../../../modules/DataChecker";

class MailController extends UtilController {

    public send = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.loadJWTUserCheck(res, req.body),
            DataChecker.needArrCheck(res, req.body, ["targetMail", "title", "contents"])
        ) as {
            targetMail: string,
            title: string,
            contents: string
        };

        let result = await MailService.send(res, data.targetMail, data.title, data.contents);

        if(result)
            return this.true(res, 'MS0', {
                accepted: result.accepted,
                rejected: result.rejected
            });
        else
            return this.false(res, 'MF0')

    }

}

export default new MailController();