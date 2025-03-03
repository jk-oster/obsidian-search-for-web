import {usePlatform} from "./platform.js";

const storeLinks = {
  chrome: 'https://chromewebstore.google.com/detail/vault-lens/ikdemlfoilfdmcdiegelchlhfnkpmaee',
  firefox: 'https://addons.mozilla.org/de/firefox/addon/vault-lens/',
  edge: 'https://chromewebstore.google.com/detail/vault-lens/ikdemlfoilfdmcdiegelchlhfnkpmaee',
  opera: 'https://chromewebstore.google.com/detail/vault-lens/ikdemlfoilfdmcdiegelchlhfnkpmaee',
  arc: 'https://chromewebstore.google.com/detail/vault-lens/ikdemlfoilfdmcdiegelchlhfnkpmaee',
  brave: 'https://chromewebstore.google.com/detail/vault-lens/ikdemlfoilfdmcdiegelchlhfnkpmaee',
  safari: 'https://chromewebstore.google.com/detail/vault-lens/ikdemlfoilfdmcdiegelchlhfnkpmaee',
};

document.addEventListener('DOMContentLoaded', () => {
    const {browser} = usePlatform();
    const downloadBtns = document.querySelectorAll(`a.VPLink[href="${storeLinks.chrome}"], a.VPButton[href="${storeLinks.chrome}"]`);
    if (downloadBtns && downloadBtns.length > 0 && storeLinks[browser]) {
        downloadBtns.forEach(btn => {
            btn.href = storeLinks[browser];
        });
    }
});
