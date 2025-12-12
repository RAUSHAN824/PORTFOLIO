/* script.js - Portfolio interactivity (projects list, modal, contact) */

const PROJECTS = [
  {
    id: "proj1",
    title: "Product Catalog (Demo)",
    desc: "Responsive product catalog built with Bootstrap, vanilla JS. Features search, filters and cart.",
    img: "https://via.placeholder.com/640x420?text=Product+Catalog",
    tech: "HTML, CSS, Bootstrap, JS",
    live: "#",
    code: "#"
  },
  {
    id: "proj2",
    title: "Personal Blog UI",
    desc: "A clean blog UI template with typographic focus and responsive cards.",
    img: "https://via.placeholder.com/640x420?text=Blog+UI",
    tech: "HTML, CSS",
    live: "#",
    code: "#"
  },
  {
    id: "proj3",
    title: "Dashboard Prototype",
    desc: "Admin dashboard mock with charts and tables (static data).",
    img: "https://via.placeholder.com/640x420?text=Dashboard",
    tech: "Bootstrap, Charts",
    live: "#",
    code: "#"
  }
];

// helpers
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

// render projects
function renderProjects(filter = "all") {
  const grid = qs("#projectsGrid");
  grid.innerHTML = "";
  const items = PROJECTS.filter(p => filter === "all" ? true : p.title.toLowerCase().includes(filter));
  if (!items.length) {
    grid.innerHTML = <div class="col-12"><div class="alert alert-info">No projects to show.</div></div>;
    return;
  }
  items.forEach(p => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card h-100">
        <div class="proj-thumb">
          <img src="${p.img}" alt="${p.title}">
        </div>
        <div class="card-body d-flex flex-column">
          <h6 class="mb-1">${p.title}</h6>
          <p class="small-muted mb-3">${p.desc}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-sm btn-primary view-btn" data-id="${p.id}">View</button>
            <a class="btn btn-sm btn-outline-secondary" href="${p.live}" target="_blank">Live</a>
            <a class="btn btn-sm btn-outline-secondary" href="${p.code}" target="_blank">Code</a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });

  // attach listeners
  qsa(".view-btn").forEach(b => b.addEventListener("click", () => openProjectModal(b.dataset.id)));
}

// project modal
function openProjectModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if(!p) return;
  qs("#projModalLabel").textContent = p.title;
  qs("#projModalImg").src = p.img;
  qs("#projModalTitle").textContent = p.title;
  qs("#projModalDesc").textContent = p.desc;
  qs("#projModalTech").textContent = p.tech;
  qs("#projLive").href = p.live;
  qs("#projCode").href = p.code;
  const modal = new bootstrap.Modal(qs("#projModal"));
  modal.show();
}

// contact form (demo)
function handleContact() {
  const name = qs("#name").value.trim();
  const email = qs("#email").value.trim();
  const message = qs("#message").value.trim();
  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }
  // simple validation ok — demo success
 function handleContact() {
  const name = qs("#name").value.trim();
  const email = qs("#email").value.trim();
  const message = qs("#message").value.trim();
  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }
  // Demo success using template literal (backticks)
  alert(Thanks ${name}! I received your message.);
  qs("#contactForm").reset();
}

}

// simple filters
function initFilters() {
  qs("#filterAll").addEventListener("click", () => renderProjects("all"));
  qs("#filterWeb").addEventListener("click", () => renderProjects("web"));
  qs("#filterUi").addEventListener("click", () => renderProjects("ui"));
}

// init
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initFilters();
  qs("#sendBtn").addEventListener("click", handleContact);

  // smooth scroll for nav links
  document.querySelectorAll('a.nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        // collapse navbar on mobile
        const nav = document.querySelector('.navbar-collapse');
        if (nav.classList.contains('show')) {
          new bootstrap.Collapse(nav).hide();
        }
      }
    });
  });
});