'use strict';
var cmd = require('node-cmd');
var fs = require('fs');
// const messageFolder = "~/amai-server/private/messages/";
const messageFolder = "private/messages/";

module.exports = {
    play : function (receiverId, beaconId) {
        var folder = messageFolder + receiverId + "/" + beaconId;
        console.log("Searching messages for: " + receiverId + " for beacon: " + beaconId);
        console.log(messageFolder+receiverId);
        if (fs.existsSync(messageFolder+receiverId)) {
            if(fs.existsSync(folder)) {
                fs.readdirSync(folder).forEach(file => {
                    let command = 'omxplayer ~/amai-server/' + folder + '/' + file;
                    console.log("command: " + command);
                    cmd.run(command);
                })
            }
        }

    }
};
