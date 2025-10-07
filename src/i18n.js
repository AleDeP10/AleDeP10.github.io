/**
 * 🌐 Language Localization Module
 *
 * Handles dynamic language detection, loading, and DOM localization
 * for the portfolio interface. Supports switching between Italian and English
 * using external JSON files and updates all elements marked with `data-label`.
 *
 * Functions:
 * - detectLang(): returns preferred language from localStorage or browser
 * - loadLang(lang): loads JSON file and populates `labels`
 * - localize(): updates DOM elements with translated text
 * - getCurrentLang(): returns the active language code
 *
 * Example usage:
 *   await loadLang("it");
 *   localize();
 */

 // Stores the active set of localized strings
export const labels = {};

 // Tracks the currently loaded language code
let currentLang = null;

 // Detects the preferred language from localStorage or browser settings
export const detectLang = () => {
  // Check if user has manually selected a language
  const saved = localStorage.getItem("lang");
  if (saved) return saved;

  // Fallback to browser language
  const lang = navigator.language || navigator.userLanguage || "en";

  // Default to 'it' if Italian, otherwise 'en'
  return lang.startsWith("it") ? "it" : "en";
};

 // Loads the language file and updates the labels object
export const loadLang = async (lang) => {
  // Use provided language or detect automatically
  const langToLoad = lang || detectLang();
  currentLang = langToLoad;

  // Construct the path to the language file
  const langFile = `assets/i18n/${langToLoad}.json`;
  console.log(`🌐 Loading: ${langFile}`);

  // Fetch and parse the JSON file
  const response = await fetch(langFile);
  const data = await response.json();

  // Clear existing labels
  Object.keys(labels).forEach((key) => delete labels[key]);

  // Populate labels with new translations
  Object.assign(labels, data);
  console.log("✅ Labels reloaded:", labels);
};

 // Updates all DOM elements with translated text based on data-label attributes
export const localize = () => {
  // Select all elements with data-label and update their text
  document.querySelectorAll("[data-label]").forEach((el) => {
    const key = el.getAttribute("data-label");
    el.textContent = labels[key] || key;
  });
};

 // Returns the currently active language code
export const getCurrentLang = () => {
  return currentLang;
};
