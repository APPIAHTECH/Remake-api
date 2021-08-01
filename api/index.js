const userRoutes = require("./routes/user");

// guaranteed to get dependencies
const routes = () => {
    const app = require('express').Router()
    //...More routes ...
    userRoutes(app);

    return app
}

module.exports = routes