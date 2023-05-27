chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: { regexSubstitution: 'https://gcore.com/\\1&astx2-emulator' }
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
          redirect: { regexSubstitution: 'https://gcore.com/\\1&astx2-emulator' }
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
          redirect: { regexSubstitution: 'https://gcore.com/\\1&ipinside-emulator' }
        },
        condition: {
          regexFilter: 'https://127.0.0.1:21300/(.*)',
          resourceTypes: ["script", "xmlhttprequest"]
        }
      },
      {
        id: 4,
        priority: 4, 
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            { header: "Host", operation: "set", value: "astx2-emulator.gcore.appie.dev" }
          ]
        },
        condition: {
          regexFilter: "https://gcore.com/(.*)&astx2-emulator",
          resourceTypes: ["script", "xmlhttprequest"]
        }
      },
      {
        id: 5,
        priority: 5,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            { header: "Host", operation: "set", value: "ipinside-emulator.gcore.appie.dev" },
            { header: "Test", operation: "set", value: "test" }
          ]
        },
        condition: {
          regexFilter: "https://gcore.com/(.*)&ipinside-emulator",
          resourceTypes: ["script", "xmlhttprequest"]
        }
      }
    ],
    removeRuleIds: [1,2,3,4,5]
  })
})

