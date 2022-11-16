import UtilController from "../../controller/UtilController";
import Config from "../../../../config"

const Axios = require('axios');
const moment = require('moment');



export default class PayService extends UtilController {

    public static async sms(res: any, ordNm: string, ordHpNo: string, mid: string,
        usrId: string, sid: string, payload: string) {

        try {

            let result = await Axios.post('Pay_URL', {
                header: {
                    sid: sid, // 전문 ID, 업무별 정의된 ID 입력
                    trDtm: moment().format('YYYYMMDDHHMMss'), // API 전송 일시 (YYYYmmddHHMMSS)
                    gubun: 'S' // 전문 구분 (요청 : 'S', 응답 : 'R')
                },
                body: {
                    usrId: usrId, // 상점 로그인 ID
                    encKey: 's', // 암호화 Key
                    mid: mid, // 가맹점 ID
                    goodsNm: 'test', // 상품명
                    goodsAmt: 100, // 상품 가격
                    moid: '1', // 상품 주문번호
                    ordNm: ordNm, // 구매자명
                    ordHpNo: ordHpNo, // 구매자 휴대폰 번호, "-" 기호 없이 입력
                    type: 0  // (0 : 기본, 1 : 추가)
                }
            }, {
                headers: {
                    'Content-type': 'application/json', 'charset': 'utf-8'
                }
            });

            return result;

        } catch (err) {
            return null;
        }
    }
}