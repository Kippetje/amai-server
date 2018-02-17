'use strict';
var cmd = require('node-cmd');
var fs = require('fs');
let logger = require('../common/logger')
const messageFolder = "private/messages/";

module.exports = {
    play : function (receiverId, beaconId) {
        var folder = messageFolder + receiverId + "/" + beaconId;
        logger.info("Searching messages for: " + receiverId + " for beacon: " + beaconId);
        logger.info(folder);
        if (fs.existsSync(messageFolder+receiverId)) {
            if(fs.existsSync(folder)) {
                    let command = 'start common\\playlist.bat ' + folder;
                    logger.info("command: " + command);
                    cmd.run(command);
            }
        }

    }
};

