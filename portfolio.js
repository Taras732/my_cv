/* ============================================================
   NAV
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
   FADE-UP
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
   42 real documents → 15 portfolio cards
   Drive folder: https://drive.google.com/drive/folders/1tiUN2vXmag0uuHMXxNCPIypciUtmu3lW
   To enable "Open in Drive" button — set driveUrl per artifact
   ============================================================ */
const artifacts = [
  {
    id: 1,
    category: 'Business Analysis',
    tag: 'User Stories',
    color: '#6366f1',
    title: 'User Stories + Acceptance Criteria',
    desc: '3 формати для різних аудиторій: Minimal, Business Summary, повний Gherkin з DoD та edge cases.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '3 документи',
    driveUrl: null,
    files: ['US-UM-01-Minimal.docx', 'US-UM-01-BusinessSummary.docx', 'US-UM-01-UserManagement.docx'],
    preview: `FILES INCLUDED:
─────────────────────────────────────────
① US-UM-01-Minimal          → sprint planning
② US-UM-01-BusinessSummary  → stakeholder review
③ US-UM-01-UserManagement   → full Gherkin + DoD

SAMPLE — UserManagement (Gherkin format):
─────────────────────────────────────────
AS A: platform administrator
I WANT TO: deactivate a user account
SO THAT: access is revoked without data loss

Given the user account is active
When I click "Deactivate" and confirm
Then account status → "Inactive"
  And all active sessions are terminated
  And login attempt returns:
    "Account suspended. Contact support."

Given the user has pending active bookings
When I try to deactivate
Then system shows warning:
  "User has 2 active bookings. Proceed?"
  And deactivation requires explicit confirmation

──── Definition of Done ─────────────────
✓ AC reviewed with PO and tech lead
✓ Edge cases documented
✓ Mapped to epic: User Management v1.2`,
  },
  {
    id: 2,
    category: 'Business Analysis',
    tag: 'Business Case',
    color: '#6366f1',
    title: 'Business Case',
    desc: 'Обґрунтування продукту: проблема, ринок, ROI, ризики, recommendation. Для інвесторів і стейкхолдерів.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '1 документ',
    driveUrl: null,
    files: ['BC-CR-001-BusinessCase.docx'],
    preview: `BC-CR-001 — Business Case: Car Rental Platform
═══════════════════════════════════════════════

1. PROBLEM STATEMENT
   Traditional car rental: 40-60 min checkout,
   paper contracts, no real-time availability.
   Target segment: B2C urban mobility, 25-45 y.o.

2. MARKET OPPORTUNITY
   UA market: ~$180M/yr, 12% CAGR
   Addressable segment: self-service digital rental
   Key gap: no dominant app-first player in UA

3. PROPOSED SOLUTION
   Mobile-first platform: instant booking,
   digital contract signing (KEP), GPS tracking,
   loyalty program, fleet management dashboard

4. FINANCIAL PROJECTION (3yr)
   ┌──────────────────────────────┐
   │ Year 1  Revenue   $320K     │
   │ Year 2  Revenue   $890K     │
   │ Year 3  Revenue   $2.1M     │
   │ Break-even        Month 18  │
   └──────────────────────────────┘

5. RISKS & MITIGATION
   R1: Regulatory — KEP compliance (mitigated)
   R2: Fleet acquisition — asset-light model
   R3: Competition — speed-to-market priority

RECOMMENDATION: Proceed to Discovery Phase`,
  },
  {
    id: 3,
    category: 'Business Analysis',
    tag: 'Stakeholder Map',
    color: '#6366f1',
    title: 'Stakeholder Management Pack',
    desc: 'Influence/Interest матриця, RACI таблиця, візуальна схема стейкхолдерів. 3 формати для різних контекстів.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '3 документи',
    driveUrl: null,
    files: ['SM-CR-001-InfluenceMatrix.docx', 'SM-CR-002-RACI.docx', 'SM-CR-003-StakeholderMap.docx'],
    preview: `FILES: InfluenceMatrix · RACI · StakeholderMap
═══════════════════════════════════════════════

INFLUENCE / INTEREST MATRIX (SM-CR-001):
              Low Interest  │  High Interest
         ────────────────────────────────────
High     │ Fleet Partners  │ CEO / Investors
Influence│ Legal Team      │ Product Owner
         ────────────────────────────────────
Low      │ Support Staff   │ End Users
Influence│ External QA     │ Fleet Managers

RACI TABLE (SM-CR-002) — Discovery Phase:
Activity              │ BA  │ PO  │ Dev │ Legal
──────────────────────────────────────────────
Requirements sign-off │  A  │  R  │  C  │  I
Architecture decision │  C  │  A  │  R  │  I
Legal compliance      │  I  │  C  │  I  │  R
Sprint planning       │  C  │  R  │  R  │  I

STAKEHOLDER MAP (SM-CR-003):
Visualised connections between 8 roles:
CEO → PO → BA → Dev Team
           ↓
     Fleet Partners ← Operations
           ↓
     Legal / Compliance`,
  },
  {
    id: 4,
    category: 'Business Analysis',
    tag: 'API Req',
    color: '#6366f1',
    title: 'API Requirements Pack',
    desc: 'Таблиця endpoints, data flow схема, інтеграційні вимоги для KEP/ЕДО. Для BA без глибокого tech-background.',
    domain: '🚛 Logistics / Integration',
    format: 'DOCX',
    pages: '3 документи',
    driveUrl: null,
    files: ['API-CR-001-Endpoints.docx', 'API-CR-002-DataFlow.docx', 'API-CR-003-ESign.docx'],
    preview: `FILES: Endpoints · DataFlow · ESign (KEP)
═══════════════════════════════════════════════

ENDPOINTS TABLE (API-CR-001) — excerpt:
Endpoint              │Method│ Role    │ Description
──────────────────────────────────────────────────
/bookings             │ POST │ Customer│ Create booking
/bookings/{id}        │ GET  │ Any     │ Get status
/bookings/{id}/cancel │ PUT  │ Customer│ Cancel
/fleet/availability   │ GET  │ Public  │ Available cars
/payments/initiate    │ POST │ Customer│ Start payment
/documents/{id}/sign  │ POST │ Customer│ KEP e-sign

DATA FLOW (API-CR-002):
Customer App → Booking Service → Fleet DB
                    ↓
             Payment Gateway (Stripe)
                    ↓
             Document Service → KEP Provider
                    ↓
             Notification Service (Email/Push)

ESIGN REQUIREMENTS (API-CR-003):
• Accredited TSP: Vchasno / PrivatBank KEP
• Signature format: CAdES-X Long (ДСТУ 4145)
• No PII on platform servers — proxy only
• Fallback: paper contract download`,
  },
  {
    id: 5,
    category: 'Business Analysis',
    tag: 'UAT',
    color: '#6366f1',
    title: 'UAT Plan + Acceptance Test Cases',
    desc: 'План UAT тестування: ролі, scope, test cases з кроками та expected results. Закриває цикл від вимог до прийняття.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '1 документ',
    driveUrl: null,
    files: ['UAT-CR-001-UATplan.docx'],
    preview: `UAT-CR-001 — UAT Plan: Car Rental Platform v1
═══════════════════════════════════════════════

SCOPE: Booking flow · Payments · User profile
OUT OF SCOPE: Admin dashboard (UAT-002)
DURATION: 5 business days
ROLES: PO (approver) · QA Lead · 3 end users

TEST CASE STRUCTURE:
TC-001 — Successful booking flow
─────────────────────────────────────
Pre-condition: User logged in, car available
Steps:
  1. Select car → Check availability
  2. Choose dates → Confirm pricing
  3. Enter payment details → Submit
  4. Sign digital contract (KEP)
  5. Receive confirmation email

Expected: Booking status = "Confirmed"
          Email received within 2 min
          Contract signed + stored

Actual: [tester fills in]
Status: PASS / FAIL / BLOCKED

ENTRY CRITERIA: Dev sign-off, staging env ready
EXIT CRITERIA:  95% TC pass, 0 critical bugs`,
  },
  {
    id: 6,
    category: 'Business Analysis',
    tag: 'RTM',
    color: '#6366f1',
    title: 'Research & Traceability Pack',
    desc: 'Requirements Traceability Matrix, Competitive Analysis, ROI Calculator. Покриває аналітику від ринку до вимог.',
    domain: '🚗 Car Rental Platform',
    format: 'XLSX',
    pages: '3 документи',
    driveUrl: null,
    files: ['RTM-CR-001-TraceabilityMatrix.xlsx', 'CA-CR-001-CompetitiveAnalysis.xlsx', 'ROIC-CR-001-ROICalculator.xlsx'],
    preview: `FILES: TraceabilityMatrix · CompetitiveAnalysis · ROICalculator
════════════════════════════════════════════════════════════

RTM (TraceabilityMatrix) — excerpt:
Biz Need    │ Epic    │ Story   │ TC      │ Status
────────────────────────────────────────────────────
Reduce time │ BK-001  │ US-012  │ TC-004  │ ✓ Done
Digital sign│ DOC-001 │ US-031  │ TC-018  │ ✓ Done
Fleet view  │ FL-002  │ US-044  │ TC-027  │ ⏳ WIP

COMPETITIVE ANALYSIS — key dimensions:
                  Sixt  Europcar  OurApp
Online booking     ✓      ✓        ✓
Mobile-first       ✗      ✓        ✓
KEP signing        ✗      ✗        ✓
Real-time GPS      ✗      ✗        ✓
Loyalty points     ✓      ✓        ✓
UA market support  ✗      ✗        ✓

ROI CALCULATOR (interactive):
Input: Fleet size = 50 cars
       Current booking conversion = 12%
       → Projected uplift: +8%
       → Additional revenue Y1: $142K
       → Payback period: 14 months`,
  },
  {
    id: 7,
    category: 'Product',
    tag: 'Backlog',
    color: '#10b981',
    title: 'Prioritised Backlog',
    desc: 'Повний backlog платформи: епіки, stories, MoSCoW + WSJF scoring, Sprint 1 scope, залежності.',
    domain: '🚗 Car Rental Platform',
    format: 'XLSX',
    pages: '1 документ',
    driveUrl: null,
    files: ['CarRental-Backlog.xlsx'],
    preview: `CarRental-Backlog.xlsx — Product Backlog v1.3
═══════════════════════════════════════════════

EPICS OVERVIEW:
Epic         │ Stories │ MoSCoW │ WSJF │ Sprint
─────────────────────────────────────────────────
Auth & Users │  8      │  Must  │  5.7 │  S1
Car Catalog  │  6      │  Must  │  4.9 │  S1
Booking Flow │  12     │  Must  │  5.2 │  S1-S2
Payments     │  7      │  Must  │  4.8 │  S2
KEP Signing  │  5      │  Must  │  4.3 │  S2
GPS Tracking │  4      │ Should │  3.1 │  S3
Loyalty      │  6      │ Should │  2.8 │  S3
Admin Panel  │  9      │ Should │  2.5 │  S3-S4
Analytics    │  5      │ Could  │  1.9 │  S4
Referral     │  3      │ Won't  │  0.8 │  —

SPRINT 1 SCOPE:
Auth & Users (8) + Booking Flow core (6)
Rationale: foundational dependency block

Total: 74 stories | 14 epics | Est. 8 sprints`,
  },
  {
    id: 8,
    category: 'Product',
    tag: 'PRD',
    color: '#10b981',
    title: 'PRD + Feature Brief',
    desc: 'Product Requirements Document і Feature Brief для однієї фічі: різний рівень деталізації для різних аудиторій.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '2 документи',
    driveUrl: null,
    files: ['PRD-CR-020-ProductRequirements.docx', 'FB-CR-020-FeatureBrief.docx'],
    preview: `FEATURE: Promo Code System (CR-020)
PRD (full) · Feature Brief (1-page summary)
═══════════════════════════════════════════

FEATURE BRIEF — FB-CR-020 (1 page):
─────────────────────────────────────
Problem: No mechanism to drive conversions
         during low-demand periods

Goal: Increase bookings by 15% via promo codes

In Scope:
✓ Fixed amount & % discount codes
✓ Single-use and multi-use codes
✓ Expiry date + usage limit
✓ Admin panel: create / deactivate codes

Out of Scope (v1):
✗ Auto-generated codes
✗ User-specific targeting
✗ Analytics dashboard

Success Metrics:
• Promo code redemption rate > 20%
• Incremental bookings +15% in promo periods

PRD — PRD-CR-020 (full document):
Adds: technical requirements, API spec,
      data model, edge cases, AC per story,
      rollback plan, A/B test approach`,
  },
  {
    id: 9,
    category: 'Product',
    tag: 'Roadmap',
    color: '#10b981',
    title: 'Product Roadmap Pack',
    desc: '3 формати roadmap: Now/Next/Later для команди, Timeline з milestones, Strategic з goal-based темами.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '3 документи',
    driveUrl: null,
    files: ['RM-CR-001-NowNextLater.docx', 'RM-CR-002-Timeline.docx', 'RM-CR-003-StrategicRoadmap.docx'],
    preview: `FILES: NowNextLater · Timeline · StrategicRoadmap
═══════════════════════════════════════════════

NOW / NEXT / LATER (RM-CR-001):
─────────────────────────────────────────
NOW (Q1)    │ Booking core, Auth, Payments
            │ KEP document signing
            │ Basic fleet management
─────────────────────────────────────────
NEXT (Q2)   │ GPS live tracking
            │ Mobile app (iOS/Android)
            │ Loyalty program v1
            │ Admin analytics
─────────────────────────────────────────
LATER (Q3+) │ B2B fleet API
            │ Insurance integration
            │ Multi-city expansion
            │ Referral + growth loops

STRATEGIC ROADMAP THEMES (RM-CR-003):
Theme 1: "Book in 3 minutes" — friction removal
Theme 2: "Trust & Safety" — KEP, insurance, GPS
Theme 3: "Grow" — loyalty, referral, B2B
Theme 4: "Scale" — multi-city, API partners`,
  },
  {
    id: 10,
    category: 'Discovery',
    tag: 'Research',
    color: '#f59e0b',
    title: 'Discovery Research Pack',
    desc: 'Повний Discovery: синтез інтерв\'ю, pain clusters, JTBD карти, Impact/Effort matrix. 4 документи з одного проекту.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '4 документи',
    driveUrl: null,
    files: ['DS-CR-001-DiscoverySynthesis.docx', 'DS-CR-001-PainClusters.docx', 'DS-CR-002-JTBD.docx', 'DS-CR-003-ImpactEffort.docx'],
    preview: `FILES: DiscoverySynthesis · PainClusters · JTBD · ImpactEffort
════════════════════════════════════════════════════════════

PAIN CLUSTERS (from 12 user interviews):
★★★★★  Checkout takes 40-60 min (paperwork)
★★★★★  No real-time car availability info
★★★★☆  Can't extend rental via app
★★★☆☆  No damage report tool at return
★★☆☆☆  Loyalty points: opaque, hard to use

JTBD CARD — Primary Job:
"When I need a car for a city trip,
I want to book and get the keys in under
5 minutes, so I don't waste time on admin."

Barriers: Long queues · Paper contracts · No app
Success:  Car ready · Digital key · Invoice sent

IMPACT / EFFORT MATRIX:
            Low Effort    │  High Effort
           ───────────────────────────────
High Impact│ Online book  │ GPS tracking
           │ KEP signing  │ Mobile app
           ───────────────────────────────
Low Impact │ Loyalty UI   │ B2B API
           │ Promo codes  │ Insurance integ`,
  },
  {
    id: 11,
    category: 'Discovery',
    tag: 'Facilitation',
    color: '#f59e0b',
    title: 'Discovery Facilitation Pack',
    desc: 'Interview Guide, Pre-Discovery Questionnaire, Scoping Workshop Agenda, Persona Cards. Інструменти для ведення Discovery.',
    domain: '🔧 Universal',
    format: 'DOCX',
    pages: '4 документи',
    driveUrl: null,
    files: ['DIG-CR-001-InterviewGuide.docx', 'PDQ-CR-001-PreDiscoveryQuestionnaire.docx', 'SWA-CR-001-ScopingWorkshopAgenda.docx', 'PC-CR-001-PersonaCards.docx'],
    preview: `FILES: InterviewGuide · PreDiscoveryQ · ScopingAgenda · PersonaCards
════════════════════════════════════════════════════════════════

INTERVIEW GUIDE — key question blocks:
1. Context: "Walk me through your typical day..."
2. Current process: "How do you currently...?"
3. Pain points: "What frustrates you most?"
4. Workarounds: "How do you handle X today?"
5. Ideal state: "What would perfect look like?"
→ 45-min structure, 2 facilitators recommended

PRE-DISCOVERY QUESTIONNAIRE (12 questions):
Sent to client 3 days before kick-off.
Topics: business goals · users · constraints
        tech stack · timeline · budget range

SCOPING WORKSHOP AGENDA (3h):
09:00 Intro & goals
09:30 As-Is process walkthrough
10:30 Problem framing (HMW questions)
11:00 Solution brainstorm
11:45 Scope decisions: In / Out / Later
12:00 Next steps + action items

PERSONA CARDS (3 personas):
① Urban Renter — 28y, mobile-first, time-poor
② Business Traveler — 38y, expense reports
③ Weekend Explorer — 45y, family trips`,
  },
  {
    id: 12,
    category: 'Communication',
    tag: 'Kick-off',
    color: '#ec4899',
    title: 'Kick-off Presentation Templates',
    desc: 'Два шаблони: Short (8 слайдів) для швидкого старту і Full (12 слайдів) з RACI, ризиками, communication plan.',
    domain: '🔧 Universal',
    format: 'PPTX',
    pages: '2 презентації',
    driveUrl: null,
    files: ['KO-CR-001-Kickoff-Short.pptx', 'KO-CR-002-Kickoff-Full.pptx'],
    preview: `SHORT (8 slides) — KO-CR-001:
─────────────────────────────────
01  Why we're here + project goal
02  Problem statement
03  Scope: In / Out
04  Team & roles
05  High-level timeline
06  Top 3 risks
07  How we'll work (ceremonies)
08  Next steps + action items

FULL (12 slides) — KO-CR-002:
─────────────────────────────────
01  Project overview & context
02  Business goals + success metrics
03  Stakeholder map (RACI table)
04  Scope: In / Out / TBD
05  Key constraints & assumptions
06  High-level timeline (phases)
07  Team & responsibilities
08  Risks & mitigation plan (top 5)
09  Communication plan + cadence
10  Definition of Done / Ready
11  Open questions (parking lot)
12  Next steps & owners

Design: dark theme, max 5 bullets/slide
Appendix: decision log template`,
  },
  {
    id: 13,
    category: 'Communication',
    tag: 'Release Notes',
    color: '#ec4899',
    title: 'Release Notes & Changelog',
    desc: 'Два формати: технічний changelog для dev-команди і бізнес release notes для стейкхолдерів і клієнтів.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    pages: '2 документи',
    driveUrl: null,
    files: ['RN-CR-001-Technical-Changelog.docx', 'RN-CR-002-Business-ReleaseNotes.docx'],
    preview: `TECHNICAL CHANGELOG — RN-CR-001 (for dev team):
─────────────────────────────────────────────────
v1.2.0 — 2026-02-14
  [feat]  Promo code system — API + admin UI
  [feat]  GPS live tracking — WebSocket stream
  [fix]   Booking cancellation race condition
  [fix]   KEP signature validation timeout
  [perf]  Fleet availability query: 2.1s → 340ms
  [deps]  Node 20 LTS, Prisma 5.8

Breaking changes: /bookings response schema v2
Migration guide: docs/migrations/v1.2.md

BUSINESS RELEASE NOTES — RN-CR-002 (for clients):
─────────────────────────────────────────────────
🚀 What's new in February release

📍 Live car tracking
   See your rental car on the map in real time.
   Available from the moment you confirm booking.

🏷️ Promo codes
   Apply discount codes at checkout.
   Codes from our partners work automatically.

⚡ Faster search
   Availability results now load 6x faster.

🐛 Fixed: occasional double-charge on cancel
   If affected, refund processed automatically.`,
  },
  {
    id: 14,
    category: 'Communication',
    tag: 'Change Mgmt',
    color: '#ec4899',
    title: 'Change Management Pack',
    desc: 'CR приклад на реальній фічі, blank шаблон для команди, Change Request Register у таблиці.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX / XLSX',
    pages: '3 документи',
    driveUrl: null,
    files: ['CR-001-Example-PromoCode.docx', 'CR-TEMPLATE-001-ChangeRequest-Blank.docx', 'CRR-CR-001-ChangeRequestRegister.xlsx'],
    preview: `FILES: CR Example · CR Template · CR Register
═══════════════════════════════════════════════

CR EXAMPLE — Promo Code (CR-001):
──────────────────────────────────
Title: Add promo code system
Requested by: Marketing · Date: 2026-01-12
Priority: High

Description:
  Allow users to enter promo codes at checkout
  for fixed or percentage discounts.

Impact Assessment:
  Scope:    +5 stories, 1 new epic
  Timeline: +2 sprints (Q2 → Q3)
  Budget:   +$8,400 (dev) + $1,200 (QA)
  Risk:     Payment flow regression — medium

Decision: APPROVED with revised timeline
Sign-off: PO ✓ · Tech Lead ✓ · PM ✓

CR REGISTER (CRR-CR-001 — Excel):
ID     │ Title          │ Status   │ Impact │ Date
───────────────────────────────────────────────────
CR-001 │ Promo Codes    │ Approved │ Medium │ Jan 12
CR-002 │ GPS Tracking   │ Pending  │ High   │ Feb 03
CR-003 │ Admin Reports  │ Rejected │ Low    │ Feb 18`,
  },
  {
    id: 15,
    category: 'Presale',
    tag: 'Presale',
    color: '#8b5cf6',
    title: 'Presale Package',
    desc: 'Повний пресейл-набір: Project Proposal, Estimation Sheet, T-shirt Sizing, Statement of Work, High-Level Solution Overview.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX / XLSX',
    pages: '5 документів',
    driveUrl: null,
    files: ['PP-CR-001-ProjectProposal.docx', 'EST-CR-001-EstimationSheet.xlsx', 'TSM-CR-001-TshirtSizing.xlsx', 'SOW-CR-001-StatementOfWork.docx', 'HLSO-CR-001-HighLevelSolutionOverview.docx'],
    preview: `FILES: ProjectProposal · EstimationSheet · TshirtSizing
        · StatementOfWork · HighLevelSolutionOverview
═══════════════════════════════════════════════════════

PROJECT PROPOSAL (PP-CR-001) — 3 pages:
  Executive summary · Approach · Team · Timeline
  Budget range · Next steps

ESTIMATION SHEET (EST-CR-001):
Epic            │ SP  │ Days │ Rate  │ Cost
────────────────────────────────────────────
Auth & Users    │ 34  │  17  │ $60   │ $6,120
Booking Flow    │ 55  │  28  │ $60   │ $16,800
Payments        │ 29  │  15  │ $60   │ $9,000
KEP Integration │ 21  │  11  │ $60   │ $6,600
Buffer (15%)    │  —  │   —  │  —    │ $5,778
Total           │ 139 │  71  │  —    │ $44,298

T-SHIRT SIZING (TSM-CR-001) — early discovery:
Feature            │ Size │ Rationale
───────────────────────────────────────
Booking core       │  L   │ Complex flow
Payment gateway    │  M   │ Known integration
KEP signing        │  L   │ Regulatory complexity
GPS tracking       │  M   │ 3rd party SDK
Admin dashboard    │  L   │ Many edge cases
Loyalty program    │  S   │ Simple v1 scope

SOW covers: deliverables · timeline ·
  payment milestones · exclusions · IP rights`,
  },
];

