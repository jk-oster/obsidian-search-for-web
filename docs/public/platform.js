

const navigatorErrorMessage = 'Could not find `userAgent` or `userAgentData` window.navigator properties to set `os`, `browser` and `version`'
const removeExcessMozillaAndVersion = /^mozilla\/\d\.\d\W/
const browserPattern = /(\w+)\/(\d+\.\d+(?:\.\d+)?(?:\.\d+)?)/g
const engineAndVersionPattern = /^(ver|cri|gec)/
const brandList = ['chrome', 'opera', 'safari', 'edge', 'firefox']
const unknown = 'Unknown'
const empty = ''
const { isArray } = Array
// @ts-ignore
let userAgentData = window.navigator.userAgentData
let userAgent = window.navigator.userAgent

const mobiles = {
  iphone: /iphone/,
  ipad: /ipad|macintosh/,
  android: /android/
}

const desktops = {
  windows: /win/,
  mac: /macintosh/,
  linux: /linux/
}

/**
 * @author julienetie
 * @description Detects the platform, browser and version of the user's device.
 * @see https://github.com/julienetie/detect-browser/blob/main/detect-browser.js
 * @license MIT (https://github.com/julienetie/detect-browser/blob/main/LICENSE)
 */
export function usePlatform(customUserAgent = null, customUserAgentData = null) {
  // Use a provided UA string instead of the browser's UA  
  userAgent = typeof customUserAgent === 'string' ? customUserAgent : userAgent

  // Use a provided UA data string instead of the browser's UA data 
  userAgentData = typeof customUserAgentData === 'string' ? customUserAgentData : userAgentData

  if (userAgent) {
    const ua = userAgent.toLowerCase().replace(removeExcessMozillaAndVersion, empty)

    // Determine the operating system.
    // @ts-ignore
    const mobileOS = Object.keys(mobiles).find(os => mobiles[os].test(ua) && window.navigator.maxTouchPoints >= 1)
    // @ts-ignore
    const desktopOS = Object.keys(desktops).find(os => desktops[os].test(ua))
    const os = mobileOS || desktopOS

    // Extract browser and version information.
    const browserTest = ua.match(browserPattern)
    const versionRegex = /version\/(\d+(\.\d+)*)/
    const safariVersion = ua.match(versionRegex)
    const saVersion = isArray(safariVersion) ? safariVersion[1] : null
    const browserOffset = browserTest && (browserTest.length > 2 && !(engineAndVersionPattern.test(browserTest[1])) ? 1 : 0)
    const browserResult = browserTest && browserTest[browserTest.length - 1 - (browserOffset || 0)].split('/')
    let browser = browserResult && browserResult[0]
    let version = saVersion ? saVersion : browserResult && browserResult[1]

    // Check specifically for Edge
    if (ua.includes('edg/')) {
      const edgeMatch = ua.match(/edg\/(\d+\.\d+)/);
      browser = 'edge';
      version = edgeMatch && edgeMatch[1];
    }

    return { os, browser, version }
  } else if (userAgentData) {
    const os = userAgentData.platform.toLowerCase()
    let platformData

    // Extract platform brand and version information.
    for (const agentBrand of userAgentData.brands) {
      const agentBrandEntry = agentBrand.brand.toLowerCase()
      const foundBrand = brandList.find(brand => { //eslint-disable-line
        if (agentBrandEntry.includes(brand)) {
          return brand
        }
      })
      if (foundBrand) {
        platformData = { browser: foundBrand, version: agentBrand.version }
        break
      }
    }
    const brandVersionData = platformData || { browser: unknown, version: unknown }
    return { os, ...brandVersionData }
  } else {
    // Log error message if there's a problem.
    console
      .error(navigatorErrorMessage)

    return {
      // Ignore the VSCode strikethrough. Disable linting line if necessary. This is just a fallback
      os: navigator.platform || unknown,
      browser: unknown,
      version: unknown
    }
  }
}
