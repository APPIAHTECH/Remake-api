const middlewares = require("./../middlewares/index")
const router  = require('express').Router()

const userRoutes = (app) => {
    app.use('/users', router);
    router.get('/me',(req, res) => {
        return res.json({ user: "goku" }).status(200);
    });

};

module.exports = userRoutes