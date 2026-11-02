(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

  // Icons (24px grid, stroke style)
  const ICONS = {
    home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
    file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6',
    layout: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM3 9h18M9 21V9',
    sparkles: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z',
    sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9zM13.7 21a2 2 0 0 1-3.4 0',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z',
    star: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
    car: 'M3 13l2-6h14l2 6v4H3zM3 13h18M7 17v2M17 17v2',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
    check: 'M20 6L9 17l-5-5',
    cal: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
    chart: 'M3 3v18h18M7 15l4-4 3 3 5-6',
    receipt: 'M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6',
    plus: 'M12 5v14M5 12h14',
    wallet: 'M3 7a2 2 0 0 1 2-2h14v4M3 7v10a2 2 0 0 0 2 2h16V9H5a2 2 0 0 1-2-2zM17 14h.01',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
    msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    x: 'M18 6L6 18M6 6l12 12',
    download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
    share: 'M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13',
    back: 'M15 18l-6-6 6-6',
    wifi: 'M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01',
    pool: 'M2 18c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1M8 14V5a2 2 0 0 1 4 0M16 14V5a2 2 0 0 0-4 0',
    kitchen: 'M6 3v8a3 3 0 0 0 3 3v7M6 3v5M9 3v5M18 3c-2 2-3 5-3 8h3v10',
    park: 'M5 3h8a5 5 0 0 1 0 10H5zM9 21V8',
    desk: 'M3 10h18M5 10v10M19 10v10M3 6h18v4',
    ac: 'M12 2v20M4.9 7l14.2 10M19.1 7L4.9 17'
  };
  const svg = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n] || ''}"/></svg>`;
  const fill = (root = document) => $$('i[data-ic]', root).forEach(el => el.outerHTML = svg(el.dataset.ic));
  fill();

  // Tabs
  $$('#uiTabs .p-tab').forEach(t => t.onclick = () => {
    $$('#uiTabs .p-tab').forEach(x => x.classList.toggle('active', x === t));
    $$('.u-panel').forEach(p => p.classList.toggle('active', p.dataset.u === t.dataset.u));
  });

  /* ---------- 1. Resume builder ---------- */
  const sugg = [
    'Built React dashboards used by 40 internal teams. Cut report load time by 35%.',
    'Led the move of 12 dashboards to React. Improved page speed by 35% and cut support tickets by 20%.'
  ];
  let si = 0, applied = false;
  const rJob = $('#rJob'), rCo = $('#rCo'), rDesc = $('#rDesc');
  const rsRender = () => {
    $('#pvJob').textContent = rJob.value || 'Job title';
    $('#pvRole').textContent = rJob.value || 'Job title';
    $('#pvCo').textContent = rCo.value || 'Company';
    const ul = $('#pvDesc'); ul.innerHTML = '';
    (rDesc.value.match(/[^.]+\.?/g) || []).map(s => s.trim()).filter(Boolean).forEach(t => {
      const li = document.createElement('li'); li.textContent = t; ul.appendChild(li);
    });
    const d = rDesc.value;
    const score = Math.min(98, 70 + Math.min(Math.floor(d.length / 8), 12) + (/\d/.test(d) ? 10 : 0));
    $('#atsVal').textContent = score;
    $('#atsRing').style.setProperty('--p', score);
  };
  [rJob, rCo, rDesc].forEach(i => i.addEventListener('input', rsRender));
  const showSugg = () => { $('#rAiTxt').textContent = sugg[si]; };
  $('#rApply').onclick = () => { rDesc.value = sugg[si]; rsRender(); $('#rAi').hidden = true; $('#rAiDone').hidden = false; };
  $('#rNext').onclick = () => { si = (si + 1) % sugg.length; showSugg(); };
  $('#rDismiss').onclick = () => { $('#rAi').hidden = true; };
  $$('#rTpl button').forEach(b => b.onclick = () => {
    $$('#rTpl button').forEach(x => x.classList.toggle('on', x === b));
    $('#rPaper').className = 'paper ' + b.dataset.t;
  });
  let lastW = 0;
  const fitPaper = () => {
    const box = $('#rBox'), w = box.clientWidth;
    if (!w || Math.abs(w - lastW) < 2) return;
    lastW = w;
    const s = w / 520;
    $('#rPaper').style.transform = `scale(${s})`;
    box.style.height = (735 * s) + 'px';
  };
  new ResizeObserver(fitPaper).observe($('#rBox'));
  showSugg(); rsRender(); fitPaper();

  /* ---------- 2. Skill analyzer ---------- */
  const roles = {
    fs: { name: 'Full Stack Developer', s: [['React', 'Frontend', 90, 92, 8], ['Node.js', 'Backend', 74, 88, 11], ['TypeScript', 'Language', 30, 85, 18], ['Docker', 'DevOps', 20, 70, 14], ['MongoDB', 'Database', 75, 60, 3], ['AWS', 'Cloud', 25, 72, 16]] },
    da: { name: 'Data Analyst', s: [['SQL', 'Database', 80, 95, 6], ['Python', 'Language', 65, 90, 12], ['Power BI', 'BI tool', 40, 78, 15], ['Statistics', 'Concepts', 55, 80, 5], ['Excel', 'Tool', 85, 70, 1], ['Tableau', 'BI tool', 20, 65, 9]] },
    do: { name: 'DevOps Engineer', s: [['Linux', 'Systems', 70, 92, 4], ['Docker', 'Containers', 45, 90, 10], ['Kubernetes', 'Containers', 15, 88, 19], ['CI/CD', 'Delivery', 50, 85, 13], ['Terraform', 'IaC', 10, 75, 21], ['AWS', 'Cloud', 35, 90, 16]] }
  };
  const status = (y, d) => y / d >= .8 ? ['Strong', 'ok'] : y / d >= .5 ? ['Growing', 'warn'] : ['Gap', 'bad'];
  const renderSg = (key) => {
    const r = roles[key], s = r.s;
    const match = Math.round(s.reduce((a, x) => a + Math.min(x[2] / x[3], 1), 0) / s.length * 100);
    const strong = s.filter(x => x[2] / x[3] >= .8).length;
    const gaps = s.filter(x => x[2] / x[3] < .5);
    $('#sgKpis').innerHTML = `
      <div class="a-card kpi"><span>Role match</span><b>${match}%</b><small>▲ 6% since last scan</small></div>
      <div class="a-card kpi"><span>Skills matched</span><b>${strong} / ${s.length}</b><small class="a-mut">At 80% of demand or more</small></div>
      <div class="a-card kpi"><span>Critical gaps</span><b>${gaps.length}</b><small class="a-mut">Below 50% of demand</small></div>
      <div class="a-card kpi"><span>Market demand</span><b>High</b><small>▲ 14% job posts this year</small></div>`;
    $('#sgBars').innerHTML = s.map(x => `<div class="sg-bar"><span>${x[0]}</span><div class="sg-tracks"><i class="you" style="width:${x[2]}%"></i><i class="dem" style="width:${x[3]}%"></i></div><b>${x[2]}%</b></div>`).join('');
    const top = [...s].sort((a, b) => (b[3] - b[2]) - (a[3] - a[2])).slice(0, 4);
    $('#sgPath').innerHTML = top.map((x, i) => `<li><i>${i + 1}</i><div><b>Learn ${x[0]}</b><span class="a-sub">About ${Math.round((x[3] - x[2]) / 4) + 4} hours</span></div><button class="a-btn sec sm">Start</button></li>`).join('');
    $('#sgTable').innerHTML = s.map((x, i) => {
      const st = status(x[2], x[3]);
      const dots = Array.from({ length: 5 }, (_, k) => `<i class="${k < Math.round(x[2] / 20) ? 'on' : ''}"></i>`).join('');
      return `<tr class="click" data-i="${i}"><td><b>${x[0]}</b></td><td>${x[1]}</td><td><span class="dots">${dots}</span></td><td><div class="dm"><div class="a-bar"><i style="width:${x[3]}%"></i></div>${x[3]}%</div></td><td><span class="up">▲ ${x[4]}%</span></td><td><span class="a-badge ${st[1]}">${st[0]}</span></td></tr>`;
    }).join('');
    $('#sgNote').textContent = 'Click a row to see the next step.';
    $$('#sgTable tr').forEach(tr => tr.onclick = () => {
      $$('#sgTable tr').forEach(x => x.classList.toggle('sel', x === tr));
      const x = s[+tr.dataset.i];
      $('#sgNote').textContent = x[2] / x[3] < .8 ? `${x[0]}: build one small project with it to close the gap.` : `${x[0]}: strong. Keep one recent project to prove it.`;
    });
  };
  $('#sgRole').onchange = (e) => renderSg(e.target.value);
  renderSg('fs');

  /* ---------- 3. Stay marketplace ---------- */
  const stays = [
    { id: 0, t: 'Beach Studio', c: 'Goa', k: 'Beach', p: 3200, r: 4.9, n: 128, g: 2, b: 1, h: 'Priya' },
    { id: 1, t: 'Garden Villa', c: 'Goa', k: 'Beach', p: 5200, r: 4.8, n: 86, g: 6, b: 3, h: 'Rohan' },
    { id: 2, t: 'Pine Cabin', c: 'Manali', k: 'Mountain', p: 2800, r: 4.9, n: 64, g: 4, b: 2, h: 'Meera' },
    { id: 3, t: 'Snow View Cottage', c: 'Kasol', k: 'Mountain', p: 3400, r: 4.7, n: 41, g: 3, b: 2, h: 'Karan' },
    { id: 4, t: 'City Loft', c: 'Pune', k: 'City', p: 2400, r: 4.6, n: 97, g: 2, b: 1, h: 'Neha' },
    { id: 5, t: 'Heritage Flat', c: 'Jaipur', k: 'City', p: 3000, r: 4.8, n: 73, g: 4, b: 2, h: 'Vikram' },
    { id: 6, t: 'Lake House', c: 'Udaipur', k: 'Lake', p: 4100, r: 4.9, n: 152, g: 5, b: 3, h: 'Ananya' },
    { id: 7, t: 'Backwater Cabin', c: 'Alleppey', k: 'Lake', p: 3600, r: 4.8, n: 59, g: 3, b: 1, h: 'Joseph' }
  ];
  const art = (k, seed, par = 'xMidYMid slice') => {
    const w = (i) => ((seed * 37 + i * 53) % 100) / 100;
    const scenes = {
      Beach: `<defs><linearGradient id="a${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd29d"/><stop offset="1" stop-color="#ff8f8f"/></linearGradient></defs><rect width="400" height="300" fill="url(#a${seed})"/><circle cx="${230 + w(1) * 90}" cy="120" r="38" fill="#fff3c4"/><rect y="170" width="400" height="70" fill="#27a9b8"/><path d="M0 190q50-14 100 0t100 0 100 0 100 0" stroke="#fff" stroke-opacity=".6" fill="none" stroke-width="3"/><rect y="240" width="400" height="60" fill="#f2d6a0"/><g transform="translate(${w(3) * 200},0)"><rect x="60" y="210" width="90" height="46" fill="#fff"/><path d="M52 212l53-34 53 34z" fill="${['#e4572e', '#2b6cb0', '#7c3aed'][seed % 3]}"/><rect x="95" y="228" width="20" height="28" fill="#6d4c41"/></g>`,
      Mountain: `<defs><linearGradient id="a${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cc3f2"/><stop offset="1" stop-color="#eaf3ff"/></linearGradient></defs><rect width="400" height="300" fill="url(#a${seed})"/><path d="M-10 250L110 90l90 120 70-80 140 150z" fill="#6b86a6"/><path d="M110 90l-28 38 20-8 12 14 14-14 20 8z" fill="#fff"/><path d="M-10 270L90 170l100 100z M150 270l110-90 150 90z" fill="#3f5d7d"/><rect y="250" width="400" height="50" fill="#2f6b4f"/><path d="M300 250l18-60 18 60zM335 250l14-48 14 48z" fill="#1d4a37"/><g transform="translate(${w(4) * 120},0)"><rect x="70" y="220" width="70" height="40" fill="${seed % 2 ? '#8d5a3b' : '#b45f3a'}"/><path d="M62 222l43-30 43 30z" fill="${seed % 2 ? '#4a2f1f' : '#2f3e55'}"/></g>`,
      City: `<defs><linearGradient id="a${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#27325f"/><stop offset="1" stop-color="#8a6fd1"/></linearGradient></defs><rect width="400" height="300" fill="url(#a${seed})"/><circle cx="320" cy="70" r="22" fill="#fdf0c2"/><rect x="30" y="120" width="70" height="180" fill="#1a2145"/><rect x="110" y="70" width="80" height="230" fill="#222b57"/><rect x="200" y="140" width="60" height="160" fill="#1a2145"/><rect x="270" y="100" width="90" height="200" fill="#2a3466"/>${Array.from({ length: 36 }, (_, i) => `<rect x="${40 + (i % 6) * 12 + (i > 17 ? 160 : 0)}" y="${135 + Math.floor((i % 18) / 6) * 26}" width="6" height="10" fill="${((i * seed) % 3) ? '#ffd27a' : '#3a4580'}"/>`).join('')}`,
      Lake: `<defs><linearGradient id="a${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbd3a0"/><stop offset="1" stop-color="#b9dcec"/></linearGradient></defs><rect width="400" height="300" fill="url(#a${seed})"/><circle cx="${100 + w(2) * 160}" cy="110" r="30" fill="#fff0c8"/><path d="M-10 190q80-90 170-20t140-30 100 50v50H-10z" fill="#4a8a62"/><rect y="190" width="400" height="110" fill="#3f8fb5"/><path d="M40 215h90M180 235h120M70 255h70" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/><g transform="translate(${-w(5) * 190},0)"><rect x="250" y="170" width="70" height="34" fill="#fff"/><path d="M244 172l41-28 41 28z" fill="${seed % 2 ? '#8d5a3b' : '#c0392b'}"/></g>`
    };
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="${par}" aria-hidden="true">${scenes[k]}</svg>`;
  };
  let cat = 'All'; const saved = new Set([0]);
  $('#stCats').innerHTML = ['All', 'Beach', 'Mountain', 'City', 'Lake'].map(c => `<button class="${c === 'All' ? 'on' : ''}" data-c="${c}">${c === 'All' ? 'All stays' : c}</button>`).join('');
  const renderStays = () => {
    const q = $('#stQ').value.trim().toLowerCase();
    const list = stays.filter(s => (cat === 'All' || s.k === cat) && (s.c + ' ' + s.t).toLowerCase().includes(q));
    $('#stGrid').innerHTML = list.length ? list.map(s => `
      <article class="st-card" data-id="${s.id}" tabindex="0" role="button" aria-label="Open ${s.t}">
        <div class="st-art">${art(s.k, s.id + 1)}<span class="st-heart ${saved.has(s.id) ? 'on' : ''}" data-h="${s.id}"><i data-ic="heart"></i></span></div>
        <div class="st-meta"><div class="a-between"><b>${s.t}, ${s.c}</b><span><i data-ic="star"></i>${s.r}</span></div><span class="a-mut">${s.g} guests · ${s.b} bedroom${s.b > 1 ? 's' : ''} · ${s.n} reviews</span><span><b>${inr(s.p)}</b> <span class="a-mut">night</span></span></div>
      </article>`).join('') : '<div class="a-empty" style="grid-column:1/-1"><b>No stays found</b>Try another city or category.</div>';
    fill($('#stGrid'));
    $$('.st-card').forEach(c => {
      const open = () => openStay(+c.dataset.id);
      c.onclick = (e) => { if (e.target.closest('.st-heart')) { const id = +e.target.closest('.st-heart').dataset.h; saved.has(id) ? saved.delete(id) : saved.add(id); e.target.closest('.st-heart').classList.toggle('on'); return; } open(); };
      c.onkeydown = (e) => { if (e.key === 'Enter') open(); };
    });
  };
  $('#stQ').addEventListener('input', renderStays);
  $$('#stCats button').forEach(b => b.onclick = () => { cat = b.dataset.c; $$('#stCats button').forEach(x => x.classList.toggle('on', x === b)); renderStays(); });

  const openStay = (id) => {
    const s = stays[id], d = $('#stDetail');
    d.hidden = false; d.scrollTop = 0;
    d.innerHTML = `
      <button class="a-btn sec sm" id="sdBack"><i data-ic="back"></i>Back to results</button>
      <div class="sd-cols" style="margin-top:14px">
        <div class="sd-info">
          <div class="sd-art">${art(s.k, s.id + 1, 'xMidYMax slice')}</div>
          <h3>${s.t}, ${s.c}</h3>
          <p class="a-mut">${s.g} guests · ${s.b} bedroom${s.b > 1 ? 's' : ''} · ★ ${s.r} (${s.n} reviews)</p>
          <div class="sd-host"><span class="a-av">${s.h[0]}</span><div><b>Hosted by ${s.h}</b><p class="a-sub">Superhost · 4 years hosting</p></div></div>
          <b>What this place offers</b>
          <div class="sd-am"><span><i data-ic="wifi"></i>Fast Wi-Fi</span><span><i data-ic="kitchen"></i>Full kitchen</span><span><i data-ic="ac"></i>Air conditioning</span><span><i data-ic="park"></i>Free parking</span><span><i data-ic="desk"></i>Workspace</span><span><i data-ic="pool"></i>Shared pool</span></div>
          <p class="a-mut">A calm place in ${s.c}. Check in is self-service. The host replies within one hour.</p>
        </div>
        <div class="sd-book" id="sdBook">
          <div class="big">${inr(s.p)} <small>night</small></div>
          <div class="a-two"><label>Check-in<input type="date" id="sdIn" value="2026-12-10"></label><label>Check-out<input type="date" id="sdOut" value="2026-12-13"></label></div>
          <label>Guests<select id="sdG">${Array.from({ length: s.g }, (_, i) => `<option>${i + 1} guest${i ? 's' : ''}</option>`).join('')}</select></label>
          <div class="sd-line"><span id="sdN"></span><span id="sdSub"></span></div>
          <div class="sd-line"><span>Service fee</span><span id="sdFee"></span></div>
          <div class="sd-total"><span>Total</span><span id="sdTot"></span></div>
          <button class="a-btn" id="sdGo" style="justify-content:center;padding:12px">Reserve</button>
          <p class="a-sub" style="text-align:center">You will not be charged yet</p>
        </div>
      </div>`;
    fill(d);
    const calc = () => {
      const n = Math.max(0, Math.round((new Date($('#sdOut').value) - new Date($('#sdIn').value)) / 864e5));
      const sub = n * s.p, fee = sub * .1;
      $('#sdN').textContent = `${inr(s.p)} × ${n} night${n === 1 ? '' : 's'}`;
      $('#sdSub').textContent = inr(sub); $('#sdFee').textContent = inr(fee); $('#sdTot').textContent = inr(sub + fee);
      $('#sdGo').disabled = n < 1;
    };
    $('#sdIn').onchange = $('#sdOut').onchange = calc; calc();
    $('#sdBack').onclick = () => { d.hidden = true; };
    $('#sdGo').onclick = () => {
      $('#sdBook').innerHTML = `<div class="sd-ok"><span class="tick"><i data-ic="check"></i></span><b style="font-size:18px">Request sent</b><p class="a-sub">${s.h} will reply soon. Booking ID SH-${40000 + Math.floor(Math.random() * 9999)}.</p><button class="a-btn sec sm" id="sdDone" style="justify-self:center">Back to results</button></div>`;
      fill($('#sdBook')); $('#sdDone').onclick = () => { d.hidden = true; };
    };
  };
  renderStays();

  $('#toHost').onclick = () => { $('#stGuest').hidden = true; $('#stHost').hidden = false; };
  $('#toGuest').onclick = () => { $('#stHost').hidden = true; $('#stGuest').hidden = false; };
  const earn = [['Jun', 28], ['Jul', 34], ['Aug', 31], ['Sep', 42], ['Oct', 39], ['Nov', 48]];
  $('#stChart').innerHTML = earn.map(e => `<div title="${e[0]}: ₹${e[1]}k"><b>${e[1]}</b><i style="height:${e[1] * 2.6}px"></i>${e[0]}</div>`).join('');
  const reqs = [['Arjun Rao', 'Beach Studio, Goa', '12 – 15 Dec', 3200 * 3 * 1.1], ['Sara Khan', 'City Loft, Pune', '20 – 22 Dec', 2400 * 2 * 1.1], ['Dev Patel', 'Beach Studio, Goa', '26 – 30 Dec', 3200 * 4 * 1.1]];
  const reqState = ['pending', 'pending', 'pending'];
  const renderReqs = () => {
    $('#stReqs').innerHTML = reqs.map((r, i) => `<tr><td><div class="a-row"><span class="a-av" style="width:28px;height:28px">${r[0][0]}</span><b>${r[0]}</b></div></td><td>${r[1]}</td><td>${r[2]}</td><td>${inr(r[3])}</td><td>${reqState[i] === 'pending' ? `<div class="st-act"><button class="a-btn sm" data-a="y" data-i="${i}">Accept</button><button class="a-btn sec sm" data-a="n" data-i="${i}">Decline</button></div>` : `<span class="a-badge ${reqState[i] === 'yes' ? 'ok' : 'bad'}">${reqState[i] === 'yes' ? 'Confirmed' : 'Declined'}</span>`}</td></tr>`).join('');
    $$('#stReqs button').forEach(b => b.onclick = () => { reqState[+b.dataset.i] = b.dataset.a === 'y' ? 'yes' : 'no'; renderReqs(); });
  };
  renderReqs();

  /* ---------- 4. Traffic challan ---------- */
  const DB = {
    JH01AB1234: { plate: 'JH 01 AB 1234', make: 'Honda City ZX', fuel: 'Petrol', reg: '14 Mar 2019', owner: 'R*** Kumar', ins: ['Valid till 21 Aug 2027', 'ok'], puc: ['Expired 02 Sep 2026', 'bad'], ch: [
      { no: 'CH-20931', date: '12 Sep 2026', off: 'Signal violation', loc: 'Main Road Junction', amt: 1000, st: 'Unpaid' },
      { no: 'CH-19877', date: '28 Jul 2026', off: 'No seat belt', loc: 'Station Road', amt: 500, st: 'Unpaid' },
      { no: 'CH-18102', date: '03 Mar 2026', off: 'Over speeding', loc: 'Ring Road', amt: 1500, st: 'Paid' },
      { no: 'CH-17390', date: '11 Jan 2026', off: 'Wrong parking', loc: 'City Mall', amt: 500, st: 'Disputed' }] },
    JH05CD5678: { plate: 'JH 05 CD 5678', make: 'Maruti Swift VXi', fuel: 'Petrol', reg: '02 Nov 2021', owner: 'S*** Devi', ins: ['Valid till 04 Feb 2027', 'ok'], puc: ['Valid till 30 Mar 2027', 'ok'], ch: [
      { no: 'CH-21044', date: '05 Oct 2026', off: 'Lane violation', loc: 'Bypass Road', amt: 700, st: 'Unpaid' }] }
  };
  const stBadge = { Unpaid: 'bad', Paid: 'ok', Disputed: 'warn' };
  let cur = null;
  const renderCh = () => {
    const box = $('#chResult');
    if (!cur) { box.innerHTML = '<div class="a-card a-empty"><b>No record found</b>Check the vehicle number and try again.</div>'; return; }
    box.innerHTML = `
      <div class="ch-grid">
        <div class="a-card"><span class="plate">${cur.plate}</span>
          <div class="ch-dl"><div><span>Vehicle</span><b>${cur.make}</b></div><div><span>Fuel</span><b>${cur.fuel}</b></div><div><span>Registered</span><b>${cur.reg}</b></div><div><span>Owner</span><b>${cur.owner}</b></div>
          <div><span>Insurance</span><span class="a-badge ${cur.ins[1]}">${cur.ins[0]}</span></div><div><span>PUC</span><span class="a-badge ${cur.puc[1]}">${cur.puc[0]}</span></div></div></div>
        <div class="a-card a-flush ch-table">
          <div class="a-between a-pad"><b class="a-h">Challans (${cur.ch.length})</b><span class="a-sub">Select unpaid challans to pay</span></div>
          <table class="a-table"><thead><tr><th></th><th>Challan</th><th>Offence</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>
          ${cur.ch.map((c, i) => `<tr><td><input type="checkbox" data-i="${i}" ${c.st !== 'Unpaid' ? 'disabled' : ''} ${c.sel ? 'checked' : ''} aria-label="Select ${c.no}"></td><td><b>${c.no}</b><br><span class="a-sub">${c.loc}</span></td><td>${c.off}</td><td>${c.date}</td><td>${inr(c.amt)}</td><td><span class="a-badge ${stBadge[c.st]}">${c.st}</span></td></tr>`).join('')}
          </tbody></table>
          <div class="ch-foot"><span id="chSel" class="a-sub"></span><button class="a-btn" id="chPay">Pay selected</button></div>
        </div>
      </div>`;
    const upd = () => {
      const sel = cur.ch.filter(c => c.sel);
      $('#chSel').textContent = sel.length ? `${sel.length} selected · ${inr(sel.reduce((a, c) => a + c.amt, 0))}` : 'Nothing selected';
      $('#chPay').disabled = !sel.length;
    };
    $$('#chResult input[type=checkbox]').forEach(cb => cb.onchange = () => { cur.ch[+cb.dataset.i].sel = cb.checked; upd(); });
    $('#chPay').onclick = openPay; upd();
  };
  const openPay = () => {
    const sel = cur.ch.filter(c => c.sel), tot = sel.reduce((a, c) => a + c.amt, 0), m = $('#chModal');
    m.hidden = false;
    m.innerHTML = `<div class="a-modal-box ch-pay">
      <div class="a-between"><h3 style="font-size:18px">Pay challans</h3><button id="pmX" aria-label="Close"><i data-ic="x"></i></button></div>
      <div class="ch-items">${sel.map(c => `<div><span>${c.no} · ${c.off}</span><b>${inr(c.amt)}</b></div>`).join('')}</div>
      <div class="a-seg" id="pmTabs"><button class="on">UPI</button><button>Card</button><button>Net banking</button></div>
      <label style="margin:0">UPI ID<input value="name@bank"></label>
      <div class="ch-sum"><span>Total</span><span>${inr(tot)}</span></div>
      <button class="a-btn" id="pmGo" style="justify-content:center;padding:12px">Pay ${inr(tot)}</button></div>`;
    fill(m);
    $$('#pmTabs button').forEach(b => b.onclick = () => { $$('#pmTabs button').forEach(x => x.classList.toggle('on', x === b)); m.querySelector('label').firstChild.textContent = b.textContent === 'UPI' ? 'UPI ID' : b.textContent === 'Card' ? 'Card number' : 'Select bank'; });
    $('#pmX').onclick = () => { m.hidden = true; };
    $('#pmGo').onclick = () => {
      sel.forEach(c => { c.st = 'Paid'; c.sel = false; });
      m.innerHTML = `<div class="a-modal-box"><div class="sd-ok"><span class="tick"><i data-ic="check"></i></span><b style="font-size:18px">Payment successful</b><p class="a-sub">Receipt RCPT-${700000 + Math.floor(Math.random() * 99999)} · ${inr(tot)}</p><button class="a-btn" id="pmDone" style="justify-self:center">Done</button></div></div>`;
      fill(m); $('#pmDone').onclick = () => { m.hidden = true; renderCh(); };
    };
  };
  const search = (v) => { cur = DB[v.replace(/\s+/g, '').toUpperCase()] || null; renderCh(); };
  $('#chForm').onsubmit = (e) => { e.preventDefault(); search($('#chNo').value); };
  $$('.ch-try button').forEach(b => b.onclick = () => { $('#chNo').value = b.dataset.v; search(b.dataset.v); });
  $('#chModal').onclick = (e) => { if (e.target.id === 'chModal') $('#chModal').hidden = true; };
  search('JH 01 AB 1234');
})();
