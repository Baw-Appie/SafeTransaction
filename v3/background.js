chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: { regexSubstitution: 'https://astx2-emulator.appie.dev/\\1' }
        },
        condition: {
          regexFilter: 'https://127.0.0.1:55920/(.*)',
          resourceTypes: ["script", "xmlhttprequest"]
        }
      },
      {
        id: 2,
        priority: 2,
        action: {
          type: 'redirect',
          redirect: { regexSubstitution: 'https://astx2-emulator.appie.dev/\\1' }
        },
        condition: {
          regexFilter: 'https://lx.astxsvc.com:55920/(.*)',
          resourceTypes: ["script", "xmlhttprequest"]
        }
      },
      {
        id: 3,
        priority: 3,
        action: {
          type: 'redirect',
          redirect: { regexSubstitution: 'https://ipinside-emulator.appie.dev/\\1' }
        },
        condition: {
          regexFilter: 'https://127.0.0.1:21300/(.*)',
          resourceTypes: ["script", "xmlhttprequest"]
        }
      },
    ],
    removeRuleIds: [1,2,3]
  })
})

