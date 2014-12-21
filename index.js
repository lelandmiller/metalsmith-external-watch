//'use strict';

var static = require('node-static');
var tinylr = require('tiny-lr');
var gaze = require('gaze');
var chalk = require('chalk');

module.exports = function(buildFunction) {


    var port = 35729,
        lrServer = tinylr();
    lrServer.listen(port, function() {
        console.log(chalk.cyan('Listening on port', port));
    });


    //
    // Create a node-static server instance to serve the './public' folder
    //
    var file = new static.Server('./build', {
        cache: 0
    });





    require('http').createServer(function(request, response) {
        request.addListener('end', function() {
            //
            // Serve files!
            //
            file.serve(request, response);
        }).resume();
    }).listen(8080);

    gaze(['templates/*', 'src/**/*'], function() {
        console.log(chalk.green('Watching files'));

        this.on('changed', function(filepath) {

            console.log(chalk.red(filepath) + chalk.blue(' was changed.'));
            console.log(chalk.yellow('Rebuilding files...'));


            buildFunction(function() {
                console.log(chalk.blue('Build successful'));
                lrServer.changed({
                    body: {
                        files: ['*']
                    }
                });
            });

        });
    });

    buildFunction(function() {
        console.log(chalk.blue('Build successful'));
        lrServer.changed({
            body: {
                files: ['*']
            }
        });
    });


};
