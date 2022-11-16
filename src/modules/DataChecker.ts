/**
 * Created By 강영규 On 2022-11-13
 */
import UtilController from "../routers/controller/UtilController";

class DataChecker extends UtilController {

    public loadJWTValue(objData: any) {
        return {
            userId: objData.userId,
            sessionId: objData.sessionId,
            userType: objData.userType
        }
    }

    public needArrCheck(res: any, objData: any, needArr: string[]) {

        let retObj = {};
        let dataFailList = [];

        for (let item of needArr) {

            if (objData[item] === undefined || objData[item] === "") {
                dataFailList.push(item)
            }

            // @ts-ignore
            retObj[item] = objData[item];

        }

        if(dataFailList.length > 0){
            return this.dataCheck(res, dataFailList, ' Is Essential Data');
        }


        return retObj;
    }


    public mergeObject(...objList: any[]) {
        let obj = {};

        for (let item of objList) {
            if (typeof item === "string") {
                return item;
            }

            Object.assign(obj, item);
        }

        return obj;

    }
}

export default new DataChecker();