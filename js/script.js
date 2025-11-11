// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Add scroll effect to header
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    header.style.background = "rgba(15, 23, 42, 0.95)";
  } else {
    header.style.background = "rgba(15, 23, 42, 0.9)";
  }

  lastScrollTop = scrollTop;
});

// Add some interactivity to cards
document.querySelectorAll(".post-card, .project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.borderColor = "#475569";
  });

  card.addEventListener("mouseleave", function () {
    this.style.borderColor = "#334155";
  });
});
document.querySelectorAll(".slider-container").forEach((container) => {
  const track = container.querySelector(".slider-track");
  const leftBtn = container.querySelector(".slider-btn.left");
  const rightBtn = container.querySelector(".slider-btn.right");
  const cardWidth = track.children[0]?.offsetWidth || 300; // fallback width

  leftBtn.addEventListener("click", () => {
    track.scrollBy({ left: -cardWidth - 32, behavior: "smooth" }); // 32px for gap
  });

  rightBtn.addEventListener("click", () => {
    track.scrollBy({ left: cardWidth + 32, behavior: "smooth" });
  });
});
