const http = require('http');
const WebSocketServer = require("websocket").server;

let connection;
const httpServer = http.createServer((req, res) => {
	console.log("We received a request");
})

const webSocketServer = new WebSocketServer({
	httpServer : httpServer
})

webSocketServer.on("request", request => {
	connection = request.accept(null, request.origin);
	connection.on("open", () => {
		console.log("websocket connection opened");
	})
	connection.on("close", () => {
		console.log("websocket connection closed");
	})
	connection.on("message", (message) => {
		console.log("websocket received message", message.utf8Data);
		connection.send(`received message:\n ${message.utf8Data}`);
	})
})

httpServer.listen(8080, () => {
	console.log("Server listening on port 8080");
})
