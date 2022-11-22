import express from "express";
import MailController from "../../../routers/controller/DFS/FileController";
import {jwtAuthCheck} from "../../../middlewares/JwtAuth";

let router = express.Router();

// 이미지 업로드
router.post("/img/upload",[jwtAuthCheck], MailController.imageUpload);

// 파일 다운로드
router.get("/download", [jwtAuthCheck], MailController.download);
export default router;