var server = require('websocket').server
var http = require('http')
const cryptojs = require('crypto-js');

var socket = new server({
    httpServer: http.createServer().listen(1998)
});

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b" 

socket.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) { // when receiving a message from client, it is displayed on client Sending json messaje
        console.log("[ENCRYPTED] Received from client: " + message.utf8Data);
        console.log("[DECRYPTED] Received from client: " + (cryptojs.AES.decrypt(message.utf8Data, ENC_KEY)).toString(cryptojs.enc.Utf8))
        connection.sendUTF('Sending json ...');
        setTimeout(function() {
            connection.sendUTF('Server should have the encrypted JSON by now');
        }, 1500);
    });

    connection.on('close', function(connection) {  
        console.log('connection closed');
    });
}); 