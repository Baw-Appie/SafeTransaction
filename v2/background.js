browser.webRequest.onBeforeRequest.addListener(
  details => {
    const url = new URL(details.url);
    if(url.host === "127.0.0.1:55920" || url.host === "lx.astxsvc.com:55920") return { redirectUrl: "https://astx2-emulator.appie.dev" + url.pathname + url.search };
    if(url.host === "127.0.0.1:21300") return { redirectUrl: "https://ipinside-emulator.appie.dev" + url.pathname + url.search };
    if(url.host === "127.0.0.1:14440") return { redirectUrl: "https://nos-emulator.appie.dev" + url.pathname + url.search };
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
)