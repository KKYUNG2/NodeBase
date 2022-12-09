import express from "express";
import PayController from "../../../controller/Pay/PayController"

let router = express.Router();


// 결제 내역보기
router.post("/ready", PayController.ready);
// 결제 취소
router.post("/cancel", PayController.cancel);



export default router;