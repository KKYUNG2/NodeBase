
import {Router, Request, Response} from "express";

import AccessController from "../controller/AccessController";

let router = Router();

// 유저 회원가입
router.post("/join", AccessController.Join)

// 유저 로그인
router.post("/user", AccessController.access)

// 관리자 로그인
router.post("/admin", AccessController.adminAccess)

export default router;
