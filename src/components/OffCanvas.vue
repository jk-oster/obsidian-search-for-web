<template>
  <button v-if="store.showInPageIcon && !store.show && Number(store.results) > 0"
          class="popup-button fixed right-1 top-1/2 rounded-full" @click="toggleSidebar">
    <div class="relative">
      <img alt="Show Obsidian Search" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH5QYZBTkPsPyf5AAADBdJREFUaN7tmVuIZdlZx3/fWmvvfS516tJ16erq7pqu7qHTGR3M+JAEB+IoiYgIYYIhPgjeUELAJyEQQXAeFPVhBBWUGVFEiA8xaCYBhRll4mDGSzOZNNPd6dvMdHVXdXVV9ak697PP3mstH/Y+u05duqumow/iLNicU6f22ev7f///d1sHPlwfrv/fSw674Y9eeIe1zVucmvtouVyqzRsdnvLeB967iiiMiCqDKj/e9j722I63WBHVRWSQpvFKP27fs6heaEK+9JXFxwPwsz/9a/zK515ivb48XYpqn1WiPy/CR0FmAA2o/Psq//txlgMs4IfvPf4Bnu87l36tF7f/YWFucfPy9e/wW3/w7IEPOHDjL/7CS/zqF36H1fv3nilHtT9XSv+GiJwHmQRCwOTfHQJ53CUjzzFAKMiEiJxTSv9MYEqfbLbrV3706adWRab57uV/PBzAMx/7cX795/+E5ZU7z5Sisb8UUc/+gEYC4L3PHe3xOHz26Q4S2ScGJSJntDafWNuoX/zEM59eHR9b4OKlb+3zwK71Vy9u0mjen5maWPiqUvoz/xNGez802uOdw/tsZxFBiUJQiKiDQADgnP32g607n58cn9/48u8/xebm5g7K0RtPLVzgl740TbVy7Hml9E/8IIZ77/DeYZ3F+oR40GdjfYN2u0ma9hkMeiSDmCQdYF2C8xbv3YHPU0o/Wxub/rlf/s1Z5o595GAGTp48yS9+7mW2m2tjH/+Rz35d6+CnHt/jDpcDiOOY9fVN7izfo9Vs88kfe5rp2XE2N+oobQh0iDERxgRobVCiEdmvWGuTf3n78j89Pz/3ZPN3//TTtFotIAscAAaDAU9f+Elu3b64IKIufEDT8Z7c8MyT/X6P1dV1bt1cZn2jjreOcjlCRHNsaoJGo06jWScKK0RhBe/zTKwFheyTkyj1kbnZs6fOn/34lTAMi88LAP1+n7OLEWvrk6dF1MwH9brLje91u6ysrHHzxm3u339AkqSZ1pXCJBatDHjNyYUTNNt12p06zqXZc0RAhIwAvQuEoI6Vo9qps4tc6Xa7+wGkacr5JXjjP9OII2adLDg93lu63Q7Ly6vcvHGb9fXM8F33eUcYjeO9IY4tpVKVpcUl3rl6iXbXDb2MiCBG0FrA7wpsbV1afvpCppZ9AKy1TC4B3peOCoDc+Lsrq7x18R02NrZI03T3Hd6jtWb++AnOnTtHq5lyb6XBzFyVqalZzi4tce3GNZQolNLZa56RtBKGYSqCCYPSjDoFzu0Eu9m1WwRamyMB8D6TTa/X4z/efIv79+sYY/bdUylXWDpzlhPzC2ijSeKUrboj7ifE/Sonjp+m22tx585qFsQquzI21Gg8KBEdocAYQ5Ik+xlAQxCUx0X2ADtIOt7hveXdd9/nvffuUCqV83jI/q+UYm72OGfPnKNWq+E92NQhShDnGAwsW/Uu3llOHj9Lq9mi1W5idIjRYQ4mY2RvuRpluTB0SIv3R5GPx3lLu93m7e9eph/HGGMIggDvPaVSiScWl1g4cRKtDdb5Apw4cA5clrZIEsugbxirTLCxuUEUVgjDMoGN0DrAi0fwuzCISPG8AoDWujDuaN533Lz5PnfvriFAkqaUgenpWc6eOcf4+AR4cDZrGwoAAt7t3sZ7z3azTj/uUB70SJIYG6Z4Z/Ha4VG7OFBKFQ4vAAyjXQ7tsDPtt1otvvf2lYJO7zyLp8/wxOISgQlwLqsNwxqR/wEKPFIgEBGcS6lvrzFI+yRpTGqTIrVm6XW3BQ8P4kP8P/S+85Zr37/F+vqD3KUe5yxhmFVUO+x3fNa64Sn6H5VLJ0/5KBHiQZdGcxPEYF3m+ayS+4faUbCx959yCAEeT7PR5OrVmzjnCuc457i7skyv28O7jBHnffbqMta88yMeyrKLiNDttuj22+x0q4+WcRAE+wFYazl8ZQ9fubtGq9nJ4mYEcavVZG19NTPYZZ1n9j4z3o94tWBACe3uNtamWUc67EyL9Lnfo6O2FgB2UuAh5jvH+MQYlWoZrRVqaEn+jLW1VTrddlYnhsbn70c1LTKMO89Wcx0ArQxK6yx9qsw5BylCKbUfwJGykM+MPDY9zqlTcxhj0DrrWYYDSj/ucW/tLta6nIVR44fiGXofnLM0mpu50QatArQyWRHLGZBH6LoAIIeJf48HnliapzrKAuBcZuHmg3VarQbeZ/l+CGQ0+Ib6HyR9Ot0GWgcYnbfUeRF72JBzoISOlEZz1wnCsekaCwvTOQuqkANAkgxYW1/BpiluNKDz1LSTgRTxoMMg6RfGGx2gcwlJvtcuCfCQLFTk1kfaL3lrrAmCkNNnZqlWSmitUSJZdc2dsd2os93cynumPRISQYkgSmh16qQ2QesArYOiF8oaur1thBQKeDiARy4pukatQo5NTzC/MFWwMBo+1qbc31hhkCR5MBcOLBgQoNHaBKQAoHMG5IAe6EA5F+QUtNgBD4nkbFOFUhnVpajM4plZqtWcBbUTcCJCp9Nke3uzyD6+kI/k/Yyl0dpEK40ZjYGiGz04C+0knBEAQ1oSG3d8dth0sIhEoZTKgy5ienqK+RNTBEGQBfQICO8dm/U1BoO48Ekmwyz/pzah12/lXjfFpdROLTiIhUdWYps496hMKoASnQWciYiiCotn5qiNVTDG5JfOwSjiuMt2cxOGE6PKjFdKEQ/a9OPOHvkMB3t5aFtwYBYKwxDSI8hOhixojAkITMT09CQLJ49RLpUolyKiMCQMAoIcTLtdJ7UxWqns0oLWinZ3i9QOcukMU6hGVJaaDzBF9jKwex4w4J1Nyc4pH7mUaLQaslDm1OIM/Z5DKUOaWtI0JbU2rw2ebq/B5GQNEyhMLrVub5thAJvRLCSjR6+5bMA5l8TDGBh2wbuGemJw3vU5ZCgY9igqD77AlJicGmf+xIC4D2lqSZI0B+HAe7zvI5IShWVMoFEC7e5WLsUwl89OBtpXwDxpP+48gN1ptADgvad7G4AEvD1MS4IUsRCYiFJUYeb4ON2mJU08SQHCZiOmVnhiomiKKNQ4P6DVrWeHWjrMQQwzkIw0czvSB+m75YfUgSAIePcObNaXV5xz9cMktBMLBm1CgqBMtVqhPG4x5Q5hKaYyJkxMVJiaHGdqokYQgtKOMDKsb71Ht9cgCisEQYkgP50r5uA9DDhvt7caq6vXbkEURfsBWGv52rde49LVV++lNr5xKACGGUkVLERhhXKpSlTSeN2kb+/SSd9j4O8hpksYCt4nJGmH26uXMUGJUlgtQGgd7vRA+wb5wc3L119feeXVi5TLO7+n7IqBP/yz5+nH7e3PfOqLrxyfWfoUyKN/uBBBUGil8SYk9JXigFaURpuQfr9Ff/CAzmAd0wlp9o6hdFYDxipTlMvjlKIqYVDKTiPU/rNRj7eN5tor33z1xa1vv/nXNNsP9jMAMEi6eO/dxe+98o1+3P73o5TyrK/ZiYUoqlIpT1CrTjNRm2VyfJ6piROMj80QhBG9uEGn16BWnaZWnaZanqAUjREG5UJCw0o95DmOuxcvXvrm33vvbZy0d+2/ayZ2zqEkwJMuLxw//8JT55/74yisXjjspKLISGbYZWq0DgiCiCiskqR9kmRnWMeD0rqQXTQEoHMAhV+FwaBz8/q7//bC337jt99/beZl4jjetfMBEnEA/s23/u7umdMfuzY1Mf+kMdEJEfXQ8yIpBo+s+orKa0SeXQITEQQlwqCcG1ylFFUpRWNEUZUoqBAEEdqERSfqvbf9uPnW5euvf+XFl77wz0DS7TX27X2gxmu1GrVa1b7+na8uW5v8a21sei0MorKICgUx+WguIkh+2JD7Kz9dzk+jlcqkpXWwA8SUCIMSQVAmDEqEpoQxoVdKp0pU6mxa78ftd1bXr//Fa2+8/Ht/8/Uv/xfCIIrCA+f2h4q8Wq0yPz/PrVu3RIkq/dCF5+Z++Pxzi8dnnzwpIuWx6tRkoEslP/KgQmjFqbXDeSfOWZyz4r2TfEaWXOdeKe09dtDtNeuCdDce3F69cuON25euvrrunO3Pz8+7drtNu90+0M6jz5EUreHwp9Wjfmfv90c/9yOvLr/8yPWBNvhfX0EQkKYpYRgWB8De++Ksc2+Afrj+L6z/BgBZCCQ6F/OWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTI1VDA1OjU3OjE0KzAwOjAwnkxkVQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0yNVQwNTo1NzoxNCswMDowMO8R3OkAAAARdEVYdGV4aWY6Q29sb3JTcGFjZQAxD5sCSQAAABJ0RVh0ZXhpZjpFeGlmT2Zmc2V0ADc4ydR7JwAAABl0RVh0ZXhpZjpQaXhlbFhEaW1lbnNpb24AMTAyNPLFVh8AAAAZdEVYdGV4aWY6UGl4ZWxZRGltZW5zaW9uADEwMjRLPo33AAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAZdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADEwMjTnJti9AAAAGHRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADEwMjTybwSkAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE2MjQ2MDA2MzRK8VR4AAAAFHRFWHRUaHVtYjo6U2l6ZQAzMDgzMDNCQsH4EAIAAABVdEVYdFRodW1iOjpVUkkAZmlsZTovLy4vdXBsb2Fkcy81Ni84a0NseXo3LzMwNTMvb2JzaWRpYW5fYWx0X21hY29zX2JpZ3N1cl9pY29uXzE4OTg4Ny5wbmczvG5xAAAAAElFTkSuQmCC" />
    </div>
  </button>
  <div
      :class="(showPopup ? ' translate-x-0 ' : ' translate-x-full ') + ' max-h-screen popup-container fixed duration-300 ease-in-out right-0 top-0 dark bg-gray-900 p-2 rounded overflow-auto'">
    <SearchResults></SearchResults>
  </div>
