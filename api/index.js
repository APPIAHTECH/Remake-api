const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const categoryRoutes = require("./routes/category");

// guaranteed to get dependencies
const routes = () => {
    const app = require('express').Router()
    //...More routes ...
    userRoutes(app);
    postRoutes(app);
    categoryRoutes(app);

    return app
}

module.exports = routes