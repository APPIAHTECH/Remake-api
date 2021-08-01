const mongoose = require("mongoose")
const config = require("./../config/index")

const init = async () => {
    const {databaseURL} = config
    const connection = await mongoose.connect(databaseURL , 
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );
    return connection.connection.db;
}

module.exports = init