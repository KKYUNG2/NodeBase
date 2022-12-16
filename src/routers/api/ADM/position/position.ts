import express from "express";
import PositionController from "../../../controller/Position/PositionController"

let router = express.Router();


// 포지션 추가
router.post("/add", PositionController.add);
// 포지션 수정
router.post("/edit", PositionController.edit);
// 포지션 삭제
router.post("/delete", PositionController.delete);
// 포지션 리스트
router.post("/list", PositionController.list);


export default router;