/*
Igor Lopes
Redes de Computadores II - Trabalho #1
Chat TCP Simples com NodeJS
*/

// Módulo Net, nativo do Node, para criar servidor e cliente TCP: https://nodejs.org/api/net.html
var net = require('net');
// Porta utilizada pelo servidor
var port = 5000;
// Array para armazenar sockets dos clientes que se conectam
var clients = [];

// Criar servidor TCP
var server = net.createServer(function(socket) {
    // Obter IP e porta do cliente que se conecta
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    // Escrever mensagem de boas-vindas para cliente que se conecta
    socket.write("Bem-vindo " + socket.name + "\n");
    // Insere socket do cliente no array de clientes
    clients.push(socket);
    // Listener para o evento data(Quando dados são enviados pelo cliente este envento ocorre): https://nodejs.org/api/net.html#net_event_data
    socket.on('data', function(data) {

        if (data.toString().replace(/\r?\n$/, '') === '-list') {
            listClients();
        } else {
            // Chama função para que occorra o envio das mensagens para os demais clientes
            sendMessages(socket.name + " disse: " + data, socket);
        }
    });

    function sendMessages(message, sender) {

        clients.forEach(function(client) {
            // Não envia mensagem para o próprio cliente que a enviou
            if (client != sender) {
                client.write(message);
            }
        });
        // Escreve a mensagem também no console do servidor
        console.log(message);
    }

    function listClients() {
        socket.write('Clientes conectados:\n');
        socket.write('-----------------------\n');
        clients.forEach(function(client) {
            socket.write(client.name + '\n');
        });
        //socket.write(clients.length.toString());
        socket.write('-----------------------\n');
    }

  /*  function sendPrivateMessage(message, client) {

    }
    */
    
}).listen(port, () => {
    console.log("Servidor escutando na porta " + port);
})
