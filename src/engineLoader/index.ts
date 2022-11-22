/**
 * Created by 유희찬 on 2020-06-29.
 */

import Config from "../../config";

import ExpressLoader from './Express';
import MariaDBLoader from '../engineLoader/MariaDB'


export default async () => {

    if (["WAS", "DFS"].indexOf(Config.SERVER_TYPE) >= 0) {
        await ExpressLoader();
        console.log("Express Initialized");
    }

    if (["WAS", "DFS"].indexOf(Config.SERVER_TYPE) >= 0) {
        await MariaDBLoader();
        console.log("MariaDB Initialized");
    }


}