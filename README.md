# durable-sockets
Native Javascript web sockets are not very nice. Mainly they have the following problems:

- Any data to be sent or received over the websocket connection has to be manually encoded / decoded (generally in JSON).
- If the server closes the connection, the client must manually detect this and attempt to reconnect the socket.
- If the client attempts to send a message over a socket which if closed (or in process of closing) the message will be lost.

This package attempts to solve these issues.


## Usage
```javascript
/* configuring the websocket */
const socket = new DurableSocket(url, event => {
  console.log("[message]", JSON.parse(event.data))
})

/* connecting a websocket */
socket.connect()

/* sending a message over the websocket */
socket.sendMessage({ message: "Hello world"})
```
