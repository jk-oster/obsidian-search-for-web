// @ts-ignore
import OffCanvas from "@/components/OffCanvas.vue";
import { createApp } from "vue";

const MOUNT_EL_ID = "obsidian-search-for-chrome";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(OffCanvas).mount(mountEl);

// @ts-ignore
window.obsidianSearch = vm;
// @ts-ignore
// console.log(window.obsidianSearch);
