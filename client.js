var net = require('net');

var client = new net.Socket();
client.connect(5000, '127.0.0.1', function() {
    console.log('Connectado no chat');
});

client.on('data', function(data) {
    console.log(data.toString());
});

client.on('close', function() {
    console.log('Conexão encerrada');
});


var stdin = process.openStdin();

stdin.addListener("data", function(data) {
    client.write(data.toString());
});
