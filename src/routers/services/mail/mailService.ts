import UtilController from "../../controller/UtilController";
import Config from "../../../../config"

const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'Naver',   // 메일 보내는 곳
    port: 587,
    host: 'smtp.naver.com',
    secure: false,
    requireTLS: true ,
    auth: {
        user: Config.SMTP.user_email,  // 보내는 메일의 주소
        pass: Config.SMTP.user_passwd   // 보내는 메일의 비밀번호
    }
})


export default class MailService extends UtilController {


    public static async send(res: any, targetMail: string) {
        try {

            // 메일 옵션
            let mailOptions = {
                from: Config.SMTP.user_email, // 보내는 메일의 주소
                to: targetMail, // 수신할 이메일
                subject: 'test', // 메일 제목
                text: 'test' // 메일 내용
            };


            // 메일 발송 해야됨 11월 14일
            // 메일 발송
            let result = await transporter.sendMail(mailOptions, function(err: string) {
                console.log(err);
            });

            return result;

        } catch (err) {
            return null;
        }
    }
}