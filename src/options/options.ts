// @ts-ignore
import OffCanvas from "@/components/OptionsPage.vue";
import { createApp } from "vue";
import {detectColorScheme} from "../util";
import {useTheme} from "../theme";

const {setColorScheme} = useTheme();
setColorScheme(document.body).then();
createApp(OffCanvas).mount("body");
