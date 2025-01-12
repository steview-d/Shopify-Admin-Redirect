var s = document.createElement('script');
s.src = chrome.runtime.getURL('url_builder.js');
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchAdminUrl') {
    const adminUrl = document.querySelector('admin-url')
      ? document.querySelector('admin-url').textContent
      : null;

    sendResponse({
      admin_url: adminUrl
    });

    return true;
  }

  if (message.action === 'fetchThemeSettingsUrl') {
    const themeSettingsUrl = document.querySelector('theme-settings-url')
      ? document.querySelector('theme-settings-url').textContent
      : null;

    sendResponse({
      theme_settings_url: themeSettingsUrl
    });

    return true;
  }
});
