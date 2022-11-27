import {Request, Response} from "express";
import UtilController from '../UtilController';
import DataChecker from "../../../modules/DataChecker";
import Config from "../../../../config";
import PayController from "../WAS/PayController";
import Logger from "../../../modules/Logger";

const fs = require('fs');
const path = require('path');
const moment = require('moment')
const Date = moment().format('YYYYMMDD');
const multer = require('multer');
const gm = require('gm')

const dir = Config.DEFAULT_TEMP_FILE_PATH + "/" + Date;


//todo 전체적인 DB 연동 필요함
class FileController extends UtilController {

    public imageUpload = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        try {

            if (req.body.file.size > Config.FILE_SIZE)
                return this.message(res, 'File size over!! Check your file Size')



            let fileData = req.body.file.originalFilename.slice(req.body.file.originalFilename.lastIndexOf(".") + 1);

            if (fileData !== 'jpeg' &&
                fileData !== 'jpg' &&
                fileData !== 'png') {
                return this.message(res, '권장 파일이 아닙니다.');
            }


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
                    if (err) {
                        fs.unlinkSync(originFileName)
                        return this.message(res, 'Thumb Image Make Fail')
                    } else
                        console.log('Thumb Image Make');
                });

            return this.true(res, 'F01');

        } catch (err) {
            return this.err(res, 'UF2', err)
        }

    }

    public fileUpload = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        try {

            if (req.body.file.size > Config.FILE_SIZE)
                return this.message(res, 'File size over!! Check your file Size')


            let fileData = req.body.file.originalFilename.slice(req.body.file.originalFilename.lastIndexOf(".") + 1);

            if (fileData === 'exe')
                return this.message(res, '권장 파일이 아닙니다.');


            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            // 파일 업로드
            if (!fs.existsSync(Config.DEFAULT_TEMP_FILE_PATH + "/" + Date + "/" + req.body.file.originalFilename)) {
                fs.renameSync(req.body.file.path, dir + "/" + req.body.file.originalFilename);
            }

            return this.true(res, 'F01');

        } catch (err) {
            return this.err(res, 'UF2', err)
        }

    }

    public sizeCheck = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        try {

            // DB 연동 필요
            let filePath: any = req.body.file;

            if(!filePath)
                return this.message(res, 'Check Your File')

            return this.true(res, 'SZ0', {size: req.body.file.size});

        } catch (err) {
            return this.err(res, 'DF1', err)
        }

    }

    public download = async (req: Request, res: Response) => {

        try {

            // DB 연동 필요
            let filePath: any = req.query.filePath;

            if(!filePath)
                return this.message(res, 'Check Your FilePath')

            res.download(filePath, 'downlaod')


        } catch (err) {
            return this.err(res, 'DF1', err)
        }

    }

    public fileDelete = async (req: Request, res: Response) => {

        try {

            // DB 연동 필요
            let filePath: any = req.query.filePath;

            if(!filePath)
                return this.message(res, 'Check Your FilePath')

            res.download(filePath, 'downlaod')


        } catch (err) {
            return this.err(res, 'DF1', err)
        }

    }

}

export default new FileController();