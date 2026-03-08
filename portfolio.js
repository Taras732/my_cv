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
   ARTIFACTS — 1 card = 1 document
   Drive folder: https://drive.google.com/drive/folders/1tiUN2vXmag0uuHMXxNCPIypciUtmu3lW
   Set driveUrl per card to enable "Open in Drive" button
   ============================================================ */
const artifacts = [

  /* ── BUSINESS ANALYSIS ─────────────────────────────────── */
  {
    id: 1,
    category: 'Business Analysis',
    tag: 'User Story',
    color: '#6366f1',
    title: 'User Stories — Gherkin Format',
    desc: 'User Management module. Повний формат: Given/When/Then, DoD, edge cases. Для технічної команди.',
    domain: '🚗 Car Rental / User Mgmt',
    format: 'DOCX',
    driveUrl: null,
    filename: 'US-UM-01-UserManagement.docx',
    preview: `US-UM-01-UserManagement.docx
─────────────────────────────────────────
STORY: Deactivate User Account

AS A: platform administrator
I WANT TO: deactivate a user account
SO THAT: access is revoked without data loss

Given the account is active, no open bookings
When I click "Deactivate" and confirm
Then status → "Inactive"
  And all sessions terminated immediately
  And user receives email: "Account suspended"

Given user has 2 active bookings
When I initiate deactivation
Then warning displayed: "Active bookings exist. Proceed?"
  And confirmation required before action

Definition of Done:
✓ AC reviewed by PO + tech lead
✓ Edge cases: concurrent sessions, active bookings
✓ Audit log entry on every status change`,
  },
  {
    id: 2,
    category: 'Business Analysis',
    tag: 'User Story',
    color: '#6366f1',
    title: 'User Stories — Business Format',
    desc: 'Той же модуль, нетехнічний формат: WHO / WHAT / WHY / WHAT WE BUILD. Для презентацій стейкхолдерам.',
    domain: '🚗 Car Rental / User Mgmt',
    format: 'DOCX',
    driveUrl: null,
    filename: 'US-UM-01-BusinessSummary.docx',
    preview: `US-UM-01-BusinessSummary.docx
─────────────────────────────────────────
STORY: Deactivate User Account

WHO NEEDS IT:  Platform administrator
WHAT THEY WANT: Remove user access instantly
WHY IT MATTERS: Security — ex-staff or
  suspicious accounts need immediate lock-out

WHAT WE BUILD:
• Deactivate button in user profile page
• Confirmation dialog (prevents accidents)
• Instant session termination across devices
• Automated email notification to user
• Audit log: who deactivated, when, why

WHAT WE DON'T BUILD (v1):
• Scheduled/delayed deactivation
• Bulk deactivation (planned v2)
• Self-service account closure by user`,
  },
  {
    id: 3,
    category: 'Business Analysis',
    tag: 'Business Case',
    color: '#6366f1',
    title: 'Business Case',
    desc: 'Обґрунтування продукту: проблема, ринок, фінансові проекції, ризики, recommendation. Для C-level і інвесторів.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'BC-CR-001-BusinessCase.docx',
    preview: `BC-CR-001-BusinessCase.docx
─────────────────────────────────────────
1. PROBLEM  Long checkout, paper contracts,
   no real-time availability. Urban B2C.

2. MARKET   UA: ~$180M/yr, 12% CAGR
   Gap: no dominant app-first player

3. SOLUTION Mobile-first: instant booking,
   KEP signing, GPS, fleet dashboard

4. FINANCIALS (3-year projection):
   Y1 Revenue  $320K
   Y2 Revenue  $890K
   Y3 Revenue  $2.1M
   Break-even  Month 18

5. RISKS
   R1 Regulatory — KEP compliance ✓ mitigated
   R2 Fleet acquisition — asset-light model
   R3 Competition — speed-to-market priority

RECOMMENDATION: Proceed to Discovery Phase`,
  },
  {
    id: 4,
    category: 'Business Analysis',
    tag: 'RACI',
    color: '#6366f1',
    title: 'RACI Table',
    desc: 'Матриця відповідальностей для Discovery та Delivery фаз. 5 ролей, 12 активностей.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'SM-CR-002-RACI.docx',
    preview: `SM-CR-002-RACI.docx
─────────────────────────────────────────
Activity               │ BA  │ PO  │ Dev │ Legal│ QA
───────────────────────────────────────────────────
Requirements sign-off  │  A  │  R  │  C  │  I  │  I
Architecture decision  │  C  │  A  │  R  │  I  │  I
Legal compliance check │  I  │  C  │  I  │  R  │  I
Sprint planning        │  C  │  R  │  R  │  I  │  C
Story refinement       │  R  │  A  │  C  │  I  │  C
UAT coordination       │  R  │  A  │  C  │  I  │  R
Production release     │  I  │  A  │  R  │  I  │  C
Stakeholder reporting  │  C  │  R  │  I  │  I  │  I

R = Responsible  A = Accountable
C = Consulted    I = Informed`,
  },
  {
    id: 5,
    category: 'Business Analysis',
    tag: 'Stakeholder',
    color: '#6366f1',
    title: 'Influence / Interest Matrix',
    desc: 'Класична 2×2 матриця стейкхолдерів. 8 ролей, стратегія взаємодії для кожного квадранту.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'SM-CR-001-InfluenceMatrix.docx',
    preview: `SM-CR-001-InfluenceMatrix.docx
─────────────────────────────────────────
              Low Interest   │  High Interest
           ──────────────────────────────────
High       │ Fleet Partners  │ CEO / CTO
Influence  │ Legal Team      │ Product Owner
           ──────────────────────────────────
Low        │ Support Staff   │ End Users (B2C)
Influence  │ External QA     │ Fleet Managers

ENGAGEMENT STRATEGY:
┌──────────────────────────────────────────┐
│ High Inf + High Int  → Manage closely    │
│ High Inf + Low Int   → Keep satisfied    │
│ Low Inf + High Int   → Keep informed     │
│ Low Inf + Low Int    → Monitor only      │
└──────────────────────────────────────────┘

Includes: communication cadence per group,
preferred channels, escalation path`,
  },
  {
    id: 6,
    category: 'Business Analysis',
    tag: 'RTM',
    color: '#6366f1',
    title: 'Requirements Traceability Matrix',
    desc: 'Зв\'язок від бізнес-потреби → Epic → User Story → Test Case. Покриття вимог по всьому lifecycle.',
    domain: '🚗 Car Rental Platform',
    format: 'XLSX',
    driveUrl: null,
    filename: 'RTM-CR-001-TraceabilityMatrix.xlsx',
    preview: `RTM-CR-001-TraceabilityMatrix.xlsx
─────────────────────────────────────────
Biz Need        │ Epic    │ Story  │ TC     │ Status
────────────────────────────────────────────────────
Reduce checkout │ BK-001  │ US-012 │ TC-004 │ ✓ Done
Digital signing │ DOC-001 │ US-031 │ TC-018 │ ✓ Done
Fleet real-time │ FL-002  │ US-044 │ TC-027 │ ⏳ WIP
Loyalty points  │ LY-001  │ US-058 │ TC-041 │ 📋 Todo
Promo codes     │ PR-001  │ US-067 │ TC-055 │ 📋 Todo

Coverage summary:
  Total requirements:    47
  Covered by stories:    47  (100%)
  Covered by test cases: 31  (66%)
  Tested in UAT:         24  (51%)

Used for: sprint planning, scope control,
audit trail, release readiness check`,
  },
  {
    id: 7,
    category: 'Business Analysis',
    tag: 'UAT Plan',
    color: '#6366f1',
    title: 'UAT Plan',
    desc: 'Scope, ролі, entry/exit criteria, test cases з кроками та expected results. Closing the loop від вимог до прийняття.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'UAT-CR-001-UATplan.docx',
    preview: `UAT-CR-001-UATplan.docx
─────────────────────────────────────────
Scope:    Booking · Payments · User Profile
Out:      Admin dashboard (UAT-002)
Duration: 5 business days  |  Env: Staging

ENTRY CRITERIA:
✓ Dev sign-off complete
✓ Staging environment stable
✓ Test data loaded (20 test accounts)

TC-001 — Complete Booking Flow:
Steps: Select car → Choose dates → Pay → Sign KEP
       → Receive confirmation
Expected: Status = "Confirmed", email < 2min,
          signed contract stored in system

TC-007 — Cancellation with Refund:
Steps: Active booking → Cancel → Confirm
Expected: Status = "Cancelled",
          refund initiated within 24h

EXIT CRITERIA:
✓ 95%+ test cases passed
✓ 0 critical bugs open
✓ PO sign-off received`,
  },
  {
    id: 8,
    category: 'Business Analysis',
    tag: 'API Req',
    color: '#6366f1',
    title: 'API Endpoints Table',
    desc: 'Таблиця REST endpoints: метод, роль, опис, приклад payload. Для BA без глибокого tech-background.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'API-CR-001-Endpoints.docx',
    preview: `API-CR-001-Endpoints.docx
─────────────────────────────────────────
Endpoint               │Method│ Role    │ Notes
──────────────────────────────────────────────
/bookings              │ POST │ Customer│ Create booking
/bookings/{id}         │ GET  │ Any     │ Get status
/bookings/{id}/cancel  │ PUT  │ Customer│ Cancel + refund
/fleet/availability    │ GET  │ Public  │ Filter by date/city
/fleet/{id}            │ GET  │ Public  │ Car details
/payments/initiate     │ POST │ Customer│ Start payment
/payments/{id}/confirm │ POST │ System  │ Webhook from PSP
/documents/{id}/sign   │ POST │ Customer│ KEP e-sign
/users/profile         │ GET  │ Auth    │ Profile data
/users/deactivate      │ PUT  │ Admin   │ Deactivate account

Each endpoint includes:
• Request/response schema (simplified)
• Auth requirements
• Error codes + business meaning`,
  },
  {
    id: 9,
    category: 'Business Analysis',
    tag: 'Data Flow',
    color: '#6366f1',
    title: 'System Data Flow Diagram',
    desc: 'Схема потоків даних між системами: booking service, payment gateway, KEP provider, notifications.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'API-CR-002-DataFlow.docx',
    preview: `API-CR-002-DataFlow.docx
─────────────────────────────────────────
BOOKING FLOW — data movement:

Customer App
  │ POST /bookings
  ▼
Booking Service ──────────────→ Fleet DB
  │ check availability         (availability lock)
  │ POST /payments/initiate
  ▼
Payment Gateway (Stripe)
  │ webhook: payment.confirmed
  ▼
Booking Service
  │ POST /documents/generate
  ▼
Document Service ─────────────→ KEP Provider
  │ signed document                (Vchasno)
  ▼
Booking Service
  │ trigger notification
  ▼
Notification Service
  ├── Email (SendGrid): confirmation
  └── Push (FCM): "Booking confirmed"

Data stored: booking_id, payment_ref,
  document_hash, signature_timestamp`,
  },
  {
    id: 10,
    category: 'Business Analysis',
    tag: 'Integration',
    color: '#6366f1',
    title: 'KEP / E-Sign Integration Requirements',
    desc: 'Вимоги для інтеграції кваліфікованого електронного підпису. Scope, технічні обмеження, AC, compliance.',
    domain: '🚛 Logistics / ЕДО',
    format: 'DOCX',
    driveUrl: null,
    filename: 'API-CR-003-ESign.docx',
    preview: `API-CR-003-ESign.docx
─────────────────────────────────────────
Feature: KEP Integration for Rental Contracts

In scope:
✓ Sign delivery/rental acts via qualified KEP
✓ Integration: Vchasno TSP (accredited UA)
✓ Statuses: draft → pending → signed → archived
✓ Fallback: PDF download if KEP unavailable

Out of scope (v1):
✗ Tax reporting integration
✗ Multi-party signing (B2B)
✗ Mobile KEP via BankID

Technical constraints:
• Accredited TSP only (ДСТУ 4145)
• Signature format: CAdES-X Long
• No PII stored on platform — proxy only
• Signing timeout: 5 min, auto-cancel

Acceptance Criteria:
• Signing flow < 3 minutes end-to-end
• Signed doc stored with hash + timestamp
• Paper contracts eliminated for 80% trips`,
  },

  /* ── PRODUCT ────────────────────────────────────────────── */
  {
    id: 11,
    category: 'Product',
    tag: 'Backlog',
    color: '#10b981',
    title: 'Product Backlog',
    desc: 'Повний backlog: 14 епіків, 74 stories, MoSCoW + WSJF scoring, Sprint 1 scope, dependency mapping.',
    domain: '🚗 Car Rental Platform',
    format: 'XLSX',
    driveUrl: null,
    filename: 'CarRental-Backlog.xlsx',
    preview: `CarRental-Backlog.xlsx  (v1.3 · 74 stories)
─────────────────────────────────────────
Epic            │Stories│MoSCoW │WSJF│Sprint
────────────────────────────────────────────
Auth & Users    │   8   │ Must  │5.7 │ S1
Booking Flow    │  12   │ Must  │5.2 │ S1-S2
Car Catalog     │   6   │ Must  │4.9 │ S1
Payments        │   7   │ Must  │4.8 │ S2
KEP Signing     │   5   │ Must  │4.3 │ S2
GPS Tracking    │   4   │Should │3.1 │ S3
Loyalty         │   6   │Should │2.8 │ S3
Admin Panel     │   9   │Should │2.5 │S3-S4
Analytics       │   5   │Could  │1.9 │ S4
Referral        │   3   │ Won't │0.8 │  —
────────────────────────────────────────────
Sprint 1: Auth + Catalog + Booking core
Rationale: foundational dependency block`,
  },
  {
    id: 12,
    category: 'Product',
    tag: 'PRD',
    color: '#10b981',
    title: 'Product Requirements Document',
    desc: 'Повний PRD для Promo Code фічі: problem statement, scope, user stories, technical requirements, metrics.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'PRD-CR-020-ProductRequirements.docx',
    preview: `PRD-CR-020-ProductRequirements.docx
─────────────────────────────────────────
Feature: Promo Code System (v1)

Problem: No conversion tool during low-demand
  periods. Competitors offer 15-25% discounts.

Goal: +15% bookings in promo periods

Scope IN:  Fixed/% discounts · Single+multi-use
  codes · Expiry + usage limits · Admin panel
Scope OUT: Auto-generation · User targeting
  Analytics dashboard (v2)

User Stories: 5 stories (US-067 to US-071)
  US-067  Apply promo code at checkout
  US-068  Admin: create promo code
  US-069  Admin: deactivate code
  US-070  Error: expired code
  US-071  Error: usage limit reached

Success Metrics:
  Redemption rate > 20%
  Incremental bookings +15% in promo period
  No impact on payment flow performance`,
  },
  {
    id: 13,
    category: 'Product',
    tag: 'Feature Brief',
    color: '#10b981',
    title: 'Feature Brief',
    desc: '1-сторінковий brief для Promo Code. Ціль, scope, out of scope, open questions. Швидкий старт для команди.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'FB-CR-020-FeatureBrief.docx',
    preview: `FB-CR-020-FeatureBrief.docx  (1 page)
─────────────────────────────────────────
Feature:    Promo Code System
Requested:  Marketing team · Jan 2026
Priority:   High
Owner:      Product Owner

WHY:  Drive conversions during off-peak.
      No current discount mechanism exists.

IN SCOPE:
✓ % and fixed-amount discount codes
✓ Single-use / multi-use / expiry date
✓ Admin UI: create, view, deactivate
✓ Checkout: apply code, see discount

OUT OF SCOPE:
✗ Personalised / user-specific codes
✗ Auto-generated code batches
✗ Promo analytics dashboard

OPEN QUESTIONS:
? Max discount cap — confirm with finance
? Stackable with loyalty points?
? Code visibility in booking confirmation?`,
  },
  {
    id: 14,
    category: 'Product',
    tag: 'Roadmap',
    color: '#10b981',
    title: 'Roadmap — Now / Next / Later',
    desc: 'Формат Now/Next/Later для команди і стейкхолдерів. Без дат — фокус на пріоритетах, не дедлайнах.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'RM-CR-001-NowNextLater.docx',
    preview: `RM-CR-001-NowNextLater.docx
─────────────────────────────────────────
NOW (Q1 2026):
  ✦ Booking core + Auth
  ✦ Payment gateway integration
  ✦ KEP document signing
  ✦ Basic fleet management

NEXT (Q2 2026):
  ◆ Live GPS tracking
  ◆ iOS + Android mobile app
  ◆ Loyalty program v1
  ◆ Admin analytics dashboard

LATER (Q3+):
  ◇ B2B fleet API (for enterprise)
  ◇ Insurance integration
  ◇ Multi-city expansion
  ◇ Referral program
  ◇ Dynamic pricing engine

Principles used:
• Outcome-focused, not feature list
• Dependencies respected (auth → booking)
• "Later" = real intent, not backlog dump`,
  },
  {
    id: 15,
    category: 'Product',
    tag: 'Roadmap',
    color: '#10b981',
    title: 'Roadmap — Timeline with Milestones',
    desc: 'Квартальний timeline з milestones і delivery goals. Для investor updates і executive presentations.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'RM-CR-002-Timeline.docx',
    preview: `RM-CR-002-Timeline.docx
─────────────────────────────────────────
Q1 2026  ──────────────────────────────
  Jan    Project kick-off + Discovery complete
  Feb    Sprint 1-2: Auth, Catalog, Booking
  Mar  ★ MILESTONE: MVP booking flow live

Q2 2026  ──────────────────────────────
  Apr    Sprint 3-4: Payments + KEP signing
  May    Sprint 5: GPS + Mobile app (iOS)
  Jun  ★ MILESTONE: Closed Beta (50 users)

Q3 2026  ──────────────────────────────
  Jul    Loyalty program + Admin analytics
  Aug    Android app + performance tuning
  Sep  ★ MILESTONE: Public Launch v1.0

Q4 2026  ──────────────────────────────
  Oct-Nov  B2B API + Insurance integration
  Dec    ★ MILESTONE: 1,000 active users

Dependencies noted per milestone.
Risk buffer: 1 sprint per quarter.`,
  },
  {
    id: 16,
    category: 'Product',
    tag: 'Roadmap',
    color: '#10b981',
    title: 'Strategic Roadmap',
    desc: 'Goal-based стратегічний roadmap. 4 теми замість списку фіч. Для board-level і investor communications.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'RM-CR-003-StrategicRoadmap.docx',
    preview: `RM-CR-003-StrategicRoadmap.docx
─────────────────────────────────────────
THEME 1: "Book in 3 minutes"  (Q1-Q2)
  Goal: End-to-end booking under 3 min
  Key results:
  • Checkout steps reduced from 8 to 4
  • KEP signing integrated in-app
  • Confirmation email < 30 seconds

THEME 2: "Trust & Safety"  (Q2-Q3)
  Goal: Users trust the platform
  Key results:
  • GPS tracking visible during rental
  • Digital contracts 100% legally valid
  • Damage report tool at return

THEME 3: "Grow"  (Q3)
  Goal: Organic growth engine live
  Key results:
  • Loyalty: 30% repeat booking rate
  • Referral: 15% new users via referral

THEME 4: "Scale"  (Q4+)
  Goal: Beyond Kyiv
  Key results:
  • 3 cities, B2B API launched
  • Gross margin > 35%`,
  },

  /* ── DISCOVERY ──────────────────────────────────────────── */
  {
    id: 17,
    category: 'Discovery',
    tag: 'Pain Clusters',
    color: '#f59e0b',
    title: 'Pain Clusters Analysis',
    desc: 'Структурований аналіз болей з 12 інтерв\'ю: кластеризація, частота, severity score.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'DS-CR-001-PainClusters.docx',
    preview: `DS-CR-001-PainClusters.docx
─────────────────────────────────────────
Source: 12 interviews · B2C renters + fleet admins

CLUSTER 1: Checkout friction  (10/12 · Critical)
  "Checkout takes 40-60 min of paperwork"
  "I sign 3 copies of the same contract"
  "They need my passport every single time"

CLUSTER 2: No real-time visibility  (9/12 · High)
  "I can't see which cars are actually free now"
  "The website shows a car, I arrive — it's gone"

CLUSTER 3: No digital touchpoint  (8/12 · High)
  "There's no app. I call to book."
  "I get a paper receipt I always lose"

CLUSTER 4: Return process  (6/12 · Medium)
  "Damage disputes take weeks"
  "No standard check-list at return"

Severity scoring: Frequency × Business Impact
  Checkout friction  → 9.2 / 10
  Real-time viz      → 7.8 / 10
  Digital touchpoint → 7.4 / 10`,
  },
  {
    id: 18,
    category: 'Discovery',
    tag: 'JTBD',
    color: '#f59e0b',
    title: 'Jobs to Be Done Map',
    desc: 'JTBD карта: job statement, functional / emotional / social dimensions, barriers, success criteria.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'DS-CR-002-JTBD.docx',
    preview: `DS-CR-002-JTBD.docx
─────────────────────────────────────────
JOB #1 — Primary (B2C Urban Renter):
"When I need a car for a city trip, I want
to book and pick it up in under 5 minutes,
so I can get on with my day."

  Functional:  Fast booking, no paperwork
  Emotional:   Feel in control, not stressed
  Social:      Seen as tech-savvy, efficient

  BARRIERS:
  × Long queues at desk
  × Paper contract signing
  × No confirmation app

  SUCCESS:
  ✓ Car ready on arrival
  ✓ Digital key / code sent
  ✓ Invoice sent automatically

JOB #2 — Fleet Manager:
"When managing 50+ cars, I want to see all
bookings and car statuses in one view, so
I can prevent double-bookings and downtime."

  Barriers: 3 spreadsheets + phone calls
  Success:  One dashboard, < 2min to act`,
  },
  {
    id: 19,
    category: 'Discovery',
    tag: 'Impact/Effort',
    color: '#f59e0b',
    title: 'Impact / Effort Matrix',
    desc: '2×2 матриця для пріоритизації фіч після Discovery. 16 ідей розміщено по квадрантам з rationale.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'DS-CR-003-ImpactEffort.docx',
    preview: `DS-CR-003-ImpactEffort.docx
─────────────────────────────────────────
           Low Effort      │  High Effort
        ───────────────────────────────────
High    │ Online booking   │ GPS tracking
Impact  │ Digital checkout │ Mobile app
  ★ DO  │ KEP signing      │ Fleet API
  FIRST │ Car availability │
        ───────────────────────────────────
Low     │ Promo codes      │ Insurance integ
Impact  │ Email receipts   │ Multi-currency
  Do    │ Profile page     │ Dynamic pricing
  later │ FAQ / Help       │ Referral v1

DECISION RULES:
• Quick wins (Low E, High I) → Sprint 1-2
• Strategic (High E, High I) → Roadmap plan
• Fill-ins (Low E, Low I)    → If capacity
• Avoid (High E, Low I)      → Deprioritise

Validated against: user interview data (12),
pain cluster severity scores, WSJF backlog`,
  },
  {
    id: 20,
    category: 'Discovery',
    tag: 'Synthesis',
    color: '#f59e0b',
    title: 'Discovery Synthesis Report',
    desc: 'Зведений звіт по Discovery фазі: методологія, ключові інсайти, opportunity areas, recommended next steps.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'DS-CR-001-DiscoverySynthesis.docx',
    preview: `DS-CR-001-DiscoverySynthesis.docx
─────────────────────────────────────────
RESEARCH SUMMARY
  Methods:   12 user interviews, 2 shadowing
             sessions, competitor analysis (5)
  Duration:  3 weeks  |  Participants: 12

TOP INSIGHTS:
  #1  Checkout time is the #1 drop-off point
      Avg. 47 min → target < 5 min

  #2  Users don't trust "availability shown"
      30% arrive to find car unavailable

  #3  Fleet managers work across 3+ tools
      Manual coordination = errors daily

OPPORTUNITY AREAS:
  → Digital-first checkout (highest impact)
  → Real-time availability guarantee
  → Unified fleet management view

RECOMMENDED MVP SCOPE:
  Must solve #1 and #2 to validate PMF
  Defer fleet management to v1.1

Confidence level: High (12 interviews,
  saturation reached at interview 9)`,
  },
  {
    id: 21,
    category: 'Discovery',
    tag: 'Interview Guide',
    color: '#f59e0b',
    title: 'User Interview Guide',
    desc: 'Структурований гайд для 45-хв інтерв\'ю: intro, question blocks, probes, closing. Для 2 фасилітаторів.',
    domain: '🔧 Universal',
    format: 'DOCX',
    driveUrl: null,
    filename: 'DIG-CR-001-InterviewGuide.docx',
    preview: `DIG-CR-001-InterviewGuide.docx  (45 min)
─────────────────────────────────────────
INTRO (5 min)
  "We're learning about your experience,
  not testing you. No right/wrong answers."
  Ask permission to record.

BLOCK 1: Context (10 min)
  "Walk me through your last car rental."
  "How often do you rent? For what purpose?"

BLOCK 2: Current Process (15 min)
  "How do you currently find and book a car?"
  "What does the pickup process look like?"
  Probe: "What's frustrating about that step?"

BLOCK 3: Pain Points (10 min)
  "What would you change if you could?"
  "Tell me about a time it went wrong."
  Probe: "How did that make you feel?"

BLOCK 4: Ideal State (5 min)
  "What would the perfect rental look like?"

CLOSING: Thank, next steps, incentive

Facilitator notes: 1 leads, 1 takes notes.
Avoid leading questions. Embrace silence.`,
  },
  {
    id: 22,
    category: 'Discovery',
    tag: 'Persona',
    color: '#f59e0b',
    title: 'Persona Cards',
    desc: '3 персони: Urban Renter, Business Traveler, Weekend Explorer. Goals, frustrations, behaviours, quote.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'PC-CR-001-PersonaCards.docx',
    preview: `PC-CR-001-PersonaCards.docx  (3 personas)
─────────────────────────────────────────
PERSONA 1: Urban Renter
  Age: 28  |  City: Kyiv  |  Tech: High
  Rents: 2-3x/month for city errands
  Goal: Book fast, skip the queue
  Frustration: "Why do I need to sign
    3 paper copies every single time?"
  Behaviour: Books last-minute via phone

PERSONA 2: Business Traveler
  Age: 38  |  Travels: 2x/month
  Rents: Company expense, needs receipt
  Goal: Reliable car + clean invoice
  Frustration: "I need a VAT invoice,
    not a handwritten receipt."
  Behaviour: Books 3 days ahead

PERSONA 3: Weekend Explorer
  Age: 45  |  Family trips
  Rents: 1-2x/month on weekends
  Goal: Spacious car, flexible return
  Frustration: "Availability changes
    between search and booking."
  Behaviour: Compares 3 services before booking`,
  },

  /* ── COMMUNICATION ──────────────────────────────────────── */
  {
    id: 23,
    category: 'Communication',
    tag: 'Kick-off',
    color: '#ec4899',
    title: 'Kick-off Presentation — Full',
    desc: '12 слайдів: goals, RACI, scope, constraints, timeline, risks, communication plan, DoD. З decision log.',
    domain: '🔧 Universal',
    format: 'PPTX',
    driveUrl: null,
    filename: 'KO-CR-002-Kickoff-Full.pptx',
    preview: `KO-CR-002-Kickoff-Full.pptx  (12 slides)
─────────────────────────────────────────
01  Project overview & why it matters
02  Business goals + success metrics
03  Stakeholder map (RACI table)
04  Scope: In / Out / TBD
05  Key constraints & assumptions
06  High-level timeline (phases)
07  Team & responsibilities
08  Risks + mitigation (top 5)
09  Communication plan + cadence
10  Definition of Done / Ready
11  Open questions — parking lot
12  Next steps + owners + dates
─────────────────────────────────────────
Design principles:
• Max 5 bullets per slide
• Every slide: 1 decision or 1 action
• Dark theme, readable in meeting rooms

Appendix: decision log template
Usage: projects > 3 months, 5+ stakeholders`,
  },
  {
    id: 24,
    category: 'Communication',
    tag: 'Changelog',
    color: '#ec4899',
    title: 'Technical Changelog',
    desc: 'Dev-орієнтований changelog: feat/fix/perf/deps з breaking changes і migration guide. Semver-ready.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'RN-CR-001-Technical-Changelog.docx',
    preview: `RN-CR-001-Technical-Changelog.docx
─────────────────────────────────────────
v1.2.0 — 2026-02-14  (audience: dev team)
─────────────────────────────────────────
[feat]  Promo code system — API + admin UI
[feat]  GPS live tracking — WebSocket stream
[feat]  Push notifications — FCM integration
[fix]   Booking cancellation race condition
        when payment timeout + user cancel
[fix]   KEP signature validation timeout
        increased 30s → 120s (Vchasno SLA)
[perf]  Fleet availability query: 2.1s → 340ms
        (added composite index on date + city)
[deps]  Node 20 LTS · Prisma 5.8 · Jest 30

BREAKING CHANGES:
  /bookings response schema changed to v2
  Field renamed: booking.status → booking.state

Migration guide: docs/migrations/v1.2.md
Rollback plan:  ops/rollback-v1.2.sh`,
  },
  {
    id: 25,
    category: 'Communication',
    tag: 'Release Notes',
    color: '#ec4899',
    title: 'Business Release Notes',
    desc: 'Бізнес-орієнтовані release notes: без технічного жаргону, з emoji, для клієнтів і стейкхолдерів.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'RN-CR-002-Business-ReleaseNotes.docx',
    preview: `RN-CR-002-Business-ReleaseNotes.docx
─────────────────────────────────────────
🚀 February 2026 Release
   (audience: clients, partners, stakeholders)
─────────────────────────────────────────
📍 Live car tracking
   See your rental on the map in real time.
   Available from the moment you confirm.

🏷️ Promo codes
   Apply discount codes at checkout.
   Codes from partners work automatically.

⚡ 6x faster search
   Availability results load in under a second.
   No more waiting or refreshing.

🐛 Fixed: occasional double-charge on cancel
   If you were affected, your refund has
   been processed automatically.
   Contact support if you have questions.

📅 Coming next month:
   • iOS app launch
   • Loyalty points program
   • Damage reporting tool

Questions? support@carrental.app`,
  },
  {
    id: 26,
    category: 'Communication',
    tag: 'Change Req',
    color: '#ec4899',
    title: 'Change Request — Example',
    desc: 'Реальний CR на прикладі Promo Code фічі: impact assessment, scope/timeline/budget зміни, sign-off.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'CR-001-Example-PromoCode.docx',
    preview: `CR-001-Example-PromoCode.docx
─────────────────────────────────────────
CHANGE REQUEST #001
Title:       Add Promo Code System
Requested:   Marketing · 2026-01-12
Priority:    High

DESCRIPTION:
Allow users to enter promo codes at checkout
for fixed-amount or % discounts.

IMPACT ASSESSMENT:
  Scope:    +5 stories, 1 new epic (PR-001)
  Timeline: +2 sprints (Q2 end → Q3 start)
  Budget:   +$8,400 dev / +$1,200 QA
  Risk:     Payment flow regression — medium
            Mitigation: regression test suite

OPTIONS CONSIDERED:
  A) Build now → +$9.6K, delay GPS by 1 sprint
  B) Defer to Q3 → no cost increase, later ROI
  C) Minimal version (% only) → +$4.2K

DECISION: Option A approved
Sign-off: PO ✓  Tech Lead ✓  Finance ✓
Date: 2026-01-19`,
  },

  /* ── PRESALE ────────────────────────────────────────────── */
  {
    id: 27,
    category: 'Presale',
    tag: 'Proposal',
    color: '#8b5cf6',
    title: 'Project Proposal',
    desc: '3-сторінковий proposal: problem understanding, proposed approach, team, timeline, investment range.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'PP-CR-001-ProjectProposal.docx',
    preview: `PP-CR-001-ProjectProposal.docx  (3 pages)
─────────────────────────────────────────
1. WHAT WE UNDERSTOOD
   You need a digital-first car rental platform
   that replaces paper contracts with a mobile
   experience from booking to return.

2. OUR APPROACH
   Phase 1 (8 wks): Discovery + Architecture
   Phase 2 (16 wks): Core platform (MVP)
   Phase 3 (8 wks): Mobile app + Go-to-market

3. WHY US
   • 3 logistics SaaS projects delivered
   • KEP/EDO integration experience
   • UA market expertise

4. TEAM
   BA/PO · Tech Lead · 2 Backend · 1 Frontend
   1 Mobile · QA · Designer (part-time)

5. INVESTMENT
   Discovery:  $12,000  (fixed)
   MVP:        $68,000–$82,000  (estimate)
   Timeline:   32 weeks from kick-off

6. NEXT STEPS
   → 90-min scoping call to refine scope
   → NDA + signed proposal → kick-off`,
  },
  {
    id: 28,
    category: 'Presale',
    tag: 'Estimation',
    color: '#8b5cf6',
    title: 'Estimation Sheet',
    desc: 'Детальна оцінка по епіках: story points, людино-дні, rate, cost. З буфером і assumptions.',
    domain: '🚗 Car Rental Platform',
    format: 'XLSX',
    driveUrl: null,
    filename: 'EST-CR-001-EstimationSheet.xlsx',
    preview: `EST-CR-001-EstimationSheet.xlsx
─────────────────────────────────────────
Epic              │  SP  │ Days │ Rate │  Cost
──────────────────────────────────────────────
Auth & Users      │  34  │  17  │ $60  │  $6,120
Car Catalog       │  22  │  11  │ $60  │  $3,960
Booking Flow      │  55  │  28  │ $60  │ $16,800
Payments          │  29  │  15  │ $60  │  $9,000
KEP Integration   │  21  │  11  │ $60  │  $6,600
GPS Tracking      │  18  │   9  │ $60  │  $5,400
Mobile App (iOS)  │  34  │  17  │ $55  │  $9,350
Admin Panel       │  26  │  13  │ $60  │  $7,800
QA (15%)          │   —  │   —  │  —   │ $9,753
Buffer (10%)      │   —  │   —  │  —   │  $6,503
──────────────────────────────────────────────
TOTAL             │ 239  │ 121  │  —   │ $81,286

Assumptions:
• 1 BE + 1 FE + 0.5 Mobile developer
• Rate may vary by seniority level
• Does not include infrastructure costs`,
  },
  {
    id: 29,
    category: 'Presale',
    tag: 'T-shirt',
    color: '#8b5cf6',
    title: 'T-shirt Sizing Matrix',
    desc: 'Груба оцінка фіч на рівні XS/S/M/L/XL для early-stage discovery. Для швидкого scope alignment.',
    domain: '🚗 Car Rental Platform',
    format: 'XLSX',
    driveUrl: null,
    filename: 'TSM-CR-001-TshirtSizing.xlsx',
    preview: `TSM-CR-001-TshirtSizing.xlsx
─────────────────────────────────────────
Feature              │ Size │ Weeks │ Rationale
──────────────────────────────────────────────
Booking core         │  L   │  6-8  │ Complex multi-step flow
Auth / User mgmt     │  M   │  3-4  │ Standard patterns
Payment gateway      │  M   │  3-4  │ Known Stripe integration
KEP signing          │  L   │  5-7  │ Regulatory complexity
Car catalog          │  S   │  2-3  │ CRUD + search
GPS live tracking    │  M   │  3-5  │ 3rd party SDK
Admin dashboard      │  L   │  6-8  │ Many views + permissions
Loyalty program      │  S   │  2-3  │ Points accrual only (v1)
Mobile app           │  XL  │ 8-12  │ iOS + Android native

Size guide:
  XS < 1 week   S = 1-2 wks   M = 3-4 wks
  L = 5-8 wks   XL > 8 wks

Used in: pre-sales scoping calls before
detailed estimation is possible`,
  },
  {
    id: 30,
    category: 'Presale',
    tag: 'SoW',
    color: '#8b5cf6',
    title: 'Statement of Work',
    desc: 'Юридично-орієнтований документ: scope, deliverables, timeline, payment milestones, exclusions, IP rights.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'SOW-CR-001-StatementOfWork.docx',
    preview: `SOW-CR-001-StatementOfWork.docx
─────────────────────────────────────────
PARTIES:  [Client] and [Vendor]
PROJECT:  Car Rental Platform MVP
DATE:     February 2026

DELIVERABLES:
  D1  Discovery report + wireframes
  D2  Deployed staging environment
  D3  MVP: booking, payments, KEP signing
  D4  QA report + UAT sign-off
  D5  Production deployment + handover docs

TIMELINE:
  Start: upon signed SoW + 50% deposit
  Discovery: 4 weeks
  Development: 20 weeks
  UAT + Launch: 4 weeks

PAYMENT MILESTONES:
  50%  Upon contract signing
  25%  Upon staging delivery (D2)
  25%  Upon production launch (D5)

EXCLUSIONS:
  • Ongoing hosting / infrastructure
  • Post-launch support (separate agreement)
  • Third-party service fees (Stripe, Vchasno)

IP: Full ownership transfers to Client
    upon final payment`,
  },
  {
    id: 31,
    category: 'Presale',
    tag: 'Competitive',
    color: '#8b5cf6',
    title: 'Competitive Analysis',
    desc: 'Порівняльна таблиця 5 конкурентів: функціонал, UX, монетизація, ринкова позиція. Opportunity gaps.',
    domain: '🚗 Car Rental Platform',
    format: 'XLSX',
    driveUrl: null,
    filename: 'CA-CR-001-CompetitiveAnalysis.xlsx',
    preview: `CA-CR-001-CompetitiveAnalysis.xlsx
─────────────────────────────────────────
Dimension         │Sixt │Europcar│Local A│Local B│Ours
──────────────────────────────────────────────────────
Online booking    │  ✓  │   ✓   │   ✓  │   ✗  │  ✓
Mobile app        │  ✓  │   ✓   │   ✗  │   ✗  │  ✓
KEP signing       │  ✗  │   ✗   │   ✗  │   ✗  │  ✓ ←
Real-time GPS     │  ✗  │   ✗   │   ✗  │   ✗  │  ✓ ←
Loyalty program   │  ✓  │   ✓   │   ✗  │   ✗  │  ✓
UA language       │  ✗  │   ✗   │   ✓  │   ✓  │  ✓
UA market focus   │  ✗  │   ✗   │  Ltd │  Ltd │  ✓ ←
Avg. checkout     │ 35m │  40m  │  50m │  60m │ <5m ←

KEY OPPORTUNITIES (marked ←):
  KEP signing + GPS = unique in UA market
  Sub-5min checkout = key differentiator
  UA-first = beats international players locally

Pricing model comparison included.`,
  },
  {
    id: 32,
    category: 'Presale',
    tag: 'Overview',
    color: '#8b5cf6',
    title: 'High-Level Solution Overview',
    desc: '1-сторінковий executive summary: проблема → рішення → ключові фічі → tech stack → очікувані метрики.',
    domain: '🚗 Car Rental Platform',
    format: 'DOCX',
    driveUrl: null,
    filename: 'HLSO-CR-001-HighLevelSolutionOverview.docx',
    preview: `HLSO-CR-001-HighLevelSolutionOverview.docx
─────────────────────────────────────────
PROBLEM:    Car rental in Ukraine = paper forms,
            40-60 min checkout, no real-time UX

SOLUTION:   Mobile-first car rental platform
            End-to-end: search → book → sign → drive

KEY FEATURES (MVP):
  ✦ Instant search with real availability
  ✦ Checkout in < 5 min (no paperwork)
  ✦ KEP digital signing (legally valid UA)
  ✦ GPS tracking during rental
  ✦ Fleet management dashboard

TECH STACK:
  Backend:  Node.js + PostgreSQL
  Mobile:   React Native (iOS + Android)
  Payment:  Stripe  |  KEP: Vchasno
  Infra:    AWS (ECS + RDS + CloudFront)

EXPECTED OUTCOMES (12 months):
  Checkout time:     47 min → < 5 min
  User satisfaction: NPS > 50
  Repeat bookings:   30% of users
  Monthly bookings:  500+ by Month 6`,
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
const overlay     = document.getElementById('pfOverlay');
const modalMeta   = document.getElementById('pfModalMeta');
const modalTitle  = document.getElementById('pfModalTitle');
const preview     = document.getElementById('pfPreview');
const modalFooter = document.getElementById('pfModalFooter');
const closeBtn    = document.getElementById('pfModalClose');

function openModal(item) {
  modalMeta.textContent = `${item.category} · ${item.domain}`;
  modalMeta.style.color = item.color;
  modalTitle.textContent = item.title;
  preview.innerHTML = `<pre>${escapeHtml(item.preview)}</pre>`;

  if (item.driveUrl) {
    modalFooter.innerHTML = `
      <a href="${item.driveUrl}" target="_blank" rel="noopener"
         class="pf-btn-drive" style="background:${item.color}">
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
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   INIT
   ============================================================ */
renderFilters();
renderCards();
