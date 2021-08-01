const { EventEmitter } = require('events');
const eventsAtions = require('./../subscribers/events')
const UserSubscriber = require('./../subscribers/UserSubscriber')
const UserModel = require("./../models/User")

/**
 * Decide to create an istance of EventEmitter, so anyone can import and use it
 */
const eventEmitter = new EventEmitter()

class AuthService {
    constructor() {
        this.eventEmitter = eventEmitter
        //User subscrbe to the Auth events
        new UserSubscriber(this.eventEmitter).listen()
    }
    async singUp(data) {

        try {
            //Create user
            console.log("Create user");
            const newUser = new UserModel({
                username: data.username,
                email: data.email,
                password: data.password
            })

            //Save to db
            const user = await newUser.save()

            //Emit event
            this.eventEmitter.emit(eventsAtions.user.signUp, user)

            return user
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    singIn() {
        //Create user
        console.log("Loggin user");

        //Emit event
        this.eventEmitter.emit(eventsAtions.user.signIn, { user: "vegeta" })
    }
}


module.exports = { AuthService, eventEmitter }