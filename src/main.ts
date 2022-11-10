import loaders from '../engineLoader';

if(!(process.argv[2])) {
    console.log("Server cannot be started. Please check parameter.");
    process.exit(0);
}

(async function () {

    await loaders();

})();