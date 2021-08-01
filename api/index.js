const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// guaranteed to get dependencies
const routes = () => {
    const app = require('express').Router()
    //...More routes ...
    userRoutes(app);
    postRoutes(app);

    return app
}

module.exports = routes