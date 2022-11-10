import express from 'express';
import Config from "../config";
import session from 'express-session';
import formData from 'express-form-data';
import ejs from 'ejs';
import cors from 'cors';
import morgan from 'morgan';
import router from "../src/routers";

const app = express();
const cookieParser = require('cookie-parser');


import {AddressInfo} from "net";

export default async () => {

    app.use(cors());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use(cookieParser());

    app.get('', (req, res) => res.status(200).end());
    app.head('', (req, res) => res.status(200).end());

    app.enable('trust proxy');

    // 리퀘스트 처리 모듈 추가.
    app.use(formData.parse({
        uploadDir: Config.DEFAULT_TEMP_FILE_PATH,
        autoClean: true,
        maxFilesSize: 1024 * 1024 * 1024,
    }));
    app.use(formData.union());

    app.use(session({
        secret: "HYF*#HFH*IOH(&hf379h3f3",
        resave: false,
        saveUninitialized: true
    }));


    // web
    // public 경로 추가
    app.use(express.static(process.env.ROOT_PATH + "/public"));

    // 웹 엔진 로드
    app.set('views', process.env.ROOT_PATH + (Config.OS_TYPE === "win32" ? "\\" : "/") + 'views');
    app.set('view engine', 'ejs');
    app.engine('html', ejs.renderFile);

    app.use(morgan("combined", {stream: {write: (msg) => console.log(msg)}}));

    app.disable("x-powered-by");

    app.use('/', router);

    app.use(express.static('views'));

    //app.use(ErrorHandler);

    app.use((req, res) => {
        res.sendStatus(404);
    });


    const server = app.listen(Config.PORT, () => {
        const {address, port} = server.address() as AddressInfo;
        console.log('Server listening on : ' + 'http://127.0.0.1:' + port);
    });


    return;

};


