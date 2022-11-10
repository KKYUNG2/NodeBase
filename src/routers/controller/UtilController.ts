/**
 * Created by 유희찬 on 2020-08-06.
 */

import express from "express";


function BasicResponse(result: boolean, code: string) {
    return {
        result: result,
        code: code,
    }
}

export default class UtilController {

    public static jsonResponse(res: express.Response, statusCode: number, result: boolean, resultCode: string = "000") {
        return res.status(statusCode).json(BasicResponse(result, resultCode));
    }

    // T는 Type의 약자로 다른 언어에서도 제네릭을 선언할 때 관용적으로 많이 사용된다. 이 부분에는 식별자로 사용할 수 있는 것이라면 무엇이든 들어갈 수 있다.
    public ok<T>(res: express.Response, code: string, dto?: T) {
        // if (!!dto) {

        if (!dto) { // @ts-ignore
            dto = {};
        }

        // @ts-ignore
        dto.result = true;
        // @ts-ignore
        dto.code = code;

        res.type('application/json');
        return res.status(200).json(dto);

        // } else {
        //     res.status(500).json(BasicResponse(false, "DEV"));
        //
        // }
    }

    public okFalse<T>(res: express.Response, code: string) {

        let dto = {
            result: false,
            code: code
        };

        res.type('application/json');
        return res.status(200).json(dto);
    }

    public clientError(res: express.Response, message?: string) {
        return UtilController.jsonResponse(res, 400, false, message);
    }

    public unauthorized(res: express.Response, message?: string) {
        return UtilController.jsonResponse(res, 401, false, message);
    }

    public forbidden(res: express.Response, message?: string) {
        return UtilController.jsonResponse(res, 403, false, message);
    }

    public notFound(res: express.Response, message?: string) {
        return UtilController.jsonResponse(res, 404, false, message);
    }

    public conflict(res: express.Response, message?: string) {
        return UtilController.jsonResponse(res, 409, false, message);
    }

    public tooMany(res: express.Response, message?: string) {
        return UtilController.jsonResponse(res, 429, false, message);
    }

    public todo(res: express.Response) {
        return UtilController.jsonResponse(res, 400, false, 'TODO');
    }

    public fail(res: express.Response, error: Error | string) {

        return res.status(500).json(BasicResponse(false, "999"));
    }
}