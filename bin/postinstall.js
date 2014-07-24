var spawn = require('child_process').spawn;

// install bower
console.log('Installing Bower packages');
bowered  = spawn('node', ['../node_modules/bower/bin/bower', 'install', '--config.interactive=false']);
bowered.stdin.end();

// Publish that the package has been installed
require('mean-health').emit('install');
