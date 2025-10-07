/**
 * Generates a complete accordion-style project component for the portfolio.
 *
 * @function projectTemplate
 * @param {string} projectKey - Unique identifier for the project, used to retrieve localized labels.
 * @param {string} imageSrc - Path to the main image representing the project.
 * @param {Object} links - Optional object containing external URLs:
 *   @property {string} [readme] - Link to the README file.
 *   @property {string} [repo] - Link to the GitHub repository.
 *   @property {string} [live] - Link to the live deployed version.
 * @param {string[]} technologies - Array of technology names used in the project (e.g., "Next.js", "Tailwind CSS").
 * @param {Object} labels - Localization object containing all textual content keyed by projectKey and global keys.
 *
 * @returns {HTMLElement} wrapper - A DOM element containing the full project accordion, ready to be appended to the page.
 *
 * @example
 * projectTemplate(
 *   "project5",
 *   "assets/images/todolist-fe-nextjs.png",
 *   {
 *     readme: "https://github.com/AleDeP10/TodoList/blob/main/todolist-fe-nextjs/README.md",
 *     repo: "https://github.com/AleDeP10/TodoList/tree/main/todolist-fe-nextjs/",
 *     live: "https://todolist-fe-nextjs.onrender.com/",
 *   },
 *   [
 *     "Next.js",
 *     "Tailwind CSS",
 *     "Redux Toolkit",
 *     "TanStack Query",
 *     "Lucide React",
 *     "Axios",
 *     "Nginx",
 *   ],
 *   labels
 * );
 */

export const projectTemplate = (
  projectKey,
  imageSrc,
  links = {},
  technologies = [],
  labels
) => {
  const container = document.createElement("div");
  container.className = "accordion";
  container.dataset.code = projectKey;

  // Header
  const header = document.createElement("div");
  header.className =
    "d-flex justify-content-between align-items-center accordion-header";
  header.innerHTML = `
    <h4 data-label="${projectKey}.name">${labels[projectKey + ".name"]}</h4>
    <button class="accordion-toggle" aria-expanded="false">
      <i class="bi bi-chevron-down"></i>
    </button>
  `;
  container.appendChild(header);

  // Collapsed content
  const collapsed = document.createElement("div");
  collapsed.className = "d-flex accordion-content-coll";

  const linkHTML = `
    ${
      links.readme ? `<a href="${links.readme}" target="_blank">Readme</a>` : ""
    }
    ${links.repo ? `<a href="${links.repo}" target="_blank">Repo</a>` : ""}
    ${links.live ? `<a href="${links.live}" target="_blank">Live</a>` : ""}
  `;

  const techHTML = technologies.map((t) => `<span>${t}</span>`).join("");

  collapsed.innerHTML = `
    <div class="project-mobile">
      <div class="d-flex">
        <div class="col-left">
          <img src="${imageSrc}" alt="${projectKey} thumbnail" class="thumbnail" />
        </div>
        <div class="col-right">
          <div class="d-flex flex-column gap-2">
            ${linkHTML}
          </div>
        </div>
      </div>
      <div class="description" data-label="${projectKey}.description.short">
        ${labels[projectKey + ".description.short"]}
      </div>
      <div class="d-flex flex-wrap gap-2 technologies">
        ${techHTML}
      </div>
    </div>
    <div class="project-desktop">
      <div class="col-left">
        <img src="${imageSrc}" alt="${projectKey} thumbnail" class="thumbnail" />
      </div>
      <div class="col-right">
        <div class="d-flex gap-2">
          ${linkHTML}
        </div>
        <div class="description" data-label="${projectKey}.description.short">
          ${labels[projectKey + ".description.short"]}
        </div>
        <div class="d-flex flex-wrap gap-2 technologies">
          ${techHTML}
        </div>
      </div>
    </div>
  `;
  container.appendChild(collapsed);

  // Expanded content
  const expanded = document.createElement("div");
  expanded.className =
    "d-none flex-column container accordion-content-exp project";

  // Links section
  const linkSection = document.createElement("div");
  linkSection.innerHTML = `
    ${
      links.readme
        ? `
      <div class="d-flex align-items-center">
        <span class="me-2 fw-bold" data-label="projects.readme">${labels["projects.readme"]}</span>
        <a href="${links.readme}" target="_blank">Readme</a>
      </div>`
        : ""
    }
    ${
      links.repo
        ? `
      <div class="d-flex align-items-center">
        <span class="me-2 fw-bold" data-label="projects.repo">${labels["projects.repo"]}</span>
        <a href="${links.repo}" target="_blank">Repo</a>
      </div>`
        : ""
    }
    ${
      links.live
        ? `
      <div class="d-flex align-items-center">
        <span class="me-2 fw-bold" data-label="projects.live">${labels["projects.live"]}</span>
        <a href="${links.live}" target="_blank">Live</a>
      </div>`
        : ""
    }
  `;
  expanded.appendChild(linkSection);

  // Full image
  const fullImage = document.createElement("img");
  fullImage.src = imageSrc;
  fullImage.alt = `${projectKey} full image`;
  fullImage.className = "full-image mt-2";
  expanded.appendChild(fullImage);

  // Technologies section (label fix + data-label)
  if (technologies.length) {
    const techLabelWrapper = document.createElement("div");
    techLabelWrapper.className = "mb-1";

    const techLabel = document.createElement("span");
    techLabel.className = "fw-bold d-block";
    techLabel.textContent = labels["projects.technologies"];
    techLabel.setAttribute("data-label", "projects.technologies");

    techLabelWrapper.appendChild(techLabel);
    expanded.appendChild(techLabelWrapper);

    const techList = document.createElement("div");
    techList.className = "d-flex flex-wrap gap-2 technologies mb-2";
    techList.innerHTML = technologies.map((t) => `<span>${t}</span>`).join("");
    expanded.appendChild(techList);
  }

  // Description lines
  const descriptionBlock = document.createElement("div");
  descriptionBlock.className = "text-start mb-2";
  descriptionBlock.innerHTML = `<h6 class="fw-bold" data-label="projects.description">${labels["projects.description"]}</h6>`;
  for (let i = 1; i <= 10; i++) {
    const key = `${projectKey}.description.line${i}`;
    const value = labels[key];
    if (!value) break;
    descriptionBlock.innerHTML += `<span data-label="${key}">${value}</span><br />`;
  }
  expanded.appendChild(descriptionBlock);

  // Technical notes
  const notes = [];
  for (let i = 1; i <= 10; i++) {
    const key = `${projectKey}.note${i}`;
    const value = labels[key];
    if (!value) break;
    notes.push(`<li data-label="${key}">${value}</li>`);
  }
  if (notes.length) {
    const notesBlock = document.createElement("div");
    notesBlock.className = "row mb-2";
    notesBlock.innerHTML = `
      <p class="fw-bold mb-1" data-label="projects.technicalNotes">${
        labels["projects.technicalNotes"]
      }</p>
      <ul>${notes.join("")}</ul>
    `;
    expanded.appendChild(notesBlock);
  }

  container.appendChild(expanded);

  const spacer = document.createElement("div");
  spacer.className = "spacer-vertical";

  const wrapper = document.createElement("div");
  wrapper.appendChild(spacer);
  wrapper.appendChild(container);
  return wrapper;
};
