
const WebSocket = require('ws');
const clientWebSocket = new WebSocket('ws://localhost:8080');

clientWebSocket.on('close', () => {
	console.log("Server connection closed");
});

clientWebSocket.on('error', (e) => {
	console.log("Error: ", e.message);
});


clientWebSocket.on('message', (message) => {
	console.log("Received: ", message.toString());
});

clientWebSocket.on('open', ()=> {
	console.log("Server connection opened");
});

function sendSomething() {
	var number = Math.round(Math.random() * 0xFFFFFF);
	if (number % 2 == 0){
		clientWebSocket.send(number.toString());
		console.log("Sending number: ", number);
	} else {
		clientWebSocket.send("ping");
		console.log("Sending 'ping");    
	}
	//setTimeout(sendSomething, 2000);
}