/* ============================================================
   CATEGORIES & FILTER
   ============================================================ */
const categories = ['All', 'Business Analysis', 'Product', 'Discovery', 'Communication', 'Presale'];
const categoryColors = {
  'Business Analysis': '#6366f1',
  'Product':           '#10b981',
  'Discovery':         '#f59e0b',
  'Communication':     '#ec4899',
  'Presale':           '#8b5cf6',
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
    if (cat === activeFilter) {
      btn.style.background = cat === 'All' ? '#00d97e' : (categoryColors[cat] || '#00d97e');
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
const modalFooter = document.getElementById('pfModalFooter');
const closeBtn   = document.getElementById('pfModalClose');

function openModal(item) {
  modalMeta.textContent  = `${item.category} · ${item.domain}`;
  modalMeta.style.color  = item.color;
  modalTitle.textContent = item.title;
  preview.innerHTML = `<pre>${escapeHtml(item.preview)}</pre>`;

  if (item.driveUrl) {
    modalFooter.innerHTML = `
      <a href="${item.driveUrl}" target="_blank" rel="noopener" class="pf-btn-drive" style="background:${item.color}">
        Open in Google Drive →
      </a>`;
  } else {
    modalFooter.innerHTML = `<p class="pf-no-link">Available on request · <a href="index.html#contact">Contact me</a></p>`;
  }

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
