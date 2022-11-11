import loaders from './engineLoader';

if(!(process.argv[2])) {
    console.log("Set Your Process Environment");
    process.exit(0);
}

(async function () {

    await loaders();

})();