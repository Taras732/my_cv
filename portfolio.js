/* ============================================================
   NAV — scroll shrink + mobile menu
   ============================================================ */
const nav      = document.getElementById('nav');
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

burger.addEventListener('click', () => navLinks.classList.toggle('is-open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

/* ============================================================
   LANGUAGE SWITCH
   ============================================================ */
let currentLang = localStorage.getItem('cv-lang') || 'en';
const langBtn   = document.getElementById('langBtn');

function setLang(lang) {
  currentLang = lang;
  langBtn.textContent = lang === 'en' ? 'UA' : 'EN';
  document.querySelectorAll('.i18n').forEach(el => {
    const text = el.dataset[lang];
    if (text !== undefined) el.innerHTML = text;
  });
  localStorage.setItem('cv-lang', lang);
}

langBtn.addEventListener('click', () => setLang(currentLang === 'en' ? 'uk' : 'en'));
if (currentLang !== 'en') setLang(currentLang);

/* ============================================================
   FADE-UP — Intersection Observer
   ============================================================ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

/* ============================================================
   ARTIFACTS DATA
   ============================================================ */
const artifacts = [
  {
    id: 1,
    category: 'Business Analysis',
    tag: 'BA',
    color: '#6366f1',
    title: 'User Stories з Acceptance Criteria',
    desc: 'Feature: онбординг водія у логістичній платформі. 12 stories з Gherkin AC, Definition of Done, edge cases.',
    domain: '🚛 Logistics SaaS',
    format: 'PDF',
    pages: '3 стор.',
    preview: `AS A: logistics dispatcher
I WANT TO: add a new driver profile
SO THAT: I can assign routes without manual data entry

Acceptance Criteria:
──────────────────────────────────────────
Given I am on the Drivers page
When I click "Add Driver" and fill required fields
  [name, phone, license_id, vehicle_type]
Then the driver appears in the active list
  And I receive a confirmation notification
  And the driver status is set to "Pending Verification"

Given the driver's license_id already exists
When I submit the form
Then the system shows error:
  "Driver with this license already registered"
  And the form remains open with data preserved

──── Edge Cases ────────────────────────
• Phone validation: UA format +380XXXXXXXXX
• License expiry warning if < 30 days
• Duplicate check: license_id + country code`,
  },
  {
    id: 2,
    category: 'Process',
    tag: 'BPMN',
    color: '#0ea5e9',
    title: 'AS-IS → TO-BE процес обробки заявки',
    desc: 'Swimlane діаграма: міська адміністрація. Скорочення часу обробки з 14 до 4 днів. 6 ролей, 3 системи.',
    domain: '🏛️ Gov / Digitalisation',
    format: 'PNG',
    pages: '1 діаграма',
    preview: `ROLES         AS-IS (14 days)        TO-BE (4 days)
──────────────────────────────────────────────────────
Citizen     │ Paper form →         │ Online form →
            │ Physical queue       │ Auto-validation ✓
            │                      │
Front desk  │ Manual entry (2d)    │ Auto-assigned ──→
            │ Paper routing        │                 │
            │                      │                 ▼
Department  │ Inbox queue (5d)     │ Parallel review (1d)
Officer     │ Sequential review    │ Digital signature
            │                      │
Legal       │ Manual check (4d)    │ Auto rule-check (2h)
            │                      │
IT System   │ — (none) —           │ Status tracking
            │                      │ Push notifications
──────────────────────────────────────────────────────
Pain points removed:
✗ Double data entry    ✗ Paper lost in routing
✗ No status visibility ✗ Sequential bottleneck`,
  },
  {
    id: 3,
    category: 'Product',
    tag: 'Backlog',
    color: '#10b981',
    title: 'Пріоритизований Backlog (MoSCoW + WSJF)',
    desc: 'Backlog мобільного додатку енергетичної компанії. 24 епіки, MoSCoW + WSJF scoring, Sprint 1 scope.',
    domain: '⚡ Energy / Mobile App',
    format: 'PDF',
    pages: '2 стор.',
    preview: `EPIC              │ MoSCoW │ Value │ Risk │ Time │ WSJF
──────────────────────────────────────────────────────
Personal account  │  Must  │  9    │  8   │  3   │ 5.7
Bill payment      │  Must  │  9    │  6   │  4   │ 3.8
Meter readings    │  Must  │  8    │  5   │  3   │ 4.3
Usage analytics   │ Should │  7    │  3   │  5   │ 2.0
Notifications     │ Should │  7    │  4   │  3   │ 3.7
Outage map        │ Could  │  5    │  2   │  6   │ 1.2
Chat support      │ Could  │  4    │  2   │  7   │ 0.9
Referral program  │ Won't  │  3    │  1   │  8   │ 0.5
──────────────────────────────────────────────────────
Sprint 1 scope: Personal account + Meter readings
Rationale: highest WSJF + shared auth dependency`,
  },
  {
    id: 4,
    category: 'Discovery',
    tag: 'Research',
    color: '#f59e0b',
    title: "Синтез інтерв'ю + Jobs to Be Done",
    desc: "Discovery фаза: 8 інтерв'ю з диспетчерами логістичних компаній. JTBD карти, pain clusters, opportunity map.",
    domain: '🚛 Logistics SaaS',
    format: 'PDF',
    pages: '4 стор.',
    preview: `── Synthesis from 8 dispatcher interviews ──────────

JOB: "When I start my shift, I want to know
immediately which orders are critical, so I can
act before problems escalate."

Pain Clusters (frequency / severity):
★★★★★  No single view — switching 3-4 tabs
★★★★☆  Status updates lag 30-90 min behind reality
★★★☆☆  Can't see driver location without calling
★★☆☆☆  Manual re-entry of client data from email

Opportunity Score (importance × satisfaction gap):
┌──────────────────────────────────┐
│ Real-time dashboard      → 8.4  │ ← High opportunity
│ Auto status sync         → 7.9  │ ← High opportunity
│ Driver GPS tracking      → 6.1  │
│ Client portal            → 3.2  │ ← Low priority
└──────────────────────────────────┘`,
  },
  {
    id: 5,
    category: 'Product',
    tag: 'PRD',
    color: '#10b981',
    title: 'Feature Brief: Інтеграція КЕП/ЕДО',
    desc: 'Product requirement doc для інтеграції електронного підпису. Scope, out of scope, technical constraints, AC.',
    domain: '🚛 Logistics SaaS / ЕДО',
    format: 'PDF',
    pages: '2 стор.',
    preview: `Feature: KEP/EDO Integration for Document Signing
─────────────────────────────────────────────────
Problem: Drivers and dispatchers print, sign,
and scan 3-5 documents per trip. Average delay: 2h.

In scope:
✓ Sign delivery acts via qualified e-signature
✓ Integration with Vchasno / M.E.Doc provider
✓ Document status: draft → signed → archived
✓ Fallback: PDF download if KEP unavailable

Out of scope (v1):
✗ Tax reporting integration
✗ Multi-party signing flows
✗ Mobile KEP (planned v2)

Technical constraints:
• Must use accredited TSP (Trust Service Provider)
• Signature format: CAdES-X Long (ДСТУ 4145)
• No PII stored on our servers — proxy only

Success metric: signing time < 3 min,
paper docs eliminated for 80% of trips`,
  },
  {
    id: 6,
    category: 'Communication',
    tag: 'Template',
    color: '#ec4899',
    title: 'Kick-off Presentation Template',
    desc: 'Шаблон для старту проєкту: цілі, стейкхолдери, scope, ризики, план комунікацій. 12 слайдів.',
    domain: '🔧 Universal',
    format: 'PDF',
    pages: '12 слайдів',
    preview: `Slide structure:
─────────────────────────────────────────
01  Project overview & why it matters
02  Business goals & success metrics
03  Stakeholder map (RACI)
04  Scope: In / Out / TBD
05  Key constraints & assumptions
06  High-level timeline (phases)
07  Team & responsibilities
08  Risks & mitigation (top 3)
09  Communication plan
10  Definition of Done / Ready
11  Open questions (parking lot)
12  Next steps & action items
─────────────────────────────────────────
Each slide: max 5 bullet points.
Decision log attached as appendix.`,
  },
];

/* ============================================================
   CATEGORIES & FILTER
   ============================================================ */
const categories = ['All', 'Business Analysis', 'Process', 'Product', 'Discovery', 'Communication'];
const categoryColors = {
  'Business Analysis': '#6366f1',
  'Process':           '#0ea5e9',
  'Product':           '#10b981',
  'Discovery':         '#f59e0b',
  'Communication':     '#ec4899',
};

let activeFilter = 'All';
const filterContainer = document.getElementById('pfFilters');
const grid = document.getElementById('pfGrid');

function renderFilters() {
  filterContainer.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'pf-filter-btn' + (cat === activeFilter ? ' is-active' : '');
    btn.textContent = cat;
    if (cat === activeFilter && cat !== 'All') {
      btn.style.background = categoryColors[cat] || '#00d97e';
    } else if (cat === activeFilter) {
      btn.style.background = '#00d97e';
    }
    btn.addEventListener('click', () => {
      activeFilter = cat;
      renderFilters();
      renderCards();
    });
    filterContainer.appendChild(btn);
  });
}

