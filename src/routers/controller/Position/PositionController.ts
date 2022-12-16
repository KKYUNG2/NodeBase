import {Request, Response} from "express";
import UtilController from '../UtilController';

import DataChecker from "../../../modules/DataChecker";
import PositionService from "../../services/position/PositionService";
import Logger from "../../../modules/Logger";

class PositionConroller extends UtilController {



    // 포지션 추가
    public add = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.loadJWTValue(req.body),
            DataChecker.loadJWTUserCheck(res, req.body),
            DataChecker.needArrCheck(res, req.body, ["positionName"]),
            DataChecker.numberArrCheck(res, req.body, ["fileSeq"], false)
        ) as {
            positionName: string,
            fileSeq: number
        };

        let result = await PositionService.add(data.positionName, data.fileSeq);

        if(result)
            return this.true(res, 'PIS0');
        else
            return this.false(res, 'PIF0');


    }


    // 포지션 수정
    public edit = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, ['positionSeq', 'positionName', 'fileSeq'])
        ) as {
            positionSeq: number,
            positionName: string,
            fileSeq: number
        };

        let positionUpdate = await PositionService.edit(data.positionSeq, data.positionName, data.fileSeq);

        if(positionUpdate)
            return this.true(res, 'PUS0');
        else
            return this.false(res, 'PUF0');

    }


    // 포지션 삭제
    public delete = async (req: Request, res: Response) => {
        let data = DataChecker.mergeObject(
            DataChecker.needArrCheck(res, req.body, ["positionSeq"])
        ) as {
            positionSeq: number
        };

        try {

            let positionDelete = await PositionService.delete(data.positionSeq);

            if(positionDelete)
                return this.true(res, 'PDF0');
            else
                return this.false(res, 'PDS0');

        } catch (err) {
            Logger.debug(err)
            return this.false(res, err);
        }



    }

    // 포지션 리스트 조회
    public list = async (req: Request, res: Response) => {

        try {

            let positionList = await PositionService.list();

            if(positionList)
                return positionList;
            else
                return null;

        } catch (err) {
            Logger.debug(err)
            return this.false(res, err);
        }


    }


}

export default new PositionConroller();