'use strict';
var cmd = require('node-cmd');
var fs = require('fs');
var sleep = require('system-sleep');
let logger = require('../common/logger')
// const messageFolder = "~/amai-server/private/messages/";
const messageFolder = "private/messages/";

module.exports = {
    play : function (receiverId, beaconId) {
        var folder = messageFolder + receiverId + "/" + beaconId;
        logger.info("Searching messages for: " + receiverId + " for beacon: " + beaconId);
        logger.info(messageFolder+receiverId);
        if (fs.existsSync(messageFolder+receiverId)) {
            if(fs.existsSync(folder)) {
                fs.readdirSync(folder).forEach(file => {
                    let command = 'omxplayer ~/amai-server/' + folder + '/' + file;
                    // let command = 'omxplayer ~/amai-server/' + folder + '/*';
                    logger.info("command: " + command);
                    cmd.run(command);
                    sleep(30000);
                })
            }
        }

    }
};
