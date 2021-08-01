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

  
}


module.exports = { PostService, eventEmitter }