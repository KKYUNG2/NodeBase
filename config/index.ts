
import dotenv from "dotenv";
import path from "path";
import os from "os";

process.env.ROOT_PATH = path.join(__dirname, "..");

let envFound = dotenv.config({path: __dirname + "/.env." + process.argv[2].toLowerCase()});

if (envFound.error) {
    // 설정 로드 못함. 실행 실패

    throw new Error("Couldn't find .env file");
}

export enum ServerEnum {
    WAS = "WAS",
}

class Config {

    // Global
    PORT: number;
    SERVER_TYPE: string;
    RESPONSE_ERROR_PARAMETER: boolean;
    DEFAULT_TEMP_FILE_PATH: string;
    OS_TYPE: string;

    //JWT
    JWT: {
        SECRET: string,
        EXPIRES_IN: string
    };

    constructor() {

        // Global
        this.PORT = parseInt(process.env.PORT, 10);
        this.SERVER_TYPE = process.env.SERVER_TYPE
        this.DEFAULT_TEMP_FILE_PATH = process.env.DEFAULT_TEMP_FILE_PATH

        this.JWT = {
            SECRET: process.env.JWT_SECRET,
            EXPIRES_IN: process.env.JWT_EXPIRES_IN
        };



    }
}

export default new Config();