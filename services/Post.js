const { eventEmitter } = require("./Auth")
const config = require("./../config/index")

const eventsAtions = require('./../subscribers/events')
const UserSubscriber = require('./../subscribers/UserSubscriber')

const UserModel = require("./../models/User");
const PostModel = require("./../models/Post");

class PostService {
    constructor() {
        this.eventEmitter = eventEmitter
        //User subscrbe to the UserService events
        new UserSubscriber(this.eventEmitter).listen()
    }
    async create(postData) {

        try {

            //Create user post
            const newPost = new PostModel({
                title: postData.title,
                description: postData.description,
                username: postData.username
            })

            //Save to db
            const post = await newPost.save()

            //Emit event

            return post

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async getPost(id) {
        try {
            //Find post
            return await PostModel.findById(id)
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async update({ postInfo, postID }) {

        try {
            //update user in db
            const updatedPost = await PostModel.findByIdAndUpdate(postID, {
                $set: postInfo
            }, { new: true, useFindAndModify: false }) //new, send updated verson, useFindAndModify , removes warnings

            //Emit event
            return updatedPost

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async delete(postID) {

        try {
            //delete user in db
            return await PostModel.findByIdAndDelete(postID)
            //Emit event

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async getAllPost(username, category) {

        try {
            //find post by user
            let posts;
            if (username) posts = await PostModel.find({ username })
            else if (category) posts = await PostModel.find({ categories: { $in: [category] } })
            else posts = await PostModel.find()

            //Emit event
            return posts
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}


module.exports = { PostService, eventEmitter }