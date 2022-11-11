import express from "express";
import MailController from "../../../controller/WAS/MailController";

let router = express.Router();

router.post("/send", MailController.send);


export default router;