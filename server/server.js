//"use strict";

const serverPort = 8080,
    http = require("http"),
    httpServer = http.createServer(function(request, response) {
        console.log((new Date()) + ' Received request for ' + request.url);
        response.writeHead(404);
        response.end();
    });
    WebSocket = require("ws"),
    // set httpServer as WS server
    websocketServer = new WebSocket.Server(
	    { "server" : httpServer }
	    );
var debug = true;
//when a websocket connection is established
websocketServer.on('connection', (webSocket, req) => {
    //send feedback to the incoming connection
    webSocket.send('Hello Client!');
    if (debug) {
	    console.log((new Date()) + " WebSocketServer: Connection stablished with client: ", req.socket.remoteAddress);
    }

    
    //when a message is received
    webSocket.on('message', (message, isBinary) => {
        if (debug) {
            console.log("WebSocketServer: Message received: ", message.toString());
        }

        if (message.toString() == 'ping') {
            webSocket.send("pong");
        }
        else {
        //for each websocket client
        websocketServer
                .clients
                .forEach( client => {
                    //send the client the current message
                    if (client!== webSocket && client.readyState === WebSocket.OPEN){
                        client.send(message, { binary: isBinary });
                    }
                });
        };
    })
    

    webSocket.on("close", () => {
        if (debug) {
    	    console.log("WebSocketServer: connection closed");
        }
    });
});


//start the web server
httpServer.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});