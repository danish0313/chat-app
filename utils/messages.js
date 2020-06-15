const moment = require("moment")

formateMessages = (username , text) => {

        return {
                username ,
                text,
                time : moment().format('h:mm a')
        }
}

module.exports = formateMessages;