
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

    SMTP: {
        user_email: string;
        user_passwd: string;
    }


    DB: {
        host: string;
        port: string;
        user: string;
        password: string;
        database: string;
        connectionLimit: string;
    }

    SMS: {
        URL: string;
    }

    constructor() {

        // Global
        this.PORT = parseInt(process.env.PORT, 10);
        this.SERVER_TYPE = process.env.SERVER_TYPE
        this.DEFAULT_TEMP_FILE_PATH = process.env.DEFAULT_TEMP_FILE_PATH

        this.JWT = {
            SECRET: process.env.JWT_SECRET,
            EXPIRES_IN: process.env.JWT_EXPIRES_IN
        };

        this.SMTP = {
            user_email: process.env.USER_EMAIL,
            user_passwd: process.env.USER_PASSWD
        };

        this.DB = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            connectionLimit: process.env.connectionLimit
        }

        this.SMS = {
            URL: process.env.SMS_URL
        }

    }
}

export default new Config();