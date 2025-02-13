// @ts-ignore
import OffCanvas from "@/components/OptionsPage.vue";
import { createApp } from "vue";
import {extensionStorage} from "../storage";
import {detectPreferredColorScheme, setColorScheme} from "../theme";

async function setupOptionsPage() {

    const themeSetting = await extensionStorage.getItem("theme");

    if (!themeSetting || themeSetting === "auto" || themeSetting === "device") {
        setColorScheme(document.body, detectPreferredColorScheme());
    } else {
        setColorScheme(document.body, themeSetting);
    }

    createApp(OffCanvas).mount(document.body);
}

setupOptionsPage().then();
