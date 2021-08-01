const router = require('express').Router()
const middlewares = require("./../middlewares/index")
const { PostService } = require("../../services/Post")

const postRoutes = (app) => {
    app.use('/post', router);


    //Create post
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     */
    router.post('/create', async (req, res) => {
        try {
            //Create a new post
            const postInfo = req.body
            const postService = new PostService()
            const post = await postService.create(postInfo)

            if (post) {
                //We can create the user 
                return res.status(200).json({ post, created: true })
            } else return res.status(200).json({ created: false })

        } catch (error) {
            //Something wen't wrong creating the user 
            return res.status(500).json({ created: false })
        }
    });




};

module.exports = postRoutes