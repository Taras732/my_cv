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
   TIMELINE — click to expand
   ============================================================ */
document.querySelectorAll('.timeline__item').forEach(item => {
  item.addEventListener('click', () => {
    const isActive = item.classList.contains('is-active');
    document.querySelectorAll('.timeline__item').forEach(i => i.classList.remove('is-active'));
    if (!isActive) item.classList.add('is-active');
  });
});

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16, behavior: 'smooth' });
  });
});

/* ============================================================
   COPY EMAIL — click to copy, show toast
   ============================================================ */
document.querySelectorAll('.contact-info__copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      showToast(currentLang === 'uk' ? 'Email скопійовано!' : 'Email copied!', 'success');
    }).catch(() => {
      showToast(text, 'info');
    });
  });
});

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ============================================================
   EMAIL VALIDATION
   ============================================================ */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(input, show) {
  const field = input.closest('.form-field');
  field.classList.toggle('has-error', show);
}

/* ============================================================
   CONTACT FORM — Formspree
   HOW TO SET UP:
   1. Go to https://formspree.io and sign up (free)
   2. Create a new form → copy the form ID (e.g. "xwkgpvzn")
   3. Replace YOUR_FORM_ID below with your actual ID
   ============================================================ */
const WEB3FORMS_KEY = 'b6d313e4-0859-48b4-adba-23567fb88929';

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nameEl    = this.elements.name;
  const emailEl   = this.elements.email;
  const messageEl = this.elements.message;

  // — validation —
  let valid = true;

  if (!nameEl.value.trim())             { setFieldError(nameEl, true);    valid = false; }
  else                                  { setFieldError(nameEl, false); }

  if (!isValidEmail(emailEl.value.trim())) { setFieldError(emailEl, true);  valid = false; }
  else                                     { setFieldError(emailEl, false); }

  if (!messageEl.value.trim())          { setFieldError(messageEl, true);  valid = false; }
  else                                  { setFieldError(messageEl, false); }

  if (!valid) return;

  // — loading state —
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-label').textContent = currentLang === 'uk' ? 'Надсилаємо…' : 'Sending…';
  formStatus.className   = 'form-status';
  formStatus.textContent = '';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name:       nameEl.value.trim(),
        email:      emailEl.value.trim(),
        message:    messageEl.value.trim(),
        subject:    `CV site: message from ${nameEl.value.trim()}`,
      }),
    });

    const data = await res.json();

    if (data.success) {
      formStatus.className   = 'form-status form-status--ok';
      formStatus.textContent = currentLang === 'uk'
        ? '✓ Повідомлення надіслано! Відповім найближчим часом.'
        : '✓ Message sent! I\'ll get back to you soon.';
      this.reset();
    } else {
      throw new Error(data.message || 'Error');
    }
  } catch {
    formStatus.className   = 'form-status form-status--err';
    formStatus.textContent = currentLang === 'uk'
      ? 'Щось пішло не так. Напишіть на taras.smalych@gmail.com'
      : 'Something went wrong. Email me at taras.smalych@gmail.com';
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-label').textContent = currentLang === 'uk' ? 'Надіслати' : 'Send message';
  }
});

// clear error on input
contactForm.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => setFieldError(el, false));
});
