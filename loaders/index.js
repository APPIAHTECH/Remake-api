const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

const init = async (expressApp) => {
    const mongoConnection = await mongooseLoader();
    console.log('MongoDB Initialized');
    const app = await expressLoader(expressApp);
    console.log('Express Initialized');

    // ... more loaders can be here

    // ... Initialize agenda
    // ... or Redis, or whatever you want
}

module.exports = { init }