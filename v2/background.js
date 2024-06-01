browser.webRequest.onBeforeRequest.addListener(
  details => {
    const url = new URL(details.url);
    if(url.host === "127.0.0.1:55920" || url.host === "lx.astxsvc.com:55920") return { redirectUrl: "https://astx2-emulator.appie.dev" + url.pathname + url.search };
    if(url.host === "127.0.0.1:21300") return { redirectUrl: "https://ipinside-emulator.appie.dev" + url.pathname + url.search };
    if(url.host === "127.0.0.1:14098") {
      if(url.pathname === "/TIC") return { redirectUrl: "https://gravatar.com/avatar/089df492d00b9a996cb3269557bde7ed?s=400" }
      if(url.pathname === "/") return { redirectUrl: "https://skcertservice.pages.dev/skcertservice_root" }
      return { redirectUrl: "https://astx2-emulator.appie.dev/SKCertService" + url.pathname + url.search };
    }
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
)