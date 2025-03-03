
// Firefox does not support passing proxies through extension messaging API
// @ts-ignore
export function proxyToPlainObject(proxy: T): T {
    if (typeof proxy !== 'object') {
        return proxy;
    }
    
    // @ts-ignore
  const obj: T = {};
  for (const key of Object.keys(proxy)) {
    obj[key] = proxyToPlainObject(proxy[key]);
  }
  return obj;
}