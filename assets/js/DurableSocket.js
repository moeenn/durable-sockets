export class DurableSocket {
  constructor(url, messageHandler, debug = true) {
    this._url = url
    this._messageHandler = messageHandler
    this._queue = []
    this._debug = debug
  }

  _log(message) {
    if (this._debug) {
      console.log(message)
    }
  }

  _handleOpen() {
    this._log("[socket connected]")
  }

  _handleMessage(event) {
    const payload = JSON.parse(event.data)
    this._messageHandler(payload)
  }

  _handleClose() {
    this._log("[closing socket]")
    this.connect()
  }

  connect() {
    this._log("[connecting socket]")
    this._socket = new WebSocket(this._url)
    {
      this._socket.addEventListener("open", this._handleOpen.bind(this))
      this._socket.addEventListener("message", this._handleMessage.bind(this))
      this._socket.addEventListener("close", this._handleClose.bind(this))
    }

    /* process the queue */
    while (this._queue.length) {
      const front = this._queue.shift()
      this.sendMessage(front)
    }
  }

  /**
   *  if the socket if not connected when attempting to send a message, 
   *  the message will be added to queue and processed when the socket
   *  is connected again
  */
  sendMessage(data) {
    if (this.status !== "OPEN") {
      this._queue.push(data)
      return
    }

    const payload = JSON.stringify(data)
    this._socket.send(payload)
  }

  get status() {
    const currentState = this._socket.readyState

    switch (currentState) {
      case 0:
        return "CONNECTING"

      case 1:
        return "OPEN"

      case 2:
        return "CLOSING"

      case 3:
        return "CLOSED"

      default:
        console.error("unrecognized socket status code", currentState)
    }
  }
}
