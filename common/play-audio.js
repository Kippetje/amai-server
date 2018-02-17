'use strict';
var cmd = require('node-cmd');
var fs = require('fs');
let logger = require('../common/logger');
const messageFolder = "private/messages/";
var Sound = require('node-aplay');
var path = require('path');

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
    var fullpath = path.join(__dirname, file);
    logger.debug(fullpath, fs.existsSync(fullpath));
    logger.debug('test', process.platform);
    if (process.platform == 'win32') {
        logger.error('Windows');
    } else if (process.platform == 'linux') {
        // fire and forget:
        logger.debug('Play sound',fullpath);
        new Sound(fullpath).play();

        // you can also listen for various callbacks:
        music.on('complete',
            function () {
                logger.debug('Played file', fullpath);
            }
        );
    }
}

module.exports = {
    playWindows,
    play: playOther,
    playFile,
};

