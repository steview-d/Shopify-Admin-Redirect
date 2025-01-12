const paths = [
  '/products/',
  '/collections/',
  '/pages/',
  '/blogs/',
  '/policies/',
];
const isMatch = paths.some(path => window.location.pathname.includes(path));

if (isMatch && window.Shopify) {
  let adminUrlElement = document.createElement('admin-url');
  window.location.pathname.includes('/policies/')
    ? (adminUrlElement.textContent = `${window.Shopify.shop}/admin/settings/legal`)
    : (adminUrlElement.textContent = `${window.Shopify.shop}/admin/${meta.page.pageType}s/${meta.page.resourceId}`);
  document.head.appendChild(adminUrlElement);

  let themeSettingsUrlElement = document.createElement('theme-settings-url');
  const shopName = window.Shopify.shop.split('.')[0];
  const escapedUrl = encodeURIComponent(new URL(window.location.href).pathname)

  if (!window.location.pathname.includes('/policies/')) {
    themeSettingsUrlElement.textContent = `admin.shopify.com/store/${shopName}/themes/${window.Shopify.theme.id}/editor?previewPath=${escapedUrl}`;
    document.head.appendChild(themeSettingsUrlElement);
  }
}
