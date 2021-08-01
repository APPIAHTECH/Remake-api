/** 
 * App entry point
 * Author   Stephen Appiah
 * email    stephenappiahtech@gmail.com
 */

const loaders = require('./loaders/index');
const express = require('express');
const { port } = require("./config/index")

async function startServer() {

    const app = express();

    await loaders.init(app);

    app.listen(port, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server listen at ${port}`);
    });
}

/**Simple trick to prevent your node.js server from crashing on production */
process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
});

process.on('uncaughtException', (error) => {
    console.log('Oh my god, something terrible happened: ', error);
    process.exit(1); // exit application 

})

startServer();
