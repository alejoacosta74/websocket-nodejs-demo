# Node.js websocket demo

## Description
- Implements a web socket server and two web socket clients with the Node.js package `ws`
- The server broadcast message received from client1 to the rest of the connected clients
- Client1 randomly sends 'ping', and the server responds with 'pong' only to client1.


## Usage
On 3 different terminals, run:

- web socket server
```bash
node server
```

- web socket client1:
```bash
node client1
```

- web socket Client2:
```bash
node client2
```