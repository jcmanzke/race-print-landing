const PRODUCTS = {
  'marathon-classic': {
    name: 'Marathon Classic',
    tagline: 'Route art with gold accents on white',
    fields: [
      { id: 'runner-name',  label: 'Runner Name',      placeholder: 'e.g. Anna Müller',            maxlength: 40 },
      { id: 'race-name',   label: 'Race Name',         placeholder: 'e.g. BERLIN MARATHON 2025',   maxlength: 50 },
      { id: 'bib-number',  label: 'Bib Number',        placeholder: 'e.g. 4219',                   maxlength: 6 },
      { id: 'finish-time', label: 'Finish Time',       placeholder: 'e.g. 3:42:18',               maxlength: 10 },
      { id: 'pace',        label: 'Avg Pace /km',      placeholder: 'e.g. 5:16',                  maxlength: 8 },
    ],
    buildPreview: buildClassicPreview,
  },
  'elevation-profile': {
    name: 'Elevation Profile',
    tagline: 'Mountain silhouette on black',
    fields: [
      { id: 'race-name',       label: 'Race Name',           placeholder: 'e.g. ZUGSPITZ ULTRATRAIL', maxlength: 50 },
      { id: 'start-elevation', label: 'Start Elevation (m)', placeholder: 'e.g. 720',                 maxlength: 6 },
      { id: 'peak-elevation',  label: 'Peak Elevation (m)',  placeholder: 'e.g. 2962',                maxlength: 6 },
      { id: 'total-ascent',    label: 'Total Ascent (m)',    placeholder: 'e.g. 4400',                maxlength: 6 },
      { id: 'finish-time',     label: 'Finish Time',         placeholder: 'e.g. 7:34:22',            maxlength: 10 },
    ],
    buildPreview: buildElevationPreview,
  },
  'split-times': {
    name: 'Split Times',
    tagline: 'Every 5 km, celebrated',
    fields: [
      { id: 'runner-name', label: 'Runner Name', placeholder: 'e.g. Anna Müller',          maxlength: 40 },
      { id: 'race-name',   label: 'Race Name',   placeholder: 'e.g. BERLIN MARATHON 2025', maxlength: 50 },
      { id: 'splits',      type: 'splits-group' },
      { id: 'finish-time', label: 'Total Finish Time', placeholder: 'e.g. 3:42:18',        maxlength: 10 },
    ],
    buildPreview: buildSplitPreview,
  },
  'bib-art': {
    name: 'Finisher Bib Art',
    tagline: 'Your number, monumental',
    fields: [
      { id: 'runner-name', label: 'Runner Name',    placeholder: 'e.g. Anna Müller',            maxlength: 40 },
      { id: 'race-name',   label: 'Race Name',      placeholder: 'e.g. BERLIN MARATHON 2025',   maxlength: 50 },
      { id: 'bib-number',  label: 'Bib Number',     placeholder: 'e.g. 4219',                   maxlength: 6 },
      { id: 'finish-time', label: 'Finish Time',    placeholder: 'e.g. 3:42:18',               maxlength: 10 },
      { id: 'motto',       label: 'Personal Motto', placeholder: 'e.g. Pain is temporary',      maxlength: 60 },
    ],
    buildPreview: buildBibPreview,
  },
};

