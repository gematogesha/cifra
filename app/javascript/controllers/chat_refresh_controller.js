import { Controller } from "@hotwired/stimulus"
import { cable } from "@hotwired/turbo-rails"

export default class extends Controller {
  connect() {
    this.scrollMessages()
    this.deleteName()
  }

  clearInput() {
    this.element.reset();
  }

  scrollMessages() {
    const chatContainer = document.getElementsByClassName("chat-container")[0]
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
  }

  deleteName () {
    const messageContainer = document.querySelector("#messages").getElementsByClassName("message-container")
    const length = messageContainer.length

    for (var q=1; q<=length; ++q) {
      if (messageContainer[q].classList[2] === messageContainer[q-1].classList[2]) {
        messageContainer[q].classList.add("from-previous")
      }
    }

  }

}

