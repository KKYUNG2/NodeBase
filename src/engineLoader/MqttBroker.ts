import Config from "../../config"

const aedes = require('aedes')();
const mqttBroker = require('net').createServer(aedes.handle);
const mqttPort = Config.PORT;

export default async () => {

    mqttBroker.listen(mqttPort, () => {
        console.log("MQTT broker listening", mqttPort);
    });

}
