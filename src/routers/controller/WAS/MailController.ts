import {json, Request, Response} from "express";
import UtilController from '../UtilController';

import MailService from '../../services/mail/mailService'

class MailController extends UtilController {

    public send = async (req: Request, res: Response) => {
        let result = await MailService.send();

        if (result)
            return this.true(res, 'M01', {a: 'a'})
        else
            return this.false(res, 'M01')


    }

}

export default new MailController();