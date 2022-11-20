/**
 * Created By 강영규 On 2022-11-13
 */
import UtilController from "../routers/controller/UtilController";

class DataChecker extends UtilController {


    // 토큰 꺼내기
    public loadJWTValue(objData: any) {
        return {
            userId: objData.userId
        }
    }

    // 필수 값 꺼내기
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


    public numberArrCheck(res: any, objData: any, numberArr: string[], isRequire: boolean) {

        let retObj = {};

        for (let item of numberArr) {

            if ((item == '' || item == undefined) && isRequire === true) {
                return this.dataCheck(res, item, '  Is Essential Data')
            }

            // @ts-ignore
            retObj[item] = parseInt(objData[item]);

        }

        return retObj;
    }

    public stringArrCheck(res: any, objData: any, numberArr: string[], isRequire: boolean) {

        let retObj = {};

        for (let item of numberArr) {

            if ((item == '' || item == undefined) && isRequire === true) {
                return this.dataCheck(res, item, '  Is Essential Data')
            }

            // @ts-ignore
            retObj[item] = objData[item];

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