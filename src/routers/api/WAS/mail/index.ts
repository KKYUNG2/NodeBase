import express from "express";
import MailController from "../../../controller/WAS/MailController";

let router = express.Router();

router.post("/device",  MailController.send);


export default router;