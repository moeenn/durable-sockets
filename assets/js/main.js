import { DurableSocket } from "./DurableSocket.js"
import { getForm } from "./helpers.js"

function main() {
  const url = "ws://deliverylogisticsbackend-env.eba-qgmp3ib2.ap-northeast-1.elasticbeanstalk.com/ws"
  // const url = "ws://localhost:5000/ws"

  const socket = new DurableSocket(url, payload => {
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