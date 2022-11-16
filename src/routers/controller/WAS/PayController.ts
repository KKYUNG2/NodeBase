import {Request, Response} from "express";
import UtilController from '../UtilController';

import PayService from "../../services/pay/payService"
import DataChecker from "../../../modules/DataChecker";

class PayController extends UtilController {

    public sms = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                 'ordNm', 'ordHpNo', 'goodsAmt', 'mid', 'usrId', 'sid', 'payload'])
        ) as {
            ordNm: string,
            ordHpNo: string,
            mid: string,
            usrId: string,
            sid: string,
            payload: string
        };

        // sms 결제 준비
        await PayService.sms(res, data.ordNm, data.ordHpNo, data.mid, data.usrId, data.sid, data.payload);


    }

}

export default new PayController();