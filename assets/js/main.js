const copyButton = document.getElementById("copyBibtex");
const copyStatus = document.getElementById("copyStatus");
const bibtex = document.getElementById("bibtex");

if (copyButton && copyStatus && bibtex) {
  copyButton.addEventListener("click", async () => {
    const text = bibtex.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = "BibTeX copied.";
    } catch {
      copyStatus.textContent = "Copy failed. Select the BibTeX block manually.";
    }
  });
}

const links = Array.from(document.querySelectorAll(".nav-links a"));
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
