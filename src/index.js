import { loadLang, localize, detectLang } from "./i18n.js";

var currentLang = detectLang();

// Load the localizations
loadLang(currentLang).then(() => {
  localize();
  preactivateLang();
});

// Control the language buttons activation
function activateLang(selectedBtn) {
  // Remove the 'active' class from all buttons in the language selector
  document.querySelectorAll('[aria-label="Language"] .btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  // Add the 'active' class to the clicked button
  selectedBtn.classList.add('active');

  // Save the selected language to localStorage for future reloads
  const langCode = selectedBtn.textContent.trim().toLowerCase();
  localStorage.setItem('lang', langCode);
}

const preactivateLang = () => {
  const currentLang = detectLang();
  const btnToActivate = document.querySelector(`[aria-label="Language"] .btn[data-lang="${currentLang}"]`);
  if (btnToActivate) {
    btnToActivate.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');
  let activeCode = null;

  accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    const contentColl = accordion.querySelector('.accordion-content-coll');
    const contentExp = accordion.querySelector('.accordion-content-exp');
    const code = accordion.dataset.code;
    const toggleButton = accordion.querySelector('.accordion-toggle');

    header.addEventListener('click', () => {
      // Collapse all other accordions
      accordions.forEach(other => {
        const otherColl = other.querySelector('.accordion-content-coll');
        const otherExp = other.querySelector('.accordion-content-exp');
        const otherToggle = other.querySelector('.accordion-toggle');
        if (other !== accordion) {
          otherColl?.classList.remove('d-none');
          otherExp?.classList.add('d-none');
          otherToggle.setAttribute('aria-expanded', 'false');
          otherToggle.textContent = '🔽';
        }
      });

      // Toggle current accordion
      const isExpanded = activeCode === code;

      if (isExpanded) {
        contentColl?.classList.remove('d-none');
        contentExp?.classList.add('d-none');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.textContent = '🔽';
        activeCode = null;
      } else {
        contentColl?.classList.add('d-none');
        contentExp?.classList.remove('d-none');
        toggleButton.setAttribute('aria-expanded', 'true');
        toggleButton.textContent = '🔼';
        activeCode = code;
      }
    });
  });
});


// Expose methods to the HTML
window.detectLang = detectLang;
window.localize = localize;
window.loadLang = loadLang;
window.activateLang = activateLang;