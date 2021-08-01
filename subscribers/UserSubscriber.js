const events = require('./events')

class UserSubscriber {
    constructor(eventEmitter) { this.eventEmitter = eventEmitter }
    listen() {
        this.eventEmitter.on(events.user.signUp, this.onUserSignUp)
        this.eventEmitter.on(events.user.signIn, this.onUserSignIp)
        this.eventEmitter.on(events.user.updated, this.onUserDataUpdated)
        this.eventEmitter.on(events.user.deleted, this.onUserDeleted)
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
        console.log(`User ${data} onUserDataUpdate event`);
    }

    onUserDeleted(data) {
        console.log(`User ${data} onUserDeleted event`);
    }
}

module.exports = UserSubscriber