</template>

<script lang="ts">

import SearchResults from './SearchResults.vue';
import {defineComponent} from 'vue'

import {
  store,
  syncStoreWithExtStorage
} from '../store.js';


export default defineComponent({
  name: "OffCanvas",
  components: { SearchResults},

  data() {
    return {
      store,
    }
  },
  async mounted() {
    await syncStoreWithExtStorage();
    // loadAllFromExtStorageTo();
    store.currentUrl = location.href;
  },
  computed: {
    showPopup(): boolean {
      // console.log(this.notes?.length > 0, this.searchString?.length > this.minChars, this.show);
      return Boolean(Number(store.results) > 0 && store.searchString?.length > store.minChars && store.show);
    },
  },
  methods: {
    toggleSidebar(): void {
      store.show = !store.show;
      // saveToSyncStorage(store, 'show', !store.show);
    },
  }
});
</script>

<style scoped>
@import "../style/main.css";

html {
  scrollbar-face-color: #646464;
  scrollbar-base-color: #646464;
  scrollbar-3dlight-color: #646464;
  scrollbar-highlight-color: #646464;
  scrollbar-track-color: #000;
  scrollbar-arrow-color: #000;
  scrollbar-shadow-color: #646464;
  scrollbar-dark-shadow-color: #646464;
}

::-webkit-scrollbar {
  width: 8px;
  height: 3px;
}

::-webkit-scrollbar-button {
  background-color: #666;
}

::-webkit-scrollbar-track {
  background-color: #646464;
}

::-webkit-scrollbar-track-piece {
  background-color: #000;
}

::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #666;
  border-radius: 3px;
}

::-webkit-scrollbar-corner {
  background-color: #646464;
}

::-webkit-resizer {
  background-color: #666;
}

.translate-x-0 {
  transform: translateX(0);
}

.translate-x-full {
  transform: translateX(100%);
}

.duration-300 {
  animation-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.popup-container,
.popup-button {
  z-index: 99999;
}
</style>
