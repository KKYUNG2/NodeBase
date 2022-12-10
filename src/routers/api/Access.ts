
import {Router, Request, Response} from "express";
import AccessController from "../controller/AccessController";
import {jwtAuthCheck} from "../../middlewares/JwtAuth";

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true }); // 쿠키에 csrf Secret을 저장. 만일 세션에 저장하고 싶다면 { cookie: false }로

let router = Router();


// 유저 회원가입
router.post("/join", AccessController.Join)
// 유저정보 변경
router.post("/update", AccessController.updateUser)

// 유저 로그인
router.post("/user", AccessController.access)
// 유저 비밀번호 찾기
router.post("/resetPw", AccessController.resetPw)
// 유저 비밀번호 변경
router.post("/updatePw", AccessController.updatePw)

// 관리자 로그인
router.post("/admin", [jwtAuthCheck], AccessController.adminAccess)
//todo 유저 블랙리스트 추가
router.post("/black", [jwtAuthCheck], AccessController.userBlack)
//todo 유저 경고하기
router.post("/warn", [jwtAuthCheck], AccessController.warn)







export default router;
