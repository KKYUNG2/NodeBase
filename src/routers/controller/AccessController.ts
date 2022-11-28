import {json, Request, Response} from "express";
import UtilController from './UtilController';
import DataChecker from "../../modules/DataChecker";
import {createToken, JwtModel} from "../../middlewares/JwtAuth";
import Logger from "../../modules/Logger"
import UserService from '../../routers/services/user/UserService'


class AccessController extends UtilController {


    public Join = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                "loginId", "pwd", "userType", "email", "phoneNumber", "gender"
            ]),
            DataChecker.stringArrCheck(res, req.body, [
                "address", "addressDetail", "zipCode"
            ], false)
        ) as {
            loginId: string,
            pwd: string,
            userType: string,
            email: string,
            phoneNumber: string,
            gender: string,
            address: string,
            addressDetail: string,
            zipCode: string
        };

        let result = await UserService.Join(res, data.loginId, data.pwd, data.userType, data.email, data.phoneNumber, data.gender
            , data.address, data.addressDetail, data.zipCode)


        if(result)
            return this.true(res,'JS0', {result: result})


    }

    public access = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                "loginId", "pwd"
            ])
        ) as {
            loginId: string,
            pwd: string
        };

        let result = await UserService.Access(res, data.loginId, data.pwd)

        // 세션 등록 추가
        if (result)
            return this.true(res, 'TS1', {data: result})


    }

    public resetPw = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                "loginId", "pwd"
            ])
        ) as {
            loginId: string,
            pwd: string
        };

        // todo 비밀번호 초기화 로직 필요
        let result = await UserService.Access(res, data.loginId, data.pwd)

        // 세션 등록 추가
        if (result)
            return this.true(res, 'TS1', {data: result})


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

        if (token)
            return this.true(res, 'TS1', {token: token})
        else
            return this.false(res, 'TF1')

    }


}

export default new AccessController();