import {json, Request, Response} from "express";
import UtilController from './UtilController';
import DataChecker from "../../modules/DataChecker";
import {createToken, JwtModel} from "../../middlewares/JwtAuth";
import Logger from "../../modules/Logger"
import UserService from '../../routers/services/user/UserService'
import crypto from "crypto";

class AccessController extends UtilController {


    public Join = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                "loginId", "pwd", "userType", "email", "phoneNumber", "gender", "name"
            ]),
            DataChecker.stringArrCheck(res, req.body, [
                "address", "addressDetail", "zipCode", "nickName"
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
            zipCode: string,
            name: string,
            nickName: string
        };

        let result = await UserService.Join(res, data.loginId, data.pwd, data.userType, data.email, data.name, data.nickName, data.phoneNumber, data.gender
            , data.address, data.addressDetail, data.zipCode)

        if(result){
            return this.true(res,'JS0', {token: result})
        }
        else
            return this.false(res, 'LA')


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
        else
            return this.false(res, 'Login Fail')


    }

    public resetPw = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                "loginId"
            ])
        ) as {
            loginId: string
        };

        // todo 비밀번호 초기화 로직 필요
        let result = await UserService.getUserData(data.loginId)

        // 세션 등록 추가
        if (result)
            return this.true(res, 'TS1', {data: result})
        else
            return this.false(res, 'MF0')

    }


    public updatePw = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                "loginId", 'pwd'
            ])
        ) as {
            loginId: string,
            pwd: string
        };

        // todo 비밀번호 초기화 로직 필요
        let result = await UserService.updatePwd(data.loginId, data.pwd);

        // 세션 등록 추가
        if (result)
            return this.true(res, 'UPS0')
        else
            return this.false(res, 'UPF0')

    }


    public updateUser = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, [
                "loginId", "email", 'phoneNumber', 'address', 'addressDetail', 'zipCode'
            ])
        ) as {
            loginId: string,
            email: string,
            phoneNumber: string,
            address: string,
            addressDetail: string,
            zipCode: string
        };

        // todo 비밀번호 초기화 로직 필요
        let result = await UserService.updateUser(data.loginId, data.email, data.phoneNumber, data.address, data.addressDetail, data.zipCode);

        // 세션 등록 추가
        if (result)
            return this.true(res, 'US1')
        else
            return this.false(res, 'UF0')

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

    public userBlack = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        let data = DataChecker.mergeObject(
            DataChecker.loadJWTValue(req.body),
            DataChecker.loadJWTAdminCheck(res, req.body),
            DataChecker.needArrCheck(res, req.body, ["targetUserId", "status"])
        ) as {
            userId: string,
            targetUserId: string,
            status: string
        };

        let result = await UserService.black(data.targetUserId, data.status);

        if(result)
            return this.true(res, 'UBS0')
        else
            return this.false(res, 'UBF0')


    }

    public warn = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        let data = DataChecker.mergeObject(
            DataChecker.loadJWTValue(req.body),
            DataChecker.loadJWTAdminCheck(res, req.body),
            DataChecker.needArrCheck(res, req.body, ["targetUserId"])
        ) as {
            targetUserId: string,
        };

        let result = await UserService.warn(data.targetUserId);

        if(result)
            return this.true(res, 'UWS0');
        else
            return this.false(res, 'UWF0')

    }


}

export default new AccessController();