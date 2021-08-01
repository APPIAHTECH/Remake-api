const events = require('./events')

class UserSubscriber
{
    constructor(eventEmitter) { this.eventEmitter = eventEmitter}
    listen()
    {
        this.eventEmitter.on(events.user.signUp, this.onUserSignUp)
        this.eventEmitter.on(events.user.signIn, this.onUserSignIp)
    }
    onUserSignUp(data)
    {
        /**
         * @TODO
         * We can add some third party labrary 
         */
        console.log(`User ${data} sign up event`);
    }

    onUserSignIp(data)
    {
        console.log(`User ${data} sign in event`);
    }
}

module.exports = UserSubscriber