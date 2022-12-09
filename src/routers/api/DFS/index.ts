import express from "express";
import FileController from "../../controller/File/FileController";
import {jwtAuthCheck} from "../../../middlewares/JwtAuth";

let router = express.Router();

// 이미지 업로드
router.post("/img/upload",[jwtAuthCheck], FileController.imageUpload);
// 파일 업로드
router.post("/file/upload",[jwtAuthCheck], FileController.fileUpload);

// 파일 다운로드
router.get("/download", [jwtAuthCheck], FileController.download);

// 파일 삭제하기
router.post("/file/delete",[jwtAuthCheck], FileController.fileDelete);

// 파일 사이즈 확인하기
router.post("/size", [jwtAuthCheck], FileController.sizeCheck);

export default router;