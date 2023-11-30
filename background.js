chrome.action.onClicked.addListener(tab => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'fetchAdminUrl' }, function (r) {
      if (r.admin_url) chrome.tabs.create({ url: `https://${r.admin_url}` });
    });
  }
});
