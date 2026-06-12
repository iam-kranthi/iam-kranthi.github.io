const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(item => revealObserver.observe(item));

const glowItems = document.querySelectorAll(
  ".btn, .project-card, .studio-card, .stack-card, .architecture-chapter, .timeline-card, .contact-actions, .contact-card, .social-row a, .model-card, .about-card, .quote-card, .beyond-card"
);

glowItems.forEach(item => {
  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--x", `${e.clientX - rect.left}px`);
    item.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

const tiltCard = document.querySelector(".tilt-card");

if (tiltCard) {
  tiltCard.addEventListener("mousemove", e => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;

    /* No translateY here: this prevents the mouse-over upward jump. */
    tiltCard.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const updateHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  siteHeader.addEventListener("pointermove", event => {
    const rect = siteHeader.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    siteHeader.style.setProperty("--header-x", `${x}%`);
    siteHeader.style.setProperty("--header-y", `${y}%`);
  });

  siteHeader.addEventListener("pointerleave", () => {
    siteHeader.style.setProperty("--header-x", "50%");
    siteHeader.style.setProperty("--header-y", "50%");
  });
}

const sectionLinks = [...document.querySelectorAll(".site-header nav a[href^='#']")];
const linkedSections = sectionLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sectionLinks.length && linkedSections.length) {
  const setCurrentLink = id => {
    sectionLinks.forEach(link => {
      const isCurrent = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("nav-current", isCurrent);

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const initialSection = window.location.hash.slice(1);

  if (initialSection && linkedSections.some(section => section.id === initialSection)) {
    setCurrentLink(initialSection);
  }

  sectionLinks.forEach(link => {
    link.addEventListener("click", () => {
      setCurrentLink(link.getAttribute("href").slice(1));
    });
  });

  const sectionObserver = new IntersectionObserver(
    entries => {
      const visibleSection = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleSection) setCurrentLink(visibleSection.target.id);
    },
    {
      rootMargin: "-28% 0px -58% 0px",
      threshold: [0, 0.15, 0.35]
    }
  );

  linkedSections.forEach(section => sectionObserver.observe(section));
}
