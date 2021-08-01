const { eventEmitter } = require("./Auth")
const { encrypt } = require("./Utils")
const config = require("./../config/index")

const eventsAtions = require('./../subscribers/events')
const UserSubscriber = require('./../subscribers/UserSubscriber')

const UserModel = require("./../models/User");
const PostModel = require("./../models/Post");

class UserService {
    constructor() {
        this.eventEmitter = eventEmitter
        //User subscrbe to the UserService events
        new UserSubscriber(this.eventEmitter).listen()
    }
    async update(user) {

        try {
            //Update user info
            user.password = await encrypt(user.password)

            //update user in db
            const updatedUser = await UserModel.findByIdAndUpdate(user.userID, {
                $set: user
            }, { new: true, useFindAndModify: false }) //new, send updated verson, useFindAndModify , removes warnings

            if (updatedUser) {
                const { _id } = updatedUser._doc //get all props except password

                //Emit event
                this.eventEmitter.emit(eventsAtions.user.updated, updatedUser)
            }
            return updatedUser

        } catch (error) {
            console.log(error)
            throw error
        }

    }


    async delete(user) {

        try {

            //Find user
            const userFounded = await UserModel.findById(user.userID)
            if (!userFounded) return null //no user with this id founded

            //delete user posts in db
            await PostModel.deleteMany({ username: user.username })

            //delete user in db
            const deletedUser = await UserModel.findByIdAndDelete(user.userID)

            if (deletedUser) {
                //Emit event
                this.eventEmitter.emit(eventsAtions.user.deleted, deletedUser)
            }
            return deletedUser

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async getUser(id) {
        try {
            //Find user
            const userFound = await UserModel.findById(id)
            if (!userFound)  return null
            const { password, ...user } = userFound._doc
            console.log(user);
            return user
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}


module.exports = { UserService, eventEmitter }