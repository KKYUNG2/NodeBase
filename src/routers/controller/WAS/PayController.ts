import {Request, Response} from "express";
import UtilController from '../UtilController';

import PayService from "../../services/pay/payService"
import DataChecker from "../../../modules/DataChecker";

class PayController extends UtilController {

    public sms = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                 'ordNm', 'ordHpNo', 'goodsNm', 'goodsAmt', 'mid', 'usrId', 'sid'])
        ) as {
            ordNm: string,
            ordHpNo: string,
            mid: string,
            usrId: string,
            sid: string,
            goodsNm: string,
            goodsAmt: number
        };

        // sms 결제 준비
        let result = await PayService.smsPay(res, data.ordNm, data.ordHpNo, data.mid, data.usrId, data.sid, data.goodsNm, data.goodsAmt);

        console.log(result.data.header.resCode); // 처리 필요
        console.log(result.data.header); // 처리 필요함
        console.log(result.data.body); // 처리 필요함

        if(result)
            return this.true(res, 'SC1');
        else
            return this.false(res, 'SF1')

    }

    public smsResult = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, ['mid', 'usrId', 'sid', 'reqId'])
        ) as {
            reqId: string,
            mid: string,
            usrId: string,
            sid: string,
        };

        // sms 결제 내역 조회
        let result = await PayService.smsPayResult(res, data.mid, data.usrId, data.sid, data.reqId);

        if(result)
            return this.true(res, 'S01', {result: result});
        else
            return this.false(res, 'S01')

    }

}

export default new PayController();