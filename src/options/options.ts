// @ts-ignore
import OffCanvas from "@/components/OptionsPage.vue";
import { createApp } from "vue";
import {useTheme} from "../theme.js";

const {setColorScheme} = useTheme();
setColorScheme(document.body).then();
createApp(OffCanvas).mount("body");
