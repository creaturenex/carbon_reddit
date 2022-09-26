import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["reveal"];

  connect() {
    console.log("Hello, Stimulus!", this.element);
  }

  toggleReveal() {
    this.revealTargets.forEach((el) => {
      if ((el.hidden = true)) {
        el.hidden = false;
      } else {
        el.hidden = !el.hidden;
      }
    });
  }
}
