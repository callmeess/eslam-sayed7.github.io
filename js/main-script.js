// Main application JavaScript

// Article and project data
const articles = [
  {
    id: "event-loops-deep-dive",
    title:
      "Understanding Event Loops: A Deep Dive into Asynchronous Programming",
    date: "2024-03-15",
    readTime: "8 min read",
    excerpt:
      "Exploring the fundamentals of event-driven programming and how modern systems handle thousands of concurrent connections efficiently. We'll look at different implementations across languages and their trade-offs.",
    file: "articles/event-loops-deep-dive.md",
  },
  {
    id: "memory-management-systems",
    title: "Memory Management in Systems Programming",
    date: "2024-03-10",
    readTime: "12 min read",
    excerpt:
      "A comprehensive guide to memory allocation strategies, garbage collection algorithms, and manual memory management. Understanding when and how to optimize memory usage in different scenarios.",
    file: "articles/memory-management-systems.md",
  },
  {
    id: "static-site-generator",
    title: "Building a Static Site Generator from Scratch",
    date: "2024-03-05",
    readTime: "6 min read",
    excerpt:
      "Step-by-step guide to creating your own static site generator using modern tools. We'll cover templating, markdown processing, and deployment strategies for GitHub Pages.",
    file: "articles/static-site-generator.md",
  },
];

const projects = [
  {
    id: "distributed-task-queue",
    title: "Distributed Task Queue",
    description:
      "A high-performance task queue system built with Rust, featuring automatic failover, load balancing, and monitoring capabilities for processing millions of tasks per day.",
    tech: ["Rust", "Redis", "Docker", "Kubernetes"],
    github: "https://github.com/yourusername/distributed-task-queue",
    demo: null,
    file: "projects/distributed-task-queue.md",
  },
  {
    id: "http2-server",
    title: "HTTP/2 Server Implementation",
    description:
      "Custom HTTP/2 server written from scratch to understand the protocol internals, featuring multiplexing, server push, and header compression.",
    tech: ["Go", "HTTP/2", "TLS"],
    github: "https://github.com/yourusername/http2-server",
    demo: null,
    file: "projects/http2-server.md",
  },
  {
    id: "realtime-data-pipeline",
    title: "Real-time Data Pipeline",
    description:
      "Stream processing system for handling real-time analytics data with low latency requirements. Processes over 100k events per second with sub-100ms latency.",
    tech: ["Apache Kafka", "Go", "ClickHouse", "Grafana"],
    github: "https://github.com/yourusername/realtime-pipeline",
    demo: "https://demo.yourpipeline.com",
    file: "projects/realtime-data-pipeline.md",
  },
];

// Utility functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Markdown-like content parser (simple version)
function parseMarkdown(content) {
  return content
    .replace(/^# (.*$)/gm, "<h2>$1</h2>")
    .replace(/^## (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/^\> (.*$)/gm, "<blockquote>$1</blockquote>")
    .replace(/^\- (.*$)/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|p|b])(.*)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}

// Content loading functions
async function loadArticleContent(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) throw new Error("Article not found");
    const content = await response.text();
    return parseMarkdown(content);
  } catch (error) {
    return "<p>Article content could not be loaded.</p>";
  }
}

async function loadProjectContent(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) throw new Error("Project documentation not found");
    const content = await response.text();
    return parseMarkdown(content);
  } catch (error) {
    return "<p>Project documentation could not be loaded.</p>";
  }
}

// Render functions
function renderPostCard(article, showExcerpt = true) {
  return `
        <article class="post-card" onclick="window.location.href='article.html?id=${article.id}'">
            <div class="post-meta">${article.date} • ${article.readTime}</div>
            <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
            ${showExcerpt ? `<p>${article.excerpt}</p>` : ""}
            <a href="article.html?id=${article.id}" class="read-more">Read more →</a>
        </article>
    `;
}

function renderProjectCard(project, showDescription = true) {
  const techTags = project.tech
    .map((tech) => `<span class="tech-tag">${tech}</span>`)
    .join("");

  return `
        <div class="project-card" onclick="window.location.href='project.html?id=${project.id}'">
            <h3>${project.title}</h3>
            ${showDescription ? `<p>${project.description}</p>` : ""}
            <div class="project-tech">${techTags}</div>
            <a href="project.html?id=${project.id}" class="read-more">Learn more →</a>
        </div>
    `;
}

