const bcrypt = require('bcrypt');
const config = require("./../config/index")

const encrypt = async(data)=> {
    const saltRounds = await bcrypt.genSalt(config.saltRounds);
    const hashedData = await bcrypt.hash(data, saltRounds)
    return hashedData
}

module.exports = { encrypt }