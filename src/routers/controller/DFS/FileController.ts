import {Request, Response} from "express";
import UtilController from '../UtilController';
import DataChecker from "../../../modules/DataChecker";
import Config from "../../../../config";
import PayController from "../WAS/PayController";

const fs = require('fs');
const path = require('path');
const moment = require('moment')
const Date = moment().format('YYYYMMDD');
const multer = require('multer');
const gm = require('gm')



class FileController extends UtilController {

    public imageUpload = async (req: Request, res: Response) => {

        try {

            console.log(req.body.file.size);

            // 파일 사이즈 제한 필요함

            let fileData = req.body.file.originalFilename;
            fileData = fileData.slice(fileData.lastIndexOf(".") + 1)

            if(fileData !== 'jpeg' &&
                fileData !== 'jpg' &&
                fileData !== 'png'){
                return this.message(res, '권장 파일이 아닙니다.');
            }


            let dir = Config.DEFAULT_TEMP_FILE_PATH + "/" + Date;

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            // 파일 업로드
            if (!fs.existsSync(Config.DEFAULT_TEMP_FILE_PATH + "/" + Date + "/" + req.body.file.originalFilename)) {
                fs.renameSync(req.body.file.path, dir + "/" + req.body.file.originalFilename);
            }

            // 썸네일 만들기
            const originFileName = Config.DEFAULT_TEMP_FILE_PATH + "/" + Date + "/" + req.body.file.originalFilename;

            let thumbImage = originFileName.slice(0, originFileName.lastIndexOf("."));
            let thumbExtension = '.' + originFileName.slice(originFileName.lastIndexOf(".") + 1);

            gm(Config.DEFAULT_TEMP_FILE_PATH + "/" + Date + "/" + req.body.file.originalFilename)
                .resize(300, 300)
                .write(thumbImage + '_thumb' + thumbExtension, (err: string) => {
                    if (err){
                        fs.unlinkSync(originFileName)
                        return this.message(res, 'Thumb Image Make Fail')
                    }
                    else
                        console.log('Thumb Image Make');
                });

            return this.true(res, 'F01');

        } catch (err) {
            return this.err(res, 'UF2', err)
        }


    }


    public download = async (req: Request, res: Response) => {

        try {

            // DB 연동 필요

            let filePath: any = req.query.filePath;

            res.download(filePath, 'downlaod')


        } catch (err) {
            return this.err(res, 'DF1', err)
        }


    }

}

export default new FileController();