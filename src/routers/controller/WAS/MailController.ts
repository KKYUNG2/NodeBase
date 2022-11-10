
import {Request, Response} from "express";
import UtilController from '../UtilController';

class MailController extends UtilController {

    public send = async (req: Request, res: Response) => {

    }

}

export default new MailController();