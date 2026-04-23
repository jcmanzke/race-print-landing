// ===== LANDING PAGE LIVE CUSTOMIZER =====

const HOME_PRODUCT_DEFS = {
  'marathon-classic': {
    nameKey: 'product.marathon_classic.name',
    taglineKey: 'product.marathon_classic.tagline',
    fields: [
      { id: 'runner-name',  labelKey: 'field.runner_name',  placeholderKey: 'placeholder.runner_name',  maxlength: 40 },
      { id: 'race-name',   labelKey: 'field.race_name',    placeholderKey: 'placeholder.race_name',    maxlength: 50 },
      { id: 'bib-number',  labelKey: 'field.bib_number',   placeholderKey: 'placeholder.bib_number',   maxlength: 6  },
      { id: 'finish-time', labelKey: 'field.finish_time',  placeholderKey: 'placeholder.finish_time',  maxlength: 10 },
      { id: 'pace',        labelKey: 'field.avg_pace',     placeholderKey: 'placeholder.avg_pace',     maxlength: 8  },
    ],
    buildPreview: buildClassicPreview,
  },
  'elevation-profile': {
    nameKey: 'product.elevation_profile.name',
    taglineKey: 'product.elevation_profile.tagline',
    fields: [
      { id: 'race-name',       labelKey: 'field.race_name',       placeholderKey: 'placeholder.race_name_trail', maxlength: 50 },
      { id: 'start-elevation', labelKey: 'field.start_elevation', placeholderKey: 'placeholder.start_elevation', maxlength: 6  },
      { id: 'peak-elevation',  labelKey: 'field.peak_elevation',  placeholderKey: 'placeholder.peak_elevation',  maxlength: 6  },
      { id: 'total-ascent',    labelKey: 'field.total_ascent',    placeholderKey: 'placeholder.total_ascent',    maxlength: 6  },
      { id: 'finish-time',     labelKey: 'field.finish_time',     placeholderKey: 'placeholder.finish_time_trail', maxlength: 10 },
    ],
    buildPreview: buildElevationPreview,
  },
  'split-times': {
    nameKey: 'product.split_times.name',
    taglineKey: 'product.split_times.tagline',
    fields: [
      { id: 'runner-name', labelKey: 'field.runner_name',      placeholderKey: 'placeholder.runner_name', maxlength: 40 },
      { id: 'race-name',   labelKey: 'field.race_name',        placeholderKey: 'placeholder.race_name',   maxlength: 50 },
      { id: 'splits',      type: 'splits-group' },
      { id: 'finish-time', labelKey: 'field.total_finish_time', placeholderKey: 'placeholder.finish_time', maxlength: 10 },
    ],
    buildPreview: buildSplitPreview,
  },
  'bib-art': {
    nameKey: 'product.bib_art.name',
    taglineKey: 'product.bib_art.tagline',
    fields: [
      { id: 'runner-name', labelKey: 'field.runner_name',    placeholderKey: 'placeholder.runner_name',    maxlength: 40 },
      { id: 'race-name',   labelKey: 'field.race_name',      placeholderKey: 'placeholder.race_name',      maxlength: 50 },
      { id: 'bib-number',  labelKey: 'field.bib_number',     placeholderKey: 'placeholder.bib_number',     maxlength: 6  },
      { id: 'finish-time', labelKey: 'field.finish_time',    placeholderKey: 'placeholder.finish_time',    maxlength: 10 },
      { id: 'motto',       labelKey: 'field.personal_motto', placeholderKey: 'placeholder.personal_motto', maxlength: 60 },
    ],
    buildPreview: buildBibPreview,
  },
};

let currentStyleId = 'marathon-classic';

function t(key) {
  return window.i18n ? window.i18n.t(key) : key;
}

function initCustomizer() {
  document.querySelectorAll('.style-tab').forEach(btn => {
    btn.addEventListener('click', () => switchStyle(btn.dataset.style));
  });
  switchStyle(currentStyleId);
}

function switchStyle(styleId) {
  currentStyleId = styleId;
  const def = HOME_PRODUCT_DEFS[styleId];
  if (!def) return;

  document.querySelectorAll('.style-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.style === styleId);
  });

  const taglineEl = document.getElementById('home-customizer-tagline');
  if (taglineEl) taglineEl.textContent = t(def.taglineKey);

  const ctaEl = document.getElementById('home-customizer-cta');
  if (ctaEl) {
    ctaEl.href = 'products/product.html?id=' + styleId;
    ctaEl.textContent = t('products.order_cta');
  }

  buildHomeFields(def.fields);

  document.querySelectorAll('#home-customizer-fields input').forEach(el => {
    el.addEventListener('input', updateHomePreview);
  });

  updateHomePreview();
}

