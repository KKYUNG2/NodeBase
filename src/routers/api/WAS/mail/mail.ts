import express from "express";
import MailController from "../../../controller/Mail/MailController";

let router = express.Router();

// 메일 발송하기
router.post("/send", MailController.send);


export default router;