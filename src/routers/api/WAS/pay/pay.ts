import express from "express";
import PayController from "../../../controller/Pay/PayController";

let router = express.Router();


// 결제 전 DB 저장
router.post("/ready", PayController.ready);
// 결제 취소
router.post("/cancel", PayController.cancel);


// 문자 결제하기
router.post("/sms", PayController.sms);
// 문자 결제 내역보기
router.post("/sms/result", PayController.smsResult);



export default router;