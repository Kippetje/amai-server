'use strict';
var cmd = require('node-cmd');

module.exports = {
    play : function (name) {
        console.log("Playing sound: " + name);
        cmd.run('echo "Hello World"');
        cmd.run('omxplayer ~/amai-server/private/example.amr');

    }
};
