export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="subscribe-button bg-cyan-500 hover:bg-cyan-600 py-2 px-4 text-white rounded-md">
      <i class="fas fa-bell"></i>
      Subscribe
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="unsubscribe-button bg-cyan-500 hover:bg-cyan-600 py-2 px-4 text-white rounded-md">
      <i class="fas fa-bell-slash"></i>
      Unsubscribe
    </button>
  `;
}
