const _SafeTransactionNOSVKeypadPatchInitializer = () => {
  const callback = async (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes" && mutation.attributeName == "class" && mutation.target.classList.contains("nppfs-npv")) {
        const { target } = mutation
        window.npVCtrl.hideAll()
        target.classList.remove("nppfs-npv")
        const newTarget = target.cloneNode(true)
        target.parentNode.replaceChild(newTarget, target);

        const encryptedInput = document.getElementsByName(`__KI_${target.name}`)[0]
        const makeKI = await fetch("https://127.0.0.1:14440/_/makeKI", { method: "POST", body: encryptedInput.value })
        const response = await makeKI.text()
        const splitResponse = response.split("|")
        encryptedInput.value = splitResponse[0]
        newTarget.removeAttribute("readonly")
        newTarget.setAttribute("x-safetransaction-kh", splitResponse[1])
        newTarget.addEventListener("blur", onblurCallback)
        console.log("[SafeTransaction] NOS Virtual Keypad Replaced", newTarget)
      }
    }
  }
  const observer = new MutationObserver(callback);
  observer.observe(document, { attributes: true, childList: true, subtree: true });

  const onblurCallback = async e => {
    const { target } = e
    const kh = target.getAttribute("x-safetransaction-kh")
    const khInput = document.getElementsByName(`__KH_${kh}`)[0]
    khInput.value = target.value
  }

  // const npkencryptInputs = document.querySelectorAll('input[npkencrypt]');
  // if(npkencryptInputs.length == 0) {
  //   const fakeNuaGetter = () => "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36"
  //   Object.defineProperty(window, "nua", { get: fakeNuaGetter });
  // }
}

const _SafeTransactionUserAgentPatcher = () => {
  let needToPatch = false
  if (window.$ASTX2) needToPatch = true
  if (needToPatch) {
    const fakePlatformGetter = () => "MacIntel"
    if (Object.defineProperty) {
      Object.defineProperty(navigator, "platform", { get: fakePlatformGetter });
      Object.defineProperty(Navigator.prototype, "platform", { get: fakePlatformGetter });
    } else if (Object.prototype.__defineGetter__) {
      navigator.__defineGetter__("platform", fakePlatformGetter);
      Navigator.prototype.__defineGetter__("platform", fakePlatformGetter);
    }
    const fakeUserAgentGetter = () => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    if (Object.defineProperty) {
      Object.defineProperty(navigator, "userAgent", { get: fakeUserAgentGetter });
      Object.defineProperty(Navigator.prototype, "userAgent", { get: fakeUserAgentGetter });
    } else if (Object.prototype.__defineGetter__) {
      navigator.__defineGetter__("userAgent", fakeUserAgentGetter);
      Navigator.prototype.__defineGetter__("userAgent", fakeUserAgentGetter);
    }
    const fakeAppVersionGetter = () => "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    if (Object.defineProperty) {
      Object.defineProperty(navigator, "appVersion", { get: fakeAppVersionGetter });
      Object.defineProperty(Navigator.prototype, "appVersion", { get: fakeAppVersionGetter });
    } else if (Object.prototype.__defineGetter__) {
      navigator.__defineGetter__("appVersion", fakeAppVersionGetter);
      Navigator.prototype.__defineGetter__("appVersion", fakeAppVersionGetter);
    }
  }
}

// _SafeTransactionNOSVKeypadPatchInitializer()
const _SafeTransactionOnWindowLoaded = () => {
  _SafeTransactionUserAgentPatcher()
}


if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(_SafeTransactionOnWindowLoaded, 1);
} else {
  document.addEventListener("DOMContentLoaded", _SafeTransactionOnWindowLoaded);
}