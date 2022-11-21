import {json, Request, Response} from "express";
import UtilController from './UtilController';
import DataChecker from "../../modules/DataChecker";
import {createToken, JwtModel} from "../../middlewares/JwtAuth";

const moment = require('moment');

class AccessController extends UtilController {

    public access = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.loadJWTValue(req.body),
            DataChecker.loadJWTUserCheck(res, req.body),
            DataChecker.needArrCheck(res, req.body, ['userId'])
        ) as {
            userId: string,
        };

        // 토큰 뭐 들어가야되는지 확인
        const token = createToken(new JwtModel(({u: data.userId, t: 'USER'} as JwtModel)));

        if(token)
            return this.true(res, 'TS1', {token: token})
        else
            return this.false(res, 'TF1')

    }

}

export default new AccessController();