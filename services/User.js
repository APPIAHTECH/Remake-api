const { eventEmitter } = require("./Auth")
const { encrypt } = require("./Utils")
const config = require("./../config/index")
const eventsAtions = require('./../subscribers/events')
const UserSubscriber = require('./../subscribers/UserSubscriber')
const UserModel = require("./../models/User");

class UserService {
    constructor() {
        this.eventEmitter = eventEmitter
        //User subscrbe to the Auth events
        new UserSubscriber(this.eventEmitter).listen()
    }
    async update(user) {

        try {
            //Update user info
            user.password = await encrypt(user.password)

            //update user in db
            const updatedUser = await UserModel.findByIdAndUpdate(user.userID, {
                $set: user
            }, { useFindAndModify: false }) //useFindAndModify , removes warnings

            if (updatedUser) {
                const { _id } = updatedUser._doc //get all props except password

                //Emit event
                this.eventEmitter.emit(eventsAtions.user.updated, _id)
            }
            return updatedUser

        } catch (error) {
            console.log(error)
            throw error
        }

    }

}


module.exports = { UserService, eventEmitter }