import { createApp } from 'vue'
import OffCanvas from "./OffCanvas.vue";
import "@/style/main.css";

const MOUNT_EL_ID = "obsidian-search-for-chrome";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
  mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(OffCanvas).mount(mountEl);

window.obsidianSearch = vm;
console.log(window.obsidianSearch);

chrome.runtime.onMessage.addListener(message => {
  if (message.toggleVisible) {
    vm.visible = !vm.visible;
  }
});