// Page-specific initialization functions
function initHomePage() {
  // Load recent posts (first 2)
  const recentPostsContainer = document.getElementById("recent-posts");
  if (recentPostsContainer) {
    const recentPosts = articles.slice(0, 2);
    recentPostsContainer.innerHTML = recentPosts
      .map((article) => renderPostCard(article, true))
      .join("");
  }

  // Load featured projects (first 2)
  const featuredProjectsContainer =
    document.getElementById("featured-projects");
  if (featuredProjectsContainer) {
    const featuredProjects = projects.slice(0, 2);
    featuredProjectsContainer.innerHTML = featuredProjects
      .map((project) => renderProjectCard(project, true))
      .join("");
  }
}

function initBlogPage() {
  const postsContainer = document.getElementById("blog-posts");
  if (postsContainer) {
    postsContainer.innerHTML = articles
      .map((article) => renderPostCard(article, true))
      .join("");
  }
}

function initProjectsPage() {
  const projectsContainer = document.getElementById("projects-grid");
  if (projectsContainer) {
    projectsContainer.innerHTML = projects
      .map((project) => renderProjectCard(project, true))
      .join("");
  }
}

async function initArticlePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  const article = articles.find((a) => a.id === articleId);
  if (!article) {
    document.querySelector(".content").innerHTML =
      '<div class="section"><h2>Article not found</h2><p>The requested article could not be found.</p></div>';
    return;
  }

  // Set page title
  document.title = `${article.title} - Your Name`;

  // Render article header
  const headerContainer = document.querySelector(".article-header");
  if (headerContainer) {
    headerContainer.innerHTML = `
            <a href="blog.html" class="back-link">← Back to Blog</a>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">${formatDate(article.date)} • ${article.readTime}</div>
        `;
  }

  // Load and render article content
  const contentContainer = document.querySelector(".article-content");
  if (contentContainer) {
    contentContainer.innerHTML =
      '<div class="loading">Loading article...</div>';
    const content = await loadArticleContent(article.file);
    contentContainer.innerHTML = content;
  }
}

async function initProjectPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    document.querySelector(".content").innerHTML =
      '<div class="section"><h2>Project not found</h2><p>The requested project could not be found.</p></div>';
    return;
  }

  // Set page title
  document.title = `${project.title} - Your Name`;

  // Render project header
  const headerContainer = document.querySelector(".project-header");
  if (headerContainer) {
    const techTags = project.tech
      .map((tech) => `<span class="tech-tag">${tech}</span>`)
      .join("");

    const links = [];
    if (project.github)
      links.push(
        `<a href="${project.github}" target="_blank" class="project-link">GitHub</a>`,
      );
    if (project.demo)
      links.push(
        `<a href="${project.demo}" target="_blank" class="project-link">Live Demo</a>`,
      );

    headerContainer.innerHTML = `
            <a href="projects.html" class="back-link">← Back to Projects</a>
            <h1 class="project-title">${project.title}</h1>
            <p style="color: #94a3b8; margin-bottom: 1rem;">${project.description}</p>
            <div class="project-tech" style="margin-bottom: 1rem;">${techTags}</div>
            <div class="project-links">${links.join("")}</div>
        `;
  }

  // Load and render project content
  const contentContainer = document.querySelector(".project-content");
  if (contentContainer) {
    contentContainer.innerHTML =
      '<div class="loading">Loading project documentation...</div>';
    const content = await loadProjectContent(project.file);
    contentContainer.innerHTML = content;
  }
}

function initCommon() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Run specific init depending on page
document.addEventListener("DOMContentLoaded", () => {
  initCommon();

  const page = document.body.dataset.page; // each HTML page will set this
  if (page === "home") initHomePage();
  if (page === "blog") initBlogPage();
  if (page === "projects") initProjectsPage();
  if (page === "article") initArticlePage();
  if (page === "project") initProjectPage();
});

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
