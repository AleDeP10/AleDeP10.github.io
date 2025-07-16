const labels = {};
let currentLang = null;

export const detectLang = () => {
  const saved = localStorage.getItem("lang");
  if (saved) return saved;

  const lang = navigator.language || navigator.userLanguage || "en";
  return lang.startsWith("it") ? "it" : "en";
};

export const loadLang = async (lang) => {
  const langToLoad = lang || detectLang();
  currentLang = langToLoad;

  const langFile = `assets/i18n/${langToLoad}.json`;
  console.log(`🌐 Loading: ${langFile}`);

  const response = await fetch(langFile);
  const data = await response.json();
  Object.keys(labels).forEach((key) => delete labels[key]);
  Object.assign(labels, data);
  console.log("✅ Labels reloaded:", labels);
};

export const localize = () => {
  document.querySelectorAll("[data-label]").forEach((el) => {
    const key = el.getAttribute("data-label");
    el.textContent = labels[key] || key;
  });
};

export const getCurrentLang = () => {
  return currentLang;
};
