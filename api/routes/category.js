const router = require('express').Router()
const { CategoryService } = require("../../services/Category")

const categoryRoutes = (app) => {
    app.use('/category', router);


    //Create category
    /**
     * @Todo
     * Validate form data. Check if all value are valid
     */
    router.post('/create', async (req, res) => {
        try {
            //Create a new category
            const categoryInfo = req.body
            const categoryService = new CategoryService()
            const category = await categoryService.create(categoryInfo)

            if (category) {
                return res.status(200).json({ category, created: true })
            } else return res.status(200).json({ created: false })

        } catch (error) {
            return res.status(500).json({ created: false })
        }
    });

    //Get all category
    /**
     * @Todo
     */
    router.get('/', async (req, res) => {
        try {
            const categoryService = new CategoryService()
            const category = await categoryService.getAllCategory()
            return res.status(200).json({ category })
        } catch (error) {
            return res.status(500).json({ created: false })
        }
    });


};

module.exports = categoryRoutes