/**
 * Created by 유희찬 on 2020-06-29.
 */

import Config from "../config";

import ExpressLoader from './Express';


export default async () => {

    if (["WAS"].indexOf(Config.SERVER_TYPE) >= 0) {
        await ExpressLoader();
        console.log("Express Initialized");
    }


}