function buildHomeFields(fields) {
  const container = document.getElementById('home-customizer-fields');
  container.innerHTML = '';

  fields.forEach(field => {
    if (field.type === 'splits-group') {
      const wrapper = document.createElement('div');
      wrapper.className = 'splits-inputs';

      const legend = document.createElement('div');
      legend.className = 'customizer-form-group';
      legend.innerHTML = `<label>${t('field.split_times')}</label>`;
      wrapper.appendChild(legend);

      const grid = document.createElement('div');
      grid.className = 'splits-grid';
      for (let i = 1; i <= 8; i++) {
        const group = document.createElement('div');
        group.className = 'customizer-form-group';
        group.innerHTML = `
          <label for="home-split-${i}">${i * 5} km</label>
          <input type="text" id="home-split-${i}" placeholder="${t('placeholder.split_input')}" maxlength="10" />
        `;
        grid.appendChild(group);
      }
      wrapper.appendChild(grid);
      container.appendChild(wrapper);
      return;
    }

    const group = document.createElement('div');
    group.className = 'customizer-form-group';
    group.innerHTML = `
      <label for="home-${field.id}">${t(field.labelKey)}</label>
      <input type="text" id="home-${field.id}" placeholder="${t(field.placeholderKey)}" maxlength="${field.maxlength}" />
    `;
    container.appendChild(group);
  });
}

function getHomeValues() {
  const vals = {};
  document.querySelectorAll('#home-customizer-fields input').forEach(el => {
    vals[el.id.replace(/^home-/, '')] = el.value;
  });
  return vals;
}

function updateHomePreview() {
  const def = HOME_PRODUCT_DEFS[currentStyleId];
  if (!def) return;
  const container = document.getElementById('home-preview-container');
  if (!container) return;
  def.buildPreview(container, getHomeValues());
}

// ===== PREVIEW BUILDERS =====

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildClassicPreview(container, values) {
  const name = values['runner-name'] || t('preview.default_name');
  const race = values['race-name'] || t('preview.default_race');
  const bib  = values['bib-number'] || t('preview.default_bib');
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
          <span class="preview-stat-lbl">${t('preview.finish_time')}</span>
        </div>
        <div class="preview-stat">
          <span class="preview-stat-val">${escHtml(pace)}</span>
          <span class="preview-stat-lbl">${t('preview.avg_pace')}</span>
        </div>
      </div>
    </div>
  `;
}

function buildElevationPreview(container, values) {
  const race      = values['race-name'] || 'ULTRATRAIL';
  const startElev = parseInt(values['start-elevation']) || 500;
  const peakElev  = parseInt(values['peak-elevation'])  || 2500;
  const time      = values['finish-time'] || '—';

  const svgW = 200, svgH = 80;
  const minE  = Math.min(startElev, startElev * 0.9);
  const maxE  = peakElev;
  const range = maxE - minE || 1;
  const toY   = e => svgH - ((e - minE) / range) * (svgH * 0.75) - svgH * 0.1;

  const pts = [
    [0,   toY(startElev)],
    [50,  toY(startElev + (peakElev - startElev) * 0.4)],
    [100, toY(peakElev)],
    [150, toY(startElev + (peakElev - startElev) * 0.25)],
    [200, toY(startElev)],
  ];
  const polyline = pts.map(p => p.join(',')).join(' ');
  const fillPath = `M${pts[0][0]},${svgH} ` + pts.map(p => `L${p[0]},${p[1]}`).join(' ') + ` L${pts[pts.length - 1][0]},${svgH} Z`;

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
        <span>${startElev}m ${t('preview.start')}</span>
        <span>${peakElev}m ${t('preview.peak')}</span>
        <span>${startElev}m ${t('preview.finish')}</span>
      </div>
      <div class="preview-line"></div>
      <div class="preview-stats">
        <div class="preview-stat">
          <span class="preview-stat-val">${escHtml(time)}</span>
          <span class="preview-stat-lbl">${t('preview.finish_time')}</span>
        </div>
        <div class="preview-stat">
          <span class="preview-stat-val">${peakElev - startElev}m</span>
          <span class="preview-stat-lbl">${t('preview.net_gain')}</span>
        </div>
      </div>
    </div>
  `;
}

function buildSplitPreview(container, values) {
  const name  = values['runner-name'] || t('preview.default_name');
  const race  = values['race-name']   || t('preview.default_race');
  const total = values['finish-time'] || '—';

  let rows = '';
  for (let i = 1; i <= 8; i++) {
    rows += `
      <tr>
        <td class="split-km">${i * 5} km</td>
        <td class="split-time">${escHtml(values[`split-${i}`] || '—')}</td>
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
            <td><strong>${t('preview.total')}</strong></td>
            <td class="split-time"><strong>${escHtml(total)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

function buildBibPreview(container, values) {
  const name  = values['runner-name'] || t('preview.default_name');
  const race  = values['race-name']   || t('preview.default_race');
  const bib   = values['bib-number']  || '0000';
  const time  = values['finish-time'] || '—';
  const motto = values['motto']       || '';

  container.innerHTML = `
    <div class="preview-frame preview-bib-art" style="position:relative; text-align:center;">
      <div class="preview-race-label">${escHtml(race.toUpperCase())}</div>
      <div class="bib-number-display">${escHtml(bib)}</div>
      <div class="preview-name" style="font-size:1.3rem; margin-bottom:0.5rem;">${escHtml(name)}</div>
      <div class="preview-line"></div>
      <div class="preview-stats">
        <div class="preview-stat">
          <span class="preview-stat-val">${escHtml(time)}</span>
          <span class="preview-stat-lbl">${t('preview.finish_time')}</span>
        </div>
      </div>
      ${motto ? `<div class="bib-motto">"${escHtml(motto)}"</div>` : ''}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initCustomizer);

document.addEventListener('langchange', () => {
  switchStyle(currentStyleId);
});
