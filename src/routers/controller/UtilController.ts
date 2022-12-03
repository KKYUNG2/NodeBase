/**
 * Created by 유희찬 on 2020-08-06.
 */

import express from "express";
import Logger from "../../modules/Logger";


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
    public true<T>(res: express.Response, code: string, dto?: T) {

        if (!dto) { // @ts-ignore
            dto = {};
        }

        // @ts-ignore
        dto.result = true;
        // @ts-ignore
        dto.code = code;

        res.type('application/json');

        return res.status(200).json(dto);

    }

    public false<T>(res: express.Response, code: string) {

        let dto = {
            result: false,
            code: code
        };


        res.type('application/json');
        return res.status(200).json(dto);

    }

    public message<T>(res: express.Response, message: string) {

        let dto = {
            result: false,
            message: message
        };


        res.type('application/json');
        return res.status(200).json(dto);

    }

    public dataCheck<T>(res: express.Response, data: any, msg: string) {

        let dto = {
            result: false,
            msg: data + msg
        };


        res.type('application/json');
        return res.status(200).json(dto);

    }


    public err<T>(res: express.Response, code: string, err: string) {

        let dto = {
            result: false,
            code: code,
            msg: 'Error Occurred By ' + err
        };

        res.type('application/json');
        return res.status(200).json(dto);

    }

    public UtilFalse<T>(message: string) {

        let dto = {
            result: false,
            message: message
        };

        return dto;

    }


}