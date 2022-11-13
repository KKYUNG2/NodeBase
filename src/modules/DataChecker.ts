/**
 * Created by 유희찬 on 2020-08-05.
 */

class DataChecker {

    public loadJWTValue(objData: any) {
        return {
            userId: objData.userId,
            sessionId: objData.sessionId,
            userType: objData.userType
        }
    }

    public needCheck(objData: any, targetList: string[], notAllowValue: any[]) {

        let retObj = {};

        for (let item of targetList) {

            if (objData[item] === undefined || objData[item] === "") {
                return item;

            }

            for (let denyValue of notAllowValue) {
                if (denyValue == objData[item]) {
                    return item;

                }
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