function renderCards() {
  const list = activeFilter === 'All' ? artifacts : artifacts.filter(a => a.category === activeFilter);
  grid.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'pf-card fade-up';
    card.innerHTML = `
      <div class="pf-card__accent" style="background:${item.color}"></div>
      <div class="pf-card__top">
        <span class="pf-tag" style="color:${item.color};background:${item.color}18">${item.tag}</span>
        <div class="pf-card__badges">
          <span class="pf-badge">${item.format}</span>
          <span class="pf-badge">${item.pages}</span>
        </div>
      </div>
      <h3 class="pf-card__title">${item.title}</h3>
      <p class="pf-card__desc">${item.desc}</p>
      <div class="pf-card__footer">
        <span class="pf-card__domain">${item.domain}</span>
        <span class="pf-card__cta" style="color:${item.color}">Preview →</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });
  document.querySelectorAll('.pf-card.fade-up').forEach(el => io.observe(el));
}

/* ============================================================
   MODAL
   ============================================================ */
const overlay    = document.getElementById('pfOverlay');
const modalMeta  = document.getElementById('pfModalMeta');
const modalTitle = document.getElementById('pfModalTitle');
const preview    = document.getElementById('pfPreview');
const closeBtn   = document.getElementById('pfModalClose');

function openModal(item) {
  modalMeta.textContent  = `${item.category} · ${item.domain}`;
  modalMeta.style.color  = item.color;
  modalTitle.textContent = item.title;
  preview.innerHTML = `<pre>${escapeHtml(item.preview)}</pre>`;
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   INIT
   ============================================================ */
renderFilters();
renderCards();
