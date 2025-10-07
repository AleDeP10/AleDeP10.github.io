/**
 * 📦 Portfolio Initialization Script
 *
 * This module initializes the interactive portfolio section of the site.
 * It handles:
 * - Language detection and localization
 * - Dynamic loading of project components
 * - Accordion behavior for expanding/collapsing project details
 * - Language button activation and persistence
 *
 * Dependencies:
 * - i18n.js: for language loading and localization
 * - projectTemplate.js: for generating project DOM elements
 *
 * Usage:
 * - Automatically runs on DOMContentLoaded
 * - Exposes language methods to the global window for manual switching
 */

 // Import localization utilities and project template generator
import { loadLang, localize, detectLang, labels } from "./i18n.js";
import { projectTemplate } from "./projectTemplate.js";

 // Pre-activates the language button based on detected language
const preactivateLang = () => {
  // Detect current language
  const currentLang = detectLang();

  // Find the matching language button
  const btnToActivate = document.querySelector(
    `[aria-label="Language"] .btn[data-lang="${currentLang}"]`
  );

  // Add 'active' class to highlight the selected language
  if (btnToActivate) {
    btnToActivate.classList.add("active");
  }
};

 // Activates a language button and stores the selection
function activateLang(selectedBtn) {
  // Remove 'active' class from all language buttons
  document.querySelectorAll('[aria-label="Language"] .btn').forEach((btn) => {
    btn.classList.remove("active");
  });

  // Add 'active' class to the selected button
  selectedBtn.classList.add("active");

  // Extract language code and store in localStorage
  const langCode = selectedBtn.textContent.trim().toLowerCase();
  localStorage.setItem("lang", langCode);
}

 // Initializes the portfolio section with projects and accordion behavior
const initPortfolio = async () => {
  // Detect and load current language
  const currentLang = detectLang();
  await loadLang(currentLang);

  // Apply translations to DOM
  localize();

  // Highlight the active language button
  preactivateLang();

  // Define all project entries
  const projects = [
    projectTemplate(
      "project1",
      "assets/images/architecture.png",
      {
        readme: "https://github.com/AleDeP10/TodoList/tree/main/README.md",
        repo: "https://github.com/AleDeP10/TodoList/tree/main/",
      },
      ["Docker", "Render.com"],
      labels
    ),
    projectTemplate(
      "project2",
      "assets/images/todolist-ERD.png",
      {
        readme:
          "https://github.com/AleDeP10/TodoList/blob/main/db-backup/README.md",
        repo: "https://github.com/AleDeP10/TodoList/tree/main/db-backup/",
      },
      ["PostgreSQL", "Supabase.com"],
      labels
    ),
    projectTemplate(
      "project3",
      "assets/images/todolist-ui-kit.png",
      {
        readme:
          "https://github.com/AleDeP10/TodoList/blob/main/todolist-ui-kit/README.md",
        repo: "https://github.com/AleDeP10/TodoList/tree/main/todolist-ui-kit/",
      },
      ["TypeScript", "React", "Tailwind CSS"],
      labels
    ),
    projectTemplate(
      "project4",
      "assets/images/todolist-storybook.png",
      {
        readme:
          "https://github.com/AleDeP10/TodoList/blob/main/todolist-storybook/README.md",
        repo: "https://github.com/AleDeP10/TodoList/tree/main/todolist-storybook/",
        live: "https://todolist-storybook.onrender.com/",
      },
      ["TypeScript", "Storybook", "React", "Tailwind CSS", "Express"],
      labels
    ),
    projectTemplate(
      "project5",
      "assets/images/todolist-fe-nextjs.png",
      {
        readme:
          "https://github.com/AleDeP10/TodoList/blob/main/todolist-fe-nextjs/README.md",
        repo: "https://github.com/AleDeP10/TodoList/tree/main/todolist-fe-nextjs/",
        live: "https://todolist-fe-nextjs.onrender.com/",
      },
      [
        "Next.js",
        "Tailwind CSS",
        "Redux Toolkit",
        "TanStack Query",
        "Lucide React",
        "Axios",
        "Nginx",
      ],
      labels
    ),
    projectTemplate(
      "project6",
      "/assets/images/todolist-fe-angularjs.png",
      {
        readme:
          "https://github.com/AleDeP10/TodoList/tree/main/frontend-angularjs/README.md",
        repo: "https://github.com/AleDeP10/TodoList/tree/main/frontend-angularjs",
        live: "https://todolist-fe-angularjs.onrender.com/",
      },
      ["AngularJS", "Bootstrap", "Redux-classic", "Scss", "Nginx"],
      labels
    ),
    projectTemplate(
      "project7",
      "/assets/images/todolist-be-csharp.png",
      {
        readme:
          "https://github.com/AleDeP10/TodoList/tree/main/backend-csharp/README.md",
        repo: "https://github.com/AleDeP10/TodoList/tree/main/backend-csharp",
        live: "https://todolist-be-csharp.onrender.com/",
      },
      ["ASP.NET", "C#", "Entity Framework", "Swagger"],
      labels
    ),
    projectTemplate(
      "project8",
      "assets/images/portfolio.png",
      {
        readme: "https://github.com/AleDeP10/AleDeP10.github.io/README.md",
        repo: "https://github.com/AleDeP10/AleDeP10.github.io",
      },
      ["HTML", "Bootstrap", "SCSS", "vanilla-js"],
      labels
    ),
  ];

  // Append each project to the portfolio section
  projects.forEach((project) =>
    document.getElementById("portfolio-section").appendChild(project)
  );

  // Select all accordion components
  const accordions = document.querySelectorAll(".accordion");
  let activeCode = null;

  // Add click behavior to each accordion header
  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");
    const contentColl = accordion.querySelector(".accordion-content-coll");
    const contentExp = accordion.querySelector(".accordion-content-exp");
    const code = accordion.dataset.code;
    const toggleButton = accordion.querySelector(".accordion-toggle");
    const toggleIcon = toggleButton.querySelector("i");

    // Toggle accordion on header click
    header.addEventListener("click", () => {
      // Collapse all other accordions
      accordions.forEach((other) => {
        const otherColl = other.querySelector(".accordion-content-coll");
        const otherExp = other.querySelector(".accordion-content-exp");
        const otherToggle = other.querySelector(".accordion-toggle");
        const otherIcon = otherToggle.querySelector("i");
        if (other !== accordion) {
          otherColl?.classList.remove("d-none");
          otherExp?.classList.add("d-none");
          otherToggle.setAttribute("aria-expanded", "false");
          otherIcon?.classList.remove("bi-chevron-up");
          otherIcon?.classList.add("bi-chevron-down");
        }
      });

      // Toggle current accordion
      const isExpanded = activeCode === code;

      if (isExpanded) {
        contentColl?.classList.remove("d-none");
        contentExp?.classList.add("d-none");
        toggleButton.setAttribute("aria-expanded", "false");
        toggleIcon?.classList.remove("bi-chevron-up");
        toggleIcon?.classList.add("bi-chevron-down");
        activeCode = null;
      } else {
        contentColl?.classList.add("d-none");
        contentExp?.classList.remove("d-none");
        toggleButton.setAttribute("aria-expanded", "true");
        toggleIcon?.classList.remove("bi-chevron-down");
        toggleIcon?.classList.add("bi-chevron-up");
        activeCode = code;
      }
    });
  });
};

 // Run portfolio initialization when DOM is ready
document.addEventListener("DOMContentLoaded", initPortfolio);

 // Expose language methods to global scope for manual switching
window.detectLang = detectLang;
window.localize = localize;
window.loadLang = loadLang;
window.activateLang = activateLang;
