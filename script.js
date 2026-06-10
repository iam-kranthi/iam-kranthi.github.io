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
