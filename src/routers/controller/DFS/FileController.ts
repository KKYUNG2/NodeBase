import {Request, Response} from "express";
import UtilController from '../UtilController';
import DataChecker from "../../../modules/DataChecker";
import Config from "../../../../config";
import PayController from "../WAS/PayController";
import Logger from "../../../modules/Logger";
import MariaDB from '../../../modules/MariaDB'
import QM from '../../../modules/QueryMaker'

const fs = require('fs');
const path = require('path');
const moment = require('moment')
const Date = moment().format('YYYYMMDD');
const multer = require('multer');
const gm = require('gm')
//const QM = require('../../../modules/QueryMaker')
const FileService = require('../../services/file/FileService')

const dir = Config.DEFAULT_TEMP_FILE_PATH + "/" + Date;


//todo 전체적인 DB 연동 필요함
class FileController extends UtilController {

    public imageUpload = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        try {

            let originFileSize = req.body.file.size / 1024 / 1024;

            if (originFileSize > Config.FILE_SIZE)
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


            let fileExtension = originFileName.slice(originFileName.lastIndexOf(".") + 1);

            let thumbName = req.body.file.originalFilename.slice(0, req.body.file.originalFilename.lastIndexOf(".")) + '_thumb' + thumbExtension;


            let result = await MariaDB.query(QM.Insert("t_node_file",{
                file_size: req.body.file.size,
                file_path: Config.DEFAULT_TEMP_FILE_PATH + "/" + Date + "/",
                file_name: req.body.file.originalFilename,
                thumb_path: Config.DEFAULT_TEMP_FILE_PATH + "/" + Date + "/",
                thumb_name: thumbName,
                file_type: fileExtension
            }))

            if(result)
                return this.true(res, 'FS1');
            else
                return this.false(res, 'FF1');

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
        Logger.info("Call API - " + req.originalUrl);

        try {

            let fileSeq: any = req.query.fileSeq;

            let fileData = await MariaDB.getOne(QM.Select("t_node_file",{
                file_seq: fileSeq
            },["*"]));

            if(!fileData)
                return this.false(res, 'Incorrect FileData')

            res.download(fileData.file_path + fileData.file_name, fileData.file_name);


        } catch (err) {
            return this.err(res, 'DF1', err)
        }

    }

    public fileDelete = async (req: Request, res: Response) => {
        Logger.info("Call API - " + req.originalUrl);

        try {

            let data = DataChecker.mergeObject(
                DataChecker.loadJWTUserCheck(res, req.body),
                DataChecker.needArrCheck(res, req.body, ["fileSeq"])
            ) as {
                fileSeq: number
            };

            let fileData = await MariaDB.getOne(QM.Select("t_node_file",{
                file_seq: data.fileSeq
            },["*"]));

            if(!fileData)
                return this.message(res, 'Check Your FilePath')


            if (fileData.file_type === 'jpeg' ||
                fileData.file_type === 'jpg' ||
                fileData.file_type == 'png') {

                // 썸네일 삭제하기
                fs.unlinkSync(fileData.thumb_path + fileData.thumb_name);
            }


            if(fs.existsSync(fileData.file_path + fileData.file_name)){

                // 원본 파일 삭제하기
                fs.unlinkSync(fileData.file_path + fileData.file_name);

                let result = await MariaDB.query(QM.Delete("t_node_file",{
                    file_seq: data.fileSeq
                }))

                if(result)
                    return this.true(res, 'FDS0')
                else
                    return this.false(res, 'FDF0')

            }

            return this.false(res, 'File is Not Exists')

        } catch (err) {
            return this.err(res, 'DF1', err)
        }

    }

}

export default new FileController();