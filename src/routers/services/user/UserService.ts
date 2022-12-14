import UtilController from "../../controller/UtilController";
import Config from "../../../../config"
import {createToken, JwtModel} from "../../../middlewares/JwtAuth";
import MariaDB from "../../../modules/MariaDB";
import QM from "../../../modules/QueryMaker";
import MailService from "../mail/MailService";

const escape = require('mysql').escape;
const moment = require('moment');


const crypto = require("crypto");

export default class UserService extends UtilController {

    public static async Join(res: any, loginId: string, pwd: string, userType: string, email: string, name: string, nickName: string,
                             phoneNumber: string, gender: string, address: string, addressDetail: string, zipCode: string) {

        try {

            let userId = Math.random().toString(36).substring(7, 25);

            let loginData = await MariaDB.getOne(QM.Select("t_node_user",{
                login_id: loginId
            }, ["*"]))

            if(loginData)
                return 'LA';

            let result = await MariaDB.get([
                QM.Insert("t_node_user",{
                    user_id: userId,
                    login_id: loginId,
                    user_type: userType,
                    email: email,
                    name: '\\(HEX(AES_ENCRYPT(' + escape(name) + ', ' + escape(userId) + ')))',
                    nick_name: nickName,
                    phone_number: '\\(HEX(AES_ENCRYPT(' + escape(phoneNumber) + ', ' + escape(userId) + ')))',
                    gender: gender,
                    address: address,
                    address_detail: addressDetail,
                    zip_code: zipCode,
                    status: 50
                }),
                QM.Insert("t_node_login",{
                    user_id: userId,
                    login_id: loginId,
                    pwd: crypto.createHash('sha512').update(pwd).digest('hex'),
                    reg_date: '\\now()'
                })
            ])

            if(result){
                const token = createToken(new JwtModel(({u: userId, t: userType} as JwtModel)));
                return token;
            } else {
                return null;
            }


        } catch (err) {
            return err;
        }
    }


    public static async Access(res: any, loginId: string, pwd: string) {

        try {


            let userData = await MariaDB.getOne(QM.Select("t_node_user",{
                login_id: loginId
            }, ["*"]));

            if(!userData)
                return null;

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


            const token = createToken(new JwtModel(({u: userData.user_id, t: userData.user_type} as JwtModel)));

            return {
                token: token,
                loginData: loginData,
                message: 'Login Success'
            };

        } catch (err) {
            return err;
        }
    }


    public static async getUserData(loginId: string) {

        try {

            let loginData = await MariaDB.getOne(QM.Select("t_node_user",{
                login_id: loginId
            }, ["*"]));

            if(!loginData && !loginData.email)
                return false;


            let pwd = moment().format('YYYYMMDD') + loginData.user_id + moment(loginData.reg_date).format('DDD');
            let newPwd: string = "";

            for (let i = 0; i < 6; i++) {
                const rnum = Math.floor(Math.random() * pwd.length);
                newPwd += pwd.substring(rnum, rnum + 1)
            }


            let result = await MariaDB.query(QM.Update("t_node_login",{
                pwd: crypto.createHash('sha512').update(newPwd).digest('hex')
            }, {user_id: loginData.user_id}));

            if(!result)
                return false;

            let mailSendResult =  await MailService.send(loginData.email, '???????????? ???????????????.', '???????????? ??????????????? ' + newPwd + '?????????.');

            return mailSendResult;

        } catch (err) {
            return err;
        }
    }

    public static async updatePwd(loginId: string, newPwd: string) {

        try {


            let result = await MariaDB.query(QM.Update("t_node_login",{
                pwd: crypto.createHash('sha512').update(newPwd).digest('hex')
            }, {
                login_id: loginId
            }))

            return result;


        } catch (err) {
            return err;
        }
    }


    public static async updateUser(loginId: string, email: string, phoneNumber: string, address: string, addressDetail: string, zipCode: string) {

        try {

            let result = await MariaDB.query(QM.Update("t_node_user",{
                email: email,
                phone_number: phoneNumber,
                address: address,
                address_detail: addressDetail,
                zip_code: zipCode
            }, {
                login_id: loginId
            }))

            return result;


        } catch (err) {
            return err;
        }
    }


    public static async black(targetUserId: string, status: string) {

        try {

            let result = await MariaDB.query(QM.Update("t_node_user",{
                status: status,
            }, {
                user_id: targetUserId
            }))

            return result;


        } catch (err) {
            return err;
        }
    }

    public static async warn(targetUserId: string) {

        try {

            let result = await MariaDB.query(QM.Update("t_node_user",{
                warn: '\\warn + 1',
            }, {
                user_id: targetUserId
            }))

            let userData = await MariaDB.getOne(QM.Select("t_node_user",{
                user_id: targetUserId
            },["*"]));

            if(userData.warn === 5)
                return userData;

            return result;


        } catch (err) {
            return err;
        }
    }

}

