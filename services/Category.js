const { eventEmitter } = require("./Auth")
const config = require("./../config/index")

const eventsAtions = require('./../subscribers/events')
const UserSubscriber = require('./../subscribers/UserSubscriber')

const CategoryModel = require("./../models/Category");

class CategoryService {
    constructor() {
        this.eventEmitter = eventEmitter
        new UserSubscriber(this.eventEmitter).listen()
    }
    async create(categoryData) {

        try {
            const newCategory = new CategoryModel({ name: categoryData.name, })

            //Save to db
            const category = await newCategory.save()

            //Emit event

            return category

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async getPost(id) {
        try {
            return await CategoryModel.findById(id)
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async getAllCategory() {

        try {
            return await CategoryModel.find()
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}


module.exports = { CategoryService, eventEmitter }