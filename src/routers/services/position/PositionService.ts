import UtilController from "../../controller/UtilController";
import Config from "../../../../config"
import MariaDB from "../../../modules/MariaDB";
import QM from "../../../modules/QueryMaker";
import Logger from "../../../modules/Logger";

const moment = require('moment');


export default class PositionService {


    public static async add(positionName: string, fileSeq: Number) {

        try {

            let filePath = null;

            let fileData = await MariaDB.getOne(QM.Select("t_node_file",{
                file_seq: fileSeq
            },["*"]));

            if(fileData)
                filePath = fileData.file_path + fileData.file_name;

            let result = await MariaDB.get([

                QM.Update("t_node_position",{
                    sort: '\\sort + 1'
                },{
                    1: 1
                }),
                QM.Insert("t_node_position",{
                    position_name: positionName,
                    path: filePath,
                    sort: 1
                })
            ]);

            if(result)
                return result;
            else
                return null;

        } catch (err) {
            Logger.debug(err);
            return null;
        }
    }


    public static async edit(positionSeq: number, positionName: string, fileSeq: Number) {

        try {

            let filePath = null;

            let fileData = await MariaDB.getOne(QM.Select("t_node_file",{
                file_seq: fileSeq
            },["*"]));

            if(fileData)
                filePath = fileData.file_path + fileData.file_name;

            let result = await MariaDB.Execute(
                QM.Update("t_node_position",{
                    position_name: positionName,
                    path: filePath,
                },{
                    position_seq: positionSeq
                })
            );

            if(result)
                return result;
            else
                return null;

        } catch (err) {
            Logger.debug(err);
            return null;
        }
    }

    public static async list() {

        try {

            let positionList = await MariaDB.getAll(QM.Select("t_node_position",{1 : 1}, ["*"]));

            if(positionList)
                return positionList;
            else
                return null;

        } catch (err) {
            Logger.debug(err);
            return null;
        }
    }

    public static async delete(positionSeq: Number) {

        try {

            let positionDelete = await MariaDB.Execute(QM.Delete("t_node_position",{
                position_seq : positionSeq
            }));

            if(positionDelete)
                return true;
            else
                return null;

        } catch (err) {
            Logger.debug(err);
            return null;
        }
    }

}