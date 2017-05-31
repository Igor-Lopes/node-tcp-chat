/*
Igor Lopes
Redes de Computadores II - Trabalho #1
Chat TCP Simples com NodeJS
*/

// Módulo Net, nativo do Node, para criar servidor e cliente TCP: https://nodejs.org/api/net.html
var net = require('net');
//Crypto e RSA
var crypto = require('crypto');
var rsaKeygen = require('rsa-keygen');
//Gerar keys do servidor
var keys = rsaKeygen.generate();
// Porta utilizada pelo servidor
var port = 5000;
// Array para armazenar sockets dos clientes que se conectam
var clients = [];

// Criar servidor TCP
var server = net.createServer(function(socket) {
    // Obter IP e porta do cliente que se conecta
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    //Envia Public Key do servidor
    socket.write(keys.public_key);
    console.log(socket.name + ' conectou-se');
    // Insere socket do cliente no array de clientes
    clients.push(socket);

    // Listener para o evento data(Quando dados são enviados pelo cliente este envento ocorre): https://nodejs.org/api/net.html#net_event_data
    socket.on('data', function(data) {
            if (data.includes('PUBLIC KEY')) {
                socket.key = data.toString();
            } else {
            //Decripta mensagem com chave privada do servidor
            var decrypted = crypto.privateDecrypt({
                key: keys.private_key
            }, data);
            if (decrypted.toString().replace(/\r?\n$/, '') === '--list') {
                listClients();
                // Caso a mensagem termine com o argumento '--p', será enviado mensagem privada para o host especificado
            } else if (decrypted.toString().replace(/\r?\n$/, '').includes('--p')) {
                sendPrivateMessage(decrypted, socket);
            } else {
                var message = socket.name + " disse: " + decrypted.toString();
                // Chama função para que occorra o envio das mensagens para os demais clientes
                sendMessages(message, socket);
            }
        }
    });

function sendMessages(data, sender) {

    clients.forEach(function(client) {
        // Não envia mensagem para o próprio cliente que a enviou

        if (client != sender) {
            var result = crypto.publicEncrypt({
                key: client.key
            }, new Buffer(data.toString()));
            client.write(result);
        }
    });
    // Escreve a mensagem também no console do servidor
    console.log(data);
}

function sendPrivateMessage(data, sender) {
    //Filtra destinatário da string enviada pelo cliente
    var recipient = data.toString().split('--p')[1].replace(/\s+/g, '');
    // Filtra a mensagem sem o argumento e destinatário
    var message = "(Mensagem Privada)" + socket.name + " disse: " + data.toString().split('--p')[0];
    clients.forEach(function(client) {
        if (client.name === recipient && client != sender) {
            //Encripta mensagem com chave publica do cliente destinatário
            var result = crypto.publicEncrypt({
                key: client.key
            }, new Buffer(message));
            client.write(message);
            return;
        }
    });
}

function listClients() {
    //Lista todos os clientes conectados
    clients.forEach(function(client) {
        var result = crypto.publicEncrypt({
            key: client.key
        }, new Buffer(client.name + '\n'));
        socket.write(result);
    });
}

}).listen(port, () => {
    console.log("Servidor escutando na porta " + port);
});
