const browser = require("webextension-polyfill");

import { createApp } from 'vue'
import OffCanvas from "@/components/OffCanvas.vue";

const MOUNT_EL_ID = "obsidian-browser-search";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(OffCanvas).mount(mountEl);