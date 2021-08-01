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
            return res.status(500).json({ created: false })
        }
    });

    //Read post
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     * 
     */
    router.get('/:id', async (req, res) => {
        try {
            const postID = req.params.id

            if (postID) {
                const postService = new PostService()
                const post = await postService.getPost(postID)
                return res.status(200).json({ post, postFound: true })
            }
            return res.status(200).json({ postFound: false })

        } catch (error) {
            return res.status(500).json({ postFound: false })
        }
    });


};

module.exports = postRoutes