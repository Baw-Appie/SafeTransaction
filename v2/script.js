if(window.jQuery) jQuery(document).ready(() => {
    if(!window.$ASTX2) return
    const fakePlatformGetter = () => "Mac"
    if (Object.defineProperty) {
      Object.defineProperty(navigator, "platform", { get: fakePlatformGetter });
      Object.defineProperty(Navigator.prototype, "platform", { get: fakePlatformGetter });
    } else if (Object.prototype.__defineGetter__) {
      navigator.__defineGetter__("platform", fakePlatformGetter);
      Navigator.prototype.__defineGetter__("platform", fakePlatformGetter);
    }
})