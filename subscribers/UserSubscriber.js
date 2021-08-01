const events = require('./events')

class UserSubscriber {
    constructor(eventEmitter) { this.eventEmitter = eventEmitter }
    listen() {
        this.eventEmitter.on(events.user.signUp, this.onUserSignUp)
        this.eventEmitter.on(events.user.signIn, this.onUserSignIp)
        this.eventEmitter.on(events.user.updated, this.onUserDataUpdated)
    }
    onUserSignUp(data) {
        /**
         * @TODO
         * We can add some third party labrary 
         */
        console.log(`User ${data} onUserSignUp event`);
    }

    onUserSignIp(data) {
        console.log(`User ${data} onUserSignIp event`);
    }

    onUserDataUpdated(data) {
        console.log(`User ${data} onUserDataUpdated event`);
    }
}

module.exports = UserSubscriber