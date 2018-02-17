'use strict';
var cmd = require('node-cmd');
var fs = require('fs');
let logger = require('../common/logger');
const messageFolder = "private/messages/";
var Sound = require('node-aplay');

function playWindows(receiverId, beaconId) {
    var folder = messageFolder + receiverId + "/" + beaconId;
    logger.info("Searching messages for: " + receiverId + " for beacon: " + beaconId);
    logger.info(folder);
    if (fs.existsSync(messageFolder + receiverId)) {
        if (fs.existsSync(folder)) {
            let command = 'start common\\playlist.bat ' + folder;
            logger.info("command: " + command);
            cmd.run(command);
        }
    }
}

function playOther(receiverId, beaconId) {
    var folder = messageFolder + receiverId + "/" + beaconId;
    logger.info("Searching messages for: " + receiverId + " for beacon: " + beaconId);
    logger.info(folder);
    if (fs.existsSync(messageFolder + receiverId)) {
        if (fs.existsSync(folder)) {
            let command = 'common/playlist.sh ' + folder;
            logger.info("command: " + command);
            cmd.run(command);
        }
    }
}

function playFile(file) {
    if (fs.existsSync(file)) {
        // fire and forget:
        new Sound(file).play();

        // you can also listen for various callbacks:
        music.on('complete',
            function () {
                logger.debug('Played file', file);
            }
        );
    }
}

module.exports = {
    playWindows,
    play: playOther,
    playFile,
};

