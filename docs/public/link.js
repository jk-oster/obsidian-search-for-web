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

const {os, browser, version} = usePlatform();

const downloadBtns = document.querySelectorAll(`a.VPLink[href="${storeLinks.chrome}"], a.VPButton[href="${storeLinks.chrome}"]`);
if (!downloadBtns || downloadBtns.length <= 0) {
  return;
}

if(storeLinks[browser]) {
  downloadBtns.forEach(btn => {
    btn.href = storeLinks[browser];
  });
}