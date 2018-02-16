'use strict';
var cmd = require('node-cmd');
var fs = require('fs');
// const messageFolder = "~/amai-server/private/messages/";
const messageFolder = "private/messages/";

module.exports = {
    play : function (senderId, beaconId) {
        console.log("Searching messages for: " + senderId + " for beacon: " + beaconId);
        fs.readdirSync(messageFolder+senderId+"/"+beaconId).forEach(file => {
                console.log(file);
                cmd.run('omxplayer ~/amai-server//private/messages/'+userId+'/'+beaconId+'/'+file);
        })

    }
};
