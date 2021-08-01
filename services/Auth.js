const EventEmitter = require('events')
const events = require('./../subscribers/events')

class Auth extends EventEmitter
{
    singUp()
    {
        //Create user
        console.log("Create user");

        //Emit event
        this.emit(events.user.signUp, { user: "vegeta" })
    }

    singIn()
    {
        //Create user
        console.log("Loggin user");

        //Emit event
        this.emit(events.user.signIn, { user: "vegeta" })
    }
}


module.exports = Auth