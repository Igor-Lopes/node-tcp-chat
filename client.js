var net = require('net');
var crypto = require('crypto');
var rsaKeygen = require('rsa-keygen');

var serverPublicKey = '';

var keys = rsaKeygen.generate();

var client = new net.Socket();
client.connect(5000, '127.0.0.1', function() {
    console.log('Connectado no chat');
    client.write(keys.public_key);
});

client.on('data', function(data) {
    if (data.includes('PUBLIC KEY')) {
        serverPublicKey = data.toString();
    } else {
        var decrypted = crypto.privateDecrypt({
            key: keys.private_key
        }, data);
        console.log(decrypted.toString());
    }
});

client.on('close', function() {
    console.log('Conexão encerrada');
});


var stdin = process.openStdin();

stdin.addListener("data", function(data) {
    var result = crypto.publicEncrypt({
        key: serverPublicKey
    }, new Buffer(data.toString()));
    client.write(result);
});
