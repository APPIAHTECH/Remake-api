const router = require('express').Router()
const { upload } = require("./../middlewares/index")
const { AuthService } = require("../../services/Auth")
const { UserService } = require("../../services/User")

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
            //Something wen't wrong login the user 
            return res.status(500).json({ login: false })
        }
    });


    //Update user
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     * This way of auth is not the most secure, remember to todo JWT version!
     */
    router.put('/:id', async (req, res) => {
        try {
            //Update user
            const userParamID = req.params.id
            const user = req.body

            if (userParamID === user.userID) {
                const userService = new UserService()
                const updatedUser = await userService.update(user)

                if (updatedUser) return res.status(200).json({ updated: true })

            }

            return res.status(200).json({ updated: false })

        } catch (error) {
            //Something wen't wrong updating the user 
            return res.status(500).json({ updated: false })
        }
    });

    //Delete user
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     * This way of auth is not the most secure, remember to todo JWT version!
     */
    router.delete('/:id', async (req, res) => {
        try {
            //Delelte user
            const userParamID = req.params.id
            const user = req.body

            if (userParamID === user.userID) {
                const userService = new UserService()
                const deletedUser = await userService.delete(user)
                if (deletedUser) return res.status(200).json({ deleted: true })

            }

            return res.status(200).json({ deleted: false })

        } catch (error) {
            //Something wen't wrong deleting the user 
            return res.status(500).json({ deleted: false })
        }
    });

    //Get user
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     * This way of auth is not the most secure, remember to todo JWT version!
     */
    router.get('/:id', async (req, res) => {
        try {
            //Get one user
            const userID = req.params.id

            if (userID) {
                const userService = new UserService()
                const user = await userService.getUser(userID)
                return res.status(200).json({ user, foundUser: true })

            }

            return res.status(200).json({ foundUser: false })

        } catch (error) {
            //Something wen't wrong deleting the user 
            return res.status(500).json({ foundUser: false })
        }
    });



    //Upload images
    /**
     * @Todo
     * Store images using AWS | Firebase or any CDN
     */
    router.post('/upload', upload.single('photos'), async (req, res) => {
        try {
            const file = req.file
            if (!file) return res.status(200).json({ uploaded: false })
            return res.status(200).json({ uploaded: true })

        } catch (error) {
            //Something wen't wrong deleting the user 
            return res.status(500).json({ uploaded: false })
        }

    });


};

module.exports = userRoutes