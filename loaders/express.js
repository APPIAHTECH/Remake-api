const cors = require("cors")
const bodyParser =  require("body-parser");
const routes = require("./../api/index")
const config = require("./../config/index")

const expressInit = async (app) => {

    // ...More middlewares

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.urlencoded({extended: true}))

    // Load API routes /api
    app.use(config.api.prefix, routes());

    /// catch 404 and forward to error handler
    /*app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });*/

}

module.exports = expressInit