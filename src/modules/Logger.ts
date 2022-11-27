/**
 * LOG LEVEL
error: 0 , warn: 1 , info: 2 , http: 3 , verbose: 4 , debug: 5 , silly: 6
*/


import Winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

import Config from '../../config';

class Logger {


    constructor() {

        const format = Winston.format.combine(
            Winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
            Winston.format.printf(
                (info) => `${info.timestamp} ${info.level} : ${info.message}`,
            ),
        )

        this.option = {
            format,
            level: Config.LOG.LEVEL,
            transports: [
                new WinstonDaily({
                    level: Config.LOG.LEVEL,
                    datePattern: 'YYYYMMDD',
                    dirname: Config.LOG.LOG_PATH,
                    filename: Config.SERVER_TYPE + "_%DATE%.log",
                    maxSize: Config.LOG.FILE_SIZE,
                    maxFiles: Config.LOG.FILE_CNT,
                }),

                new Winston.transports.Console({
                    handleExceptions: true,
                })
            ]
        };

        this.logger = Winston.createLogger(this.option);
    }

    private option: Winston.LoggerOptions;
    public logger: Winston.Logger;


}

let logger = new Logger();
export default logger.logger;