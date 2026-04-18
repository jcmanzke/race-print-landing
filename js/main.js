// Nav scroll behavior
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Live customizer preview
const inputs = {
  name: document.getElementById('runner-name'),
  bib: document.getElementById('bib-number'),
  time: document.getElementById('finish-time'),
  pace: document.getElementById('pace'),
  race: document.getElementById('race-name'),
};
const preview = {
  name: document.getElementById('preview-name'),
  bib: document.getElementById('preview-bib'),
  time: document.getElementById('preview-time'),
  pace: document.getElementById('preview-pace'),
  race: document.getElementById('preview-race'),
};

function updatePreview() {
  if (inputs.name && preview.name) {
    preview.name.textContent = inputs.name.value || 'Your Name';
  }
  if (inputs.bib && preview.bib) {
    preview.bib.textContent = inputs.bib.value || '#';
  }
  if (inputs.time && preview.time) {
    preview.time.textContent = inputs.time.value || '—';
  }
  if (inputs.pace && preview.pace) {
    preview.pace.textContent = inputs.pace.value ? inputs.pace.value + ' /km' : '—';
  }
  if (inputs.race && preview.race) {
    preview.race.textContent = inputs.race.value || 'MARATHON 2025';
  }
}

Object.values(inputs).forEach(input => {
  if (input) input.addEventListener('input', updatePreview);
});

// Order button
document.getElementById('order-btn')?.addEventListener('click', () => {
  const name = inputs.name?.value;
  if (!name) {
    inputs.name?.focus();
    inputs.name?.style.setProperty('border-color', '#e05');
    setTimeout(() => inputs.name?.style.removeProperty('border-color'), 1500);
    return;
  }
  alert(`Great! We'll be in touch to create ${name}'s custom print. Order flow coming soon!`);
});
