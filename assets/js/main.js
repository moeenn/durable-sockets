import { DurableSocket } from "./DurableSocket.js"
import { getForm, populateMessageTypes } from "./helpers.js"

const config = {
  url: "ws://localhost:5000/ws",
  messages: [
    { name: "Echo", value: "echo" },
    { name: "Subscribe Test", value: "sub.test" },
    { name: "Send to Test", value: "send.test" },
  ]
}

function main() {
  populateMessageTypes(config.messages)

  const socket = new DurableSocket(config.url, payload => {
    console.log("[message]", payload)
  })

  socket.connect()

  document
    .querySelector("form.form")
    .addEventListener("submit", (e) => {
      e.preventDefault()
      socket.sendMessage(getForm())
    })
}

document.addEventListener("DOMContentLoaded", main)