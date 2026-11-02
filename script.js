(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const safe = (fn) => { try { return fn(); } catch (e) { return null; } };

  // Theme and motion (saved in localStorage when it is available)
  const root = document.documentElement;
  const saved = safe(() => localStorage.getItem('theme'));
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = (t) => {
    root.dataset.theme = t;
    $('#themeBtn').textContent = t === 'dark' ? 'Light' : 'Dark';
    safe(() => localStorage.setItem('theme', t));
  };
  setTheme(saved || 'dark');
  $('#themeBtn').onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

  const setMotion = (off) => {
    document.body.classList.toggle('no-motion', off);
    $('#motionBtn').textContent = off ? 'Motion off' : 'Motion on';
    $('#motionBtn').setAttribute('aria-pressed', String(off));
    safe(() => localStorage.setItem('motionOff', off ? '1' : '0'));
  };
  setMotion(safe(() => localStorage.getItem('motionOff')) === '1' || matchMedia('(prefers-reduced-motion: reduce)').matches);
  $('#motionBtn').onclick = () => setMotion(!document.body.classList.contains('no-motion'));

  // Mobile menu
  $('#menuBtn').onclick = (e) => {
    const open = $('#navLinks').classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
  };
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));
  addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 10), { passive: true });

  // Scroll reveal
  $$('.section > *, .card, .mini, .timeline li').forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));

  // Case studies
  const cases = {
    resume: {
      tag: 'Generative AI · Guided flow',
      title: 'AI Resume Builder',
      body: `
        <h5>The problem</h5><p>Job seekers find it hard to write strong resume content. A blank page makes it worse.</p>
        <h5>My role</h5><p>Product owner, designer, and full-stack developer. I did every step alone.</p>
        <h5>What I did</h5>
        <ul>
          <li>Scoped an MVP so the first release stayed small.</li>
          <li>Designed a guided flow from raw input to a polished resume.</li>
          <li>Added a live preview so users see the result as they type.</li>
          <li>Added user accounts and secure data storage.</li>
        </ul>
        <h5>The flow</h5>
        <div class="flow"><span>Sign in</span><span>Enter details</span><span>AI polish</span><span>Live preview</span><span>Download</span></div>
        <h5>Built with</h5><p>MongoDB, Express.js, React, Node.js, a Generative AI API.</p>
        <h5>What I would test next</h5><p>I would run usability tests on the first step. I would measure how long users take to finish a resume.</p>`
    },
    skills: {
      tag: 'Generative AI · Data clarity',
      title: 'AI Skill Analyzer and Resume Recommender',
      body: `
        <h5>The problem</h5><p>People do not know which skills they lack. Industry trends change fast.</p>
        <h5>My role</h5><p>I defined the value proposition, designed the flows, and built the product.</p>
        <h5>What I did</h5>
        <ul>
          <li>Wrote the core promise: close skill gaps to improve employability.</li>
          <li>Shipped trend-based skill recommendations first.</li>
          <li>Grew the scope with resume-building and interview preparation.</li>
          <li>Built resume parsing and trend comparison to flag gaps.</li>
        </ul>
        <h5>The flow</h5>
        <div class="flow"><span>Upload resume</span><span>Parse skills</span><span>Compare with trends</span><span>See gaps</span><span>Take action</span></div>
        <h5>Built with</h5><p>MERN stack and a Generative AI API.</p>
        <h5>Design lesson</h5><p>Users need one clear next step. A long list of gaps is not enough.</p>`
    },
    stay: {
      tag: 'Marketplace · Two-sided',
      title: 'Stayora',
      body: `
        <h5>The problem</h5><p>A booking marketplace has two kinds of users. Guests want to find a place. Hosts want to manage listings and bookings. One screen cannot serve both.</p>
        <h5>My role</h5><p>I modelled the product, designed the flows, and built it with the MERN stack.</p>
        <h5>What I did</h5>
        <ul>
          <li>Modelled a two-sided marketplace with separate host and guest roles.</li>
          <li>Designed listings, search, and bookings for each role.</li>
          <li>Added role-based access so each user sees only what they need.</li>
          <li>Designed MongoDB schemas and REST APIs for users, listings, and bookings.</li>
          <li>Built a responsive interface with Tailwind CSS.</li>
        </ul>
        <h5>The guest flow</h5>
        <div class="flow"><span>Search</span><span>Browse listings</span><span>Open a listing</span><span>Check the price</span><span>Book</span></div>
        <h5>The host flow</h5>
        <div class="flow"><span>Create a listing</span><span>Manage listings</span><span>Review bookings</span></div>
        <h5>Built with</h5><p>MongoDB, Express.js, React, Node.js, Tailwind CSS.</p>
        <h5>Design lesson</h5><p>One product can serve two users. Each role needs its own view of the same data.</p>
        <p style="margin-top:18px"><a class="more" href="#ui" data-goto="stay">See the sample UI →</a></p>`
    }
  };
  const modal = $('#modal');
  let lastFocus = null;
  const openCase = (key) => {
    const c = cases[key];
    lastFocus = document.activeElement;
    $('#mTag').textContent = c.tag;
    $('#mTitle').textContent = c.title;
    $('#mBody').innerHTML = c.body;
    $$('[data-goto]', $('#mBody')).forEach(a => a.addEventListener('click', () => { closeCase(); const t = $(`#uiTabs [data-u="${a.dataset.goto}"]`); if (t) t.click(); }));
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#mClose').focus();
  };
  const closeCase = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  $$('.card').forEach(c => {
    c.addEventListener('click', () => openCase(c.dataset.case));
    c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(c.dataset.case); } });
  });
  $('#mClose').onclick = closeCase;
  modal.addEventListener('click', (e) => { if (e.target === modal) closeCase(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeCase(); });

  // Process tabs
  $$('.p-tab').forEach(t => t.onclick = () => {
    $$('.p-tab').forEach(x => x.classList.toggle('active', x === t));
    $$('.p-panel').forEach(p => p.classList.toggle('active', p.dataset.p === t.dataset.p));
  });

  // Skill filters
  $$('#skillFilters .chip').forEach(b => b.onclick = () => {
    $$('#skillFilters .chip').forEach(x => x.classList.toggle('active', x === b));
    $$('#skillGrid li').forEach(li => li.classList.toggle('hide', b.dataset.f !== 'all' && li.dataset.c !== b.dataset.f));
  });


  // Copy phone
  $('#copyPhone').onclick = async (e) => {
    const btn = e.currentTarget;
    try { await navigator.clipboard.writeText(btn.dataset.phone); btn.textContent = 'Copied ✓'; }
    catch { btn.textContent = btn.dataset.phone; }
    setTimeout(() => btn.textContent = 'Copy phone number', 2500);
  };
})();
