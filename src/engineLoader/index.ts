/**
 * Created by 유희찬 on 2020-06-29.
 */

import Config from "../../config";

import ExpressLoader from './Express';
import ExpressADMLoader from './ExpressADM';
import MariaDBLoader from '../engineLoader/MariaDB'
import MQTTLoader from '../engineLoader/MqttBroker'
import Logger from '../modules/Logger'

export default async () => {

    if (["WAS", "DFS"].indexOf(Config.SERVER_TYPE) >= 0) {
        await ExpressLoader();
        Logger.info("Express Initialized");
    }

    if (["ADM"].indexOf(Config.SERVER_TYPE) >= 0) {
        await ExpressADMLoader();
        Logger.info("Express ADM Initialized");
    }

    if (["WAS", "DFS", "ADM"].indexOf(Config.SERVER_TYPE) >= 0) {
        await MariaDBLoader();
        Logger.info("MariaDB Initialized");
    }

    if (["MQTT"].indexOf(Config.SERVER_TYPE) >= 0) {
        await MQTTLoader();
        Logger.info("MQTT Initialized");
    }


}