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

var isplaying = false;

function playFile(file) {
    var fullpath = path.join(__dirname, file);
    logger.debug(fullpath, fs.existsSync(fullpath));
    logger.debug('test', process.platform);
    if (process.platform == 'win32') {
        let command = 'start common\\playlist.bat ' + fullpath;
        logger.info("command: " + command);
        cmd.run(command);
    } else if (process.platform == 'linux') {
        // fire and forget:
        if (!isplaying) {
            isplaying = true;

            logger.debug('Play sound', fullpath);
            var music = new Sound(fullpath);
            music.play();

            // you can also listen for various callbacks:
            music.on('complete',
                function () {
                isplaying =false;
                    logger.debug('Played file', fullpath);

                }
            );
        } else {
            logger.warn('Already playing.');
        }
    } else {
        let command = 'common/playlist.sh ' + fullpath;
        logger.info("command: " + command);
        cmd.run(command);
    }
}

module.exports = {
    playWindows,
    play: playOther,
    playFile,
};

