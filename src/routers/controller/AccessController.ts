import {json, Request, Response} from "express";
import UtilController from './UtilController';
import DataChecker from "../../modules/DataChecker";
import {createToken, JwtModel} from "../../middlewares/JwtAuth";
import Logger from "../../modules/Logger"

class AccessController extends UtilController {

    public access = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);
        let data = DataChecker.mergeObject(
            DataChecker.loadJWTValue(req.body),
            DataChecker.loadJWTUserCheck(res, req.body)
        ) as {
            userId: string,
        };

        const token = createToken(new JwtModel(({u: data.userId, t: 'USER'} as JwtModel)));

        if(token)
            return this.true(res, 'TS1', {token: token})
        else
            return this.false(res, 'TF1')

    }

    public adminAccess = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        let data = DataChecker.mergeObject(
            DataChecker.loadJWTValue(req.body),
            DataChecker.loadJWTAdminCheck(res, req.body)
        ) as {
            userId: string,
        };

        const token = createToken(new JwtModel(({u: data.userId, t: 'ADMIN'} as JwtModel)));

        if(token)
            return this.true(res, 'TS1', {token: token})
        else
            return this.false(res, 'TF1')

    }

}

export default new AccessController();