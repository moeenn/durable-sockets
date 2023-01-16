export function getForm() {
  const type = document.querySelector("[data-type]");
  const payload = document.querySelector("[data-payload]");

  return {
    type: type.value,
    payload: JSON.parse(payload.value),
  }
}

export function populateMessageTypes(messages) {
  const select = document.querySelector("[data-type]")
  select.innerHTML = messages.map(
    m => `<option value="${m.value}">${m.name}</option>`
  )
}