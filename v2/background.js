const astx2Requests = new Set()
const ipinsideRequests = new Set()

browser.webRequest.onBeforeRequest.addListener(
  details => {
    const url = new URL(details.url);
    const { requestId } = details
    if(url.host === "127.0.0.1:55920" || url.host === "lx.astxsvc.com:55920") {
      astx2Requests.add(url.pathname + url.search)
      return { redirectUrl: "https://gcore.com" + url.pathname + url.search };
    }
    if(url.host === "127.0.0.1:21300") {
      ipinsideRequests.add(url.pathname + url.search)
      return { redirectUrl: "https://gcore.com" + url.pathname + url.search };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
)


browser.webRequest.onBeforeSendHeaders.addListener(
  details => { 
    const url = new URL(details.url);
    let { requestHeaders, requestId } = details
    if(url.host !== "gcore.com") return
    if(!astx2Requests.has(url.pathname + url.search) && !ipinsideRequests.has(url.pathname + url.search)) return
    requestHeaders = requestHeaders.map((header) => {
      if (header.name === 'Host') {
        return { name: header.name, value: astx2Requests.has(url.pathname + url.search) ? "astx2-emulator.gcore.appie.dev" : "ipinside-emulator.gcore.appie.dev" };
      }
      return header;
    });
    
    return { requestHeaders }
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking", "requestHeaders"]
)
