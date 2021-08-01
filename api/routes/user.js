const router = require('express').Router()
const middlewares = require("./../middlewares/index")
const { AuthService } = require("../../services/Auth")

const userRoutes = (app) => {
    app.use('/users', router);

    //Register user
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     */
    router.post('/register', async (req, res) => {
        try {
            //SigUp the new user
            const userInfo = req.body
            const authService = new AuthService()
            const user = await authService.singUp(userInfo)

            //We can create the user 
            return res.status(200).json({ user, registed: true })

        } catch (error) {
            //Something wen't wrong creating the user 
            return res.status(500).json({ registed: false })
        }
    });


    //Login user
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     */
    router.post('/login', async (req, res) => {
        try {
            //Login user
            const userInfo = req.body
            const authService = new AuthService()
            const { match, user } = await authService.singIn(userInfo)

            if (match) return res.status(200).json({ user, login: true })
            else return res.status(200).json({ login: false })

        } catch (error) {
            //Something wen't wrong creating the user 
            return res.status(500).json({ login: false })
        }
    });


};

module.exports = userRoutes