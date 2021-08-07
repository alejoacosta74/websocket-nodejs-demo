const WebSocketClient = require('websocket').client;
const wsClient = new WebSocketClient();

wsClient.on('connectFailed', function(error) {
	console.log('Connect Error: ' + error.toString());
    })

wsClient.on('httpResponse', () => {
	console.log("httpResponse: ", arguments)
})

wsClient.on('connect', (connection) => {
	console.log (new Date(), ' client connected to server');
	connection.on('error', function(error) {
		console.log("Connection Error: " + error.toString());
	    });
	connection.on('close', function() {
		console.log('echo-protocol Connection Closed');
	});
	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			console.log("Server responded: '" + message.utf8Data + "'");
		}
	});
	
	function sendNumber() {
		if (connection.connected) {
			var number = Math.round(Math.random() * 0xFFFFFF);
			connection.sendUTF(number.toString());
			console.log("Sending message: ", number);
			setTimeout(sendNumber, 1000);
		}
	}
	sendNumber();
})

wsClient.connect('ws://localhost:8080/');
