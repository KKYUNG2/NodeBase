import express from "express";
import PayController from "../../../controller/WAS/PayController";

let router = express.Router();

router.post("/sms", PayController.sms);
router.post("/sms/result", PayController.smsResult);


export default router;