function init() {
  const id = new URLSearchParams(location.search).get('id');
  const product = PRODUCTS[id];
  if (!product) { showError(); return; }

  document.title = product.name + ' — Finishline Studio';
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-breadcrumb').textContent = product.name;
  document.getElementById('product-label').textContent = product.tagline;
  document.getElementById('field-product-id').value = id;

  buildFormFields(product.fields);
  updatePreview(product);

  document.querySelectorAll('#product-form-fields input, #product-form-fields select')
    .forEach(el => el.addEventListener('input', () => updatePreview(product)));

  document.getElementById('order-form').addEventListener('submit', onSubmit);

  // Fade-in observer (nav is always scrolled on product pages via HTML class)
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function buildFormFields(fields) {
  const container = document.getElementById('product-form-fields');
  fields.forEach(field => {
    if (field.type === 'splits-group') {
      const wrapper = document.createElement('div');
      wrapper.className = 'splits-inputs';
      const legend = document.createElement('div');
      legend.className = 'customizer-form-group';
      legend.innerHTML = '<label>Split Times (every 5 km)</label>';
      wrapper.appendChild(legend);
      for (let i = 1; i <= 8; i++) {
        const group = document.createElement('div');
        group.className = 'customizer-form-group';
        group.innerHTML = `
          <label for="split-${i}">${i * 5} km</label>
          <input type="text" id="split-${i}" name="split_${i}" placeholder="e.g. 0:23:14" maxlength="10" />
        `;
        wrapper.appendChild(group);
      }
      container.appendChild(wrapper);
      return;
    }

    const group = document.createElement('div');
    group.className = 'customizer-form-group';
    group.innerHTML = `
      <label for="${field.id}">${field.label}</label>
      <input type="text" id="${field.id}" name="${field.id}" placeholder="${field.placeholder}" maxlength="${field.maxlength}" />
    `;
    container.appendChild(group);
  });
}

function getValues() {
  const vals = {};
  document.querySelectorAll('#product-form-fields input, #product-form-fields select').forEach(el => {
    vals[el.id] = el.value;
  });
  return vals;
}

function updatePreview(product) {
  const container = document.getElementById('preview-container');
  const values = getValues();
  product.buildPreview(container, values);
}

function buildClassicPreview(container, values) {
  const name = values['runner-name'] || 'Your Name';
  const race = values['race-name'] || 'MARATHON 2025';
  const bib = values['bib-number'] || '#';
  const time = values['finish-time'] || '—';
  const pace = values['pace'] ? values['pace'] + ' /km' : '—';

  container.innerHTML = `
    <div class="preview-frame" style="position:relative;">
      <div class="preview-bib">${escHtml(bib)}</div>
      <div class="preview-race-label">${escHtml(race.toUpperCase())}</div>
      <div class="preview-art">
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 15 C108 15 128 35 128 60 C128 85 108 100 85 107 C72 111 64 120 64 133 C64 144 72 150 80 150"
            stroke="#0a0a0a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M80 15 C52 15 32 35 32 60 C32 78 42 92 56 100 C70 108 74 120 74 133"
            stroke="#c8a96e" stroke-width="2" stroke-linecap="round" fill="none" stroke-dasharray="4 4"/>
          <path d="M80 60 C88 55 95 58 98 66 C101 74 96 82 88 84 C80 86 73 81 72 73"
            stroke="#0a0a0a" stroke-width="1.5" fill="none" opacity="0.3"/>
          <circle cx="80" cy="15" r="5" fill="#c8a96e"/>
          <circle cx="77" cy="141" r="5" fill="#0a0a0a"/>
          <circle cx="77" cy="141" r="8" fill="none" stroke="#c8a96e" stroke-width="1.5"/>
        </svg>
      </div>
      <div class="preview-name">${escHtml(name)}</div>
      <div class="preview-line"></div>
      <div class="preview-stats">
        <div class="preview-stat">
          <span class="preview-stat-val">${escHtml(time)}</span>
          <span class="preview-stat-lbl">Finish Time</span>
        </div>
        <div class="preview-stat">
          <span class="preview-stat-val">${escHtml(pace)}</span>
          <span class="preview-stat-lbl">Avg Pace</span>
        </div>
      </div>
    </div>
  `;
}

function buildElevationPreview(container, values) {
  const race = values['race-name'] || 'ULTRATRAIL';
  const startElev = parseInt(values['start-elevation']) || 500;
  const peakElev = parseInt(values['peak-elevation']) || 2500;
  const time = values['finish-time'] || '—';

  // Normalize elevation to SVG coords (viewBox 0 0 200 80, y inverted)
  const svgW = 200;
  const svgH = 80;
  const minE = Math.min(startElev, startElev * 0.9);
  const maxE = peakElev;
  const range = maxE - minE || 1;
  const toY = e => svgH - ((e - minE) / range) * (svgH * 0.75) - svgH * 0.1;

  const pts = [
    [0,    toY(startElev)],
    [50,   toY(startElev + (peakElev - startElev) * 0.4)],
    [100,  toY(peakElev)],
    [150,  toY(startElev + (peakElev - startElev) * 0.25)],
    [200,  toY(startElev)],
  ];
  const polyline = pts.map(p => p.join(',')).join(' ');
  const fillPath = `M${pts[0][0]},${svgH} ` + pts.map(p => `L${p[0]},${p[1]}`).join(' ') + ` L${pts[pts.length-1][0]},${svgH} Z`;

  container.innerHTML = `
    <div class="preview-frame preview-elevation" style="position:relative;">
      <div class="preview-race-label">${escHtml(race.toUpperCase())}</div>
      <svg class="elevation-chart" viewBox="0 0 ${svgW} ${svgH}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="${fillPath}" fill="rgba(200,169,110,0.12)"/>
        <polyline points="${polyline}" stroke="#c8a96e" stroke-width="2" stroke-linejoin="round" fill="none"/>
        <circle cx="${pts[2][0]}" cy="${pts[2][1]}" r="4" fill="#c8a96e"/>
        <circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="3" fill="rgba(255,255,255,0.4)"/>
        <circle cx="${pts[4][0]}" cy="${pts[4][1]}" r="3" fill="rgba(255,255,255,0.4)"/>
      </svg>
      <div class="elevation-label">
        <span>${startElev}m start</span>
        <span>${peakElev}m peak</span>
        <span>${startElev}m finish</span>
      </div>
      <div class="preview-line"></div>
      <div class="preview-stats">
        <div class="preview-stat">
          <span class="preview-stat-val">${escHtml(time)}</span>
          <span class="preview-stat-lbl">Finish Time</span>
        </div>
        <div class="preview-stat">
          <span class="preview-stat-val">${peakElev - startElev}m</span>
          <span class="preview-stat-lbl">Net Gain</span>
        </div>
      </div>
    </div>
  `;
}

function buildSplitPreview(container, values) {
  const name = values['runner-name'] || 'Your Name';
  const race = values['race-name'] || 'MARATHON 2025';
  const total = values['finish-time'] || '—';

  let rows = '';
  for (let i = 1; i <= 8; i++) {
    const splitVal = values[`split-${i}`] || '—';
    rows += `
      <tr>
        <td class="split-km">${i * 5} km</td>
        <td class="split-time">${escHtml(splitVal)}</td>
      </tr>
    `;
  }

  container.innerHTML = `
    <div class="preview-frame preview-splits" style="position:relative;">
      <div class="preview-race-label">${escHtml(race.toUpperCase())}</div>
      <div class="preview-name" style="font-size:1.4rem; margin-bottom:1rem;">${escHtml(name)}</div>
      <div class="preview-line" style="margin-bottom:1rem;"></div>
      <table class="splits-table">
        <tbody>${rows}</tbody>
        <tfoot>
          <tr class="splits-total">
            <td><strong>Total</strong></td>
            <td class="split-time"><strong>${escHtml(total)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

function buildBibPreview(container, values) {
  const name = values['runner-name'] || 'Your Name';
  const race = values['race-name'] || 'MARATHON 2025';
  const bib = values['bib-number'] || '0000';
  const time = values['finish-time'] || '—';
  const motto = values['motto'] || '';

  container.innerHTML = `
    <div class="preview-frame preview-bib-art" style="position:relative; text-align:center;">
      <div class="preview-race-label">${escHtml(race.toUpperCase())}</div>
      <div class="bib-number-display">${escHtml(bib)}</div>
      <div class="preview-name" style="font-size:1.3rem; margin-bottom:0.5rem;">${escHtml(name)}</div>
      <div class="preview-line"></div>
      <div class="preview-stats">
        <div class="preview-stat">
          <span class="preview-stat-val">${escHtml(time)}</span>
          <span class="preview-stat-lbl">Finish Time</span>
        </div>
      </div>
      ${motto ? `<div class="bib-motto">"${escHtml(motto)}"</div>` : ''}
    </div>
  `;
}

function onSubmit(e) {
  const product = PRODUCTS[new URLSearchParams(location.search).get('id')];
  if (!product) return;

  // Validate required product fields
  let valid = true;
  document.querySelectorAll('#product-form-fields input[id]').forEach(el => {
    el.classList.remove('error');
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    }
  });

  if (!valid) {
    e.preventDefault();
    document.querySelector('#product-form-fields .error')?.focus();
    return;
  }

  // Populate summary hidden field
  const summary = {};
  product.fields.forEach(field => {
    if (field.type === 'splits-group') {
      for (let i = 1; i <= 8; i++) {
        const el = document.getElementById(`split-${i}`);
        if (el) summary[`split_${i * 5}km`] = el.value;
      }
    } else {
      const el = document.getElementById(field.id);
      if (el) summary[field.label] = el.value;
    }
  });
  document.getElementById('field-summary').value = JSON.stringify(summary);
}

function showError() {
  const section = document.querySelector('.product-customizer');
  if (section) {
    section.innerHTML = `
      <div class="container">
        <div class="product-error">
          <p>Product not found. Please choose a valid product.</p>
          <a href="../index.html#products" class="btn btn-dark">Back to Products</a>
        </div>
      </div>
    `;
  }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', init);
