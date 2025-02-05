import browser from "webextension-polyfill";

export function escapeRegex(string: string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
