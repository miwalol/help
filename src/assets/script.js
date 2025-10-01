function parseLocaleFromPath(path) {
  const match = path.match(/^\/(\w{2})\//);
  return match ? match[1] : '';
}

const preferredLanguage = localStorage.getItem('preferredLanguage');
const currentLocale = parseLocaleFromPath(window.location.pathname);
if (preferredLanguage && currentLocale !== preferredLanguage) {
  if (preferredLanguage === 'root' && currentLocale === '') {
    // Already on root, no need to redirect
  } else {
    const newPath = window.location.pathname.startsWith(`/${currentLocale}/`)
      ? window.location.pathname.replace(`/${currentLocale}/`, `/${preferredLanguage}/`)
      : `/${preferredLanguage}/` + (window.location.pathname === '/' ? '' : window.location.pathname.slice(1));
    localStorage.setItem('preferredLanguage', parseLocaleFromPath(newPath) || 'root');
    window.location.pathname = newPath.replace('/root/', '/');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for Starlight to initialize
  const languagePicker = document.querySelector('starlight-lang-select > label > select');

  if (languagePicker) {
    languagePicker.addEventListener('change', (e) => {
      e.preventDefault();
      localStorage.setItem('preferredLanguage', parseLocaleFromPath(e.target.value) || 'root');
      window.location.pathname = e.target.value;
    });
  }
  if (!preferredLanguage) {
    const locales = languagePicker ? Array.from(languagePicker.options).map(opt => parseLocaleFromPath(opt.value) || 'root') : [];
    if (locales.includes(navigator.language.slice(0, 2))) {
      localStorage.setItem('preferredLanguage', navigator.language.slice(0, 2));
      const newPath = window.location.pathname.startsWith(`/${currentLocale}/`)
        ? window.location.pathname.replace(`/${currentLocale}/`, `/${navigator.language.slice(0, 2)}/`)
        : `/${navigator.language.slice(0, 2)}/` + (window.location.pathname === '/' ? '' : window.location.pathname.slice(1));
      window.location.pathname = newPath.replace('/root/', '/');
    }
  }
});