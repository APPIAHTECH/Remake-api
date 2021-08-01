const { EventEmitter } = require('events');
const bcrypt = require('bcrypt');

const config = require("./../config/index")
const eventsAtions = require('./../subscribers/events')
const UserSubscriber = require('./../subscribers/UserSubscriber')
const UserModel = require("./../models/User");
const { isNull } = require('util');

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
    async singUp(userData) {

        try {
            //Create user
            const password = await this.encrypt(userData.password)
            const newUser = new UserModel({
                username: userData.username,
                email: userData.email,
                password
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

    async singIn(userData) {
        try {
            //Fetch user from db
            const userFound = await UserModel.findOne({ email: userData.email })

            //user does not exits
            if (!userFound) return null;

            const {password , ...user} = userFound._doc //get all props except password

            //there is a match
            const match = await bcrypt.compare(userData.password, password);

            if (match)
                //Emit event
                this.eventEmitter.emit(eventsAtions.user.signIn, user)

            return {match , user}

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async encrypt(data) {
        const saltRounds = await bcrypt.genSalt(config.saltRounds);
        const hashedData = await bcrypt.hash(data, saltRounds)
        return hashedData
    }

}


module.exports = { AuthService, eventEmitter }