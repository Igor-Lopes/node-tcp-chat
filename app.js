var net = require('net');


var server = net.createServer(function(socket) {

    socket.name = socket.remoteAddress + ":" + socket.remotePort;

    socket.write("Welcome " + socket.name + "\n");

    socket.on('data', function(data) {
      console.log("User " + socket.name + ": " + data);
    });

}).listen(5000);
