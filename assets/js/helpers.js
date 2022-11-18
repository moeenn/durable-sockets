export function getForm() {
  const type = document.querySelector("[data-type]");
  const payload = document.querySelector("[data-payload]");

  return {
    type: type.value,
    payload: JSON.parse(payload.value),
  }
}