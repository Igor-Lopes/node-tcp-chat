# node-tcp-chat

Um chat tcp simples feito em Node.js para o Projeto #1 da disciplina de Redes de Dados II

## Funcionalidades:

* Listagem dos clientes conectados
* Envio de mensagens para todos os clientes conectados
* Envio de mensagem privadas

## Como Executar:

### Verificar se o Node.js está instalado: 

1. Digite no seu terminal:

    `node -v`

    Caso o Node esteja instalado, será exibida a versão do Node instalada:

    Exemplo: `v7.4.0`

    Caso contrário será necessário instalar o Node. https://nodejs.org/en/download/


2. Clone ou baixe o conteúdo do repositório:

    `git clone https://github.com/Igor-Lopes/node-tcp-chat.git`

3. Execute o app servidor:

    Navegue até a raiz do repositório e execute o arquivo `app.js` através do seu terminal com o seguinte comando:

    `node server.js`
    
    A seguinte mensagem será exibida no terminal:
    
    `Servidor escutando na porta 5000`
    
    A porta default utilizada é a 5000. Caso deseje trocá-la, altere a variável **port** no início de app.js:
    
    
```javascript
...
// Módulo Net, nativo do Node, para criar servidor e cliente TCP: https://nodejs.org/api/net.html
var net = require('net');
// Porta utilizada pelo servidor
var port = 5000;
...
```
    
    
## Utilização:

Com a aplicação servidora excutando, é possível conectar os clientes TCP.

* Conectando-se ao servidor:

  Para conectar-se ao servidor, é necessário executar o app do cliente:
  
  `node client.js`
  
  Você deverá receber uma mensagem de boas-vindas do servidor:
  
  `Bem-vindo ::127.0.0.1:64663`
  
  É possível também se conectar com um cliente TCP instalado, como o [netcat](http://netcat.sourceforge.net/)

  Digite no terminal e espeficifique o host e a porta utilizada:

  `netcat localhost 5000`

  Exemplo de mensagem exibida ao conectar o cliente:

  `Bem-vindo ::1:61586`

  Onde o nome atribuído para o cliente é seu respectivo IP e porta

* Listando os clientes conectados:

  Para visualizar todos os clientes conectados, digite:
  
  `-list`
  
  Exemplo de listagem de clientes:
  
```
Clientes conectados:
-----------------------
::1:61586
::1:61657
::1:61658
-----------------------
```

* Enviando mensagem para todos os clientes:

  Para enviar mensagem para todos os clientes, basta digitar sua mensagem no terminal e pressionar ENTER
  
* Enviando mensagem privada:

  Para enviar uma mensagem privada, digite o argumento `--p` seguido de espaço e o cliente desejado (IP e porta, como ocorre **exatamente** na listagem)
  
  Exemplo:
  
  `-list` 
  
  ```
Clientes conectados:
-----------------------
::1:61586
::1:61657
::1:61658
-----------------------
```

  `teste mensagem privada --p ::1:61658`
  
  No recepiente(::1:61658) será exibido a mensagem do destinatário(::1:61586):
  `(Mensagem Privada)::1:61586 disse: teste mensagem privada`
  
