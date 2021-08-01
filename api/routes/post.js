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

                if (post) return res.status(200).json({ post, postFound: true })
            }
            return res.status(200).json({ postFound: false })

        } catch (error) {
            return res.status(500).json({ postFound: false })
        }
    });


    //Update post
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     * 
     */
    router.put('/:id', async (req, res) => {
        try {
            const postID = req.params.id
            const postInfo = req.body
            const postService = new PostService()

            const post = await postService.getPost(postID)
            if (post && (post.username === postInfo.username)) {
                const updatedPost = await postService.update({ postID, postInfo })
                if (updatedPost) return res.status(200).json({ updated: true })
            }
            return res.status(200).json({ updated: false })
        } catch (error) {
            return res.status(500).json({ updated: false })
        }
    });


    //Delete post
    router.delete('/:id', async (req, res) => {
        try {
            const postID = req.params.id
            const postInfo = req.body
            const postService = new PostService()
            const post = await postService.getPost(postID)

            if (post && (post.username === postInfo.username)) {
                const postDeleted = await postService.delete(postID)
                if (postDeleted) return res.status(200).json({ deleted: true })
            }
            return res.status(200).json({ deleted: false })
        } catch (error) {
            return res.status(500).json({ deleted: false })
        }
    });


    //Get all post
    router.get('/', async (req, res) => {
        try {
            const username = req.query.user
            const category = req.query.categoryName
            const postService = new PostService()
            const post = await postService.getAllPost(username, category)
            if (post) return res.status(200).json({ post, foundPost: true })
            return res.status(200).json({ foundPost: false })
        } catch (error) {
            return res.status(500).json({ foundPost: false })
        }
    });
};

module.exports = postRoutes