if(window.jQuery) jQuery(document).ready(() => {
    if(!window.$ASTX2) return
    const fakePlatformGetter = () => "MacIntel"
    if (Object.defineProperty) {
      Object.defineProperty(navigator, "platform", { get: fakePlatformGetter });
      Object.defineProperty(Navigator.prototype, "platform", { get: fakePlatformGetter });
    } else if (Object.prototype.__defineGetter__) {
      navigator.__defineGetter__("platform", fakePlatformGetter);
      Navigator.prototype.__defineGetter__("platform", fakePlatformGetter);
    }
    const fakeUserAgentGetter = () => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5163.147 Safari/537.36"
    if (Object.defineProperty) {
      Object.defineProperty(navigator, "userAgent", { get: fakeUserAgentGetter });
      Object.defineProperty(Navigator.prototype, "userAgent", { get: fakeUserAgentGetter });
    } else if (Object.prototype.__defineGetter__) {
      navigator.__defineGetter__("userAgent", fakeUserAgentGetter);
      Navigator.prototype.__defineGetter__("userAgent", fakeUserAgentGetter);
    }
    const fakeAppVersionGetter = () => "5.0 (Macintosh; Intel Mac OS X 10_10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5163.147 Safari/537.36"
    if (Object.defineProperty) {
      Object.defineProperty(navigator, "appVersion", { get: fakeAppVersionGetter });
      Object.defineProperty(Navigator.prototype, "appVersion", { get: fakeAppVersionGetter });
    } else if (Object.prototype.__defineGetter__) {
      navigator.__defineGetter__("appVersion", fakeAppVersionGetter);
      Navigator.prototype.__defineGetter__("appVersion", fakeAppVersionGetter);
    }
})