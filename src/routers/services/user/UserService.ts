import UtilController from "../../controller/UtilController";
import Config from "../../../../config"
import {createToken, JwtModel} from "../../../middlewares/JwtAuth";
import MariaDB from "../../../modules/MariaDB";
import QM from "../../../modules/QueryMaker";
import * as Crypto from "crypto";


const crypto = require("crypto");

export default class UserService extends UtilController {

    public static async Join(res: any, loginId: string, pwd: string, userType: string, email: string, phoneNumber: string,
                             gender: string, address: string, addressDetail: string, zipCode: string) {

        try {

            let userId = Math.random().toString(36).substring(7, 25);

            let loginData = await MariaDB.getOne(QM.Select("t_node_user",{
                login_id: loginId
            }, ["*"]))

            if(loginData)
                return 'ALE';

            await MariaDB.get([
                QM.Insert("t_node_user",{
                    user_id: userId,
                    login_id: loginId,
                    user_type: userType,
                    email: email,
                    phone_number: phoneNumber,
                    gender: gender,
                    address: address,
                    address_detail: addressDetail,
                    zip_code: zipCode
                }),
                QM.Insert("t_node_login",{
                    user_id: userId,
                    login_id: loginId,
                    pwd: crypto.createHash('sha512').update(pwd).digest('hex'),
                    reg_date: '\\now()'
                })
            ])

            const token = createToken(new JwtModel(({u: userId, t: userType} as JwtModel)));

            return token;

        } catch (err) {
            return err;
        }
    }



    public static async Access(res: any, loginId: string, pwd: string) {

        try {

            let message;

            let loginData = await MariaDB.getOne(QM.Select("t_node_login",{
                login_id: loginId
            }, ["*"]));

            if(!loginData)
                return {
                    result: false,
                    message: 'Not Exist Login Data'
                };


            if(crypto.createHash('sha512').update(pwd).digest('hex') !== loginData.pwd)
                return {
                    result: false,
                    message: 'Incorrect Password'
                };


            const token = createToken(new JwtModel(({u: loginData.user_id, t: loginData.user_type} as JwtModel)));

            return {
                result: false,
                token: token,
                loginData: loginData,
                message: 'Login Success'
            };

        } catch (err) {
            return err;
        }
    }


}

