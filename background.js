//* handle extension icon click
chrome.action.onClicked.addListener(tab => {
  if (tab.id) {
    sendFetchAdminUrl(tab);
  }
});

//* add right click menu options
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openAdmin',
    title: 'Open Shopify Admin',
    contexts: ['action'],
  });
  chrome.contextMenus.create({
    id: 'openThemeSettings',
    title: 'Open Theme Settings',
    contexts: ['action'],
  });
});

//* handle right click menu options
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openAdmin') {
    sendFetchAdminUrl(tab);
  }
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openThemeSettings') {
    if (tab.id) {
      chrome.tabs.sendMessage(
        tab.id,
        { action: 'fetchThemeSettingsUrl' },
        function (r) {
          if (r.theme_settings_url)
            chrome.tabs.create({ url: `https://${r.theme_settings_url}` });
        }
      );
    }
  }
});

//* helper functions
const sendFetchAdminUrl = tab => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'fetchAdminUrl' }, function (r) {
      if (r.admin_url) chrome.tabs.create({ url: `https://${r.admin_url}` });
    });
  }
};
