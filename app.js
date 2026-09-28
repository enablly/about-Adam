/**
 * ADAM LAU — EXECUTIVE RESUME & GROWTH DOSSIER
 * Interactive Client Engine, Afternow-Style Motion & Line AI Canvas
 */

// ----------------------------------------------------
// 1. STATE & CONSTANTS
// ----------------------------------------------------
let isAdmin = false;
const STORAGE_KEY_AUTH = 'adam_resume_admin_session';
const STORAGE_KEY_DATA = 'adam_resume_edited_content_v1';
const STORAGE_KEY_PHOTO = 'adam_resume_custom_photo_v1';
let toastTimer = null;

// Clean light-mode placeholder avatar
const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='480' viewBox='0 0 400 480'><rect width='400' height='480' fill='%23f1f5f9'/><circle cx='200' cy='180' r='60' fill='%231d63ff' opacity='0.12'/><circle cx='200' cy='170' r='45' fill='%231d63ff' opacity='0.25'/><path d='M100 360 C100 270, 300 270, 300 360 Z' fill='%231d63ff' opacity='0.18'/><text x='200' y='420' font-family='monospace' font-size='14' fill='%231d63ff' text-anchor='middle'>ADAM LAU // PORTRAIT</text></svg>";

// ----------------------------------------------------
// 2. INITIALIZATION
// ----------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // Initialize AI/Tech Line Canvas Background
  initTechBackgroundCanvas();

  // Initialize Scroll Reveal & Header State
  initScrollAnimations();

  // Initialize Animated Counters
  initNumberCounters();

  // Initialize 3D Slanted Geometry Globe (Box 3 GEO.AEO)
  initCadGlobe();

  // Initialize 3D Executive Hero Globe with Airline Traffic Radar
  initHeroGlobe();

  // Initialize Dynamic Architectural CAD Telemetry
  initCadDynamicTelemetry();

  // Initialize Marketing / AI / Business Growth Matrix Background Canvas
  initMarketingAiCanvas();

  // Restore custom photo if previously uploaded
  const savedPhoto = localStorage.getItem(STORAGE_KEY_PHOTO);
  const profileImg = document.getElementById('profileImage');
  if (savedPhoto && profileImg) {
    profileImg.src = savedPhoto;
  }

  // Restore saved text customizations
  const savedContent = localStorage.getItem(STORAGE_KEY_DATA);
  if (savedContent) {
    try {
      const parsed = JSON.parse(savedContent);
      applySavedEdits(parsed);
    } catch (e) {
      console.error('Failed to parse saved resume edits:', e);
    }
  }

  // Restore admin session
  if (localStorage.getItem(STORAGE_KEY_AUTH) === 'true') {
    activateAdminMode();
  }

  // Global keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      if (isAdmin) {
        e.preventDefault();
        saveAllChanges();
      }
    }
    if (e.key === 'Escape') {
      closeLoginModal();
    }
  });
});

// ----------------------------------------------------
// 3. AI / TECH-CENTRIC LINE DRAWING BACKGROUND ANIMATION
// ----------------------------------------------------
function initTechBackgroundCanvas() {
  const canvas = document.getElementById('techCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createNodes();
  });

  const mouse = { x: -1000, y: -1000, radius: 180 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Circuit & Neural Nodes Configuration
  const nodeCount = Math.floor((width * height) / 22000);
  let nodes = [];
  let pulses = [];

  function createNodes() {
    nodes = [];
    const count = Math.max(35, Math.min(85, Math.floor((width * height) / 20000)));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseSize: Math.random() > 0.8 ? 3.5 : 2,
        isCrosshair: Math.random() > 0.7,
        connections: []
      });
    }
  }
  createNodes();

  // Periodic traveling data pulse
  setInterval(() => {
    if (nodes.length > 2 && pulses.length < 8) {
      const startIdx = Math.floor(Math.random() * nodes.length);
      pulses.push({
        nodeA: startIdx,
        nodeB: (startIdx + 1) % nodes.length,
        progress: 0,
        speed: 0.015 + Math.random() * 0.015
      });
    }
  }, 900);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update node positions
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      // Gentle bounds bounce
      if (n.x < 20 || n.x > width - 20) n.vx *= -1;
      if (n.y < 20 || n.y > height - 20) n.vy *= -1;

      // Mouse subtle repulsion/attraction
      const dx = mouse.x - n.x;
      const dy = mouse.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius && dist > 0) {
        const force = (mouse.radius - dist) / mouse.radius;
        n.x -= (dx / dist) * force * 0.8;
        n.y -= (dy / dist) * force * 0.8;
      }
    }

    // Draw connecting circuit/neural lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 170;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(29, 99, 255, ${alpha})`;
          ctx.lineWidth = 1;

          // Technical circuit orthogonal or direct trace
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // Connect to mouse if nearby
      const dxm = mouse.x - nodes[i].x;
      const dym = mouse.y - nodes[i].y;
      const distMouse = Math.sqrt(dxm * dxm + dym * dym);
      if (distMouse < mouse.radius) {
        const alpha = (1 - distMouse / mouse.radius) * 0.28;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(29, 99, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // Draw Data Pulses traveling along lines
    for (let p = pulses.length - 1; p >= 0; p--) {
      const pulse = pulses[p];
      const n1 = nodes[pulse.nodeA];
      const n2 = nodes[pulse.nodeB];
      pulse.progress += pulse.speed;

      if (pulse.progress >= 1) {
        pulses.splice(p, 1);
        continue;
      }

      const px = n1.x + (n2.x - n1.x) * pulse.progress;
      const py = n1.y + (n2.y - n1.y) * pulse.progress;

      ctx.fillStyle = '#1d63ff';
      ctx.fillRect(px - 2, py - 2, 4, 4); // Sharp square data pulse
    }

    // Draw Nodes (Square data nodes & crosshairs)
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.isCrosshair) {
        // Technical crosshair mark
        ctx.strokeStyle = 'rgba(29, 99, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x - 4, n.y);
        ctx.lineTo(n.x + 4, n.y);
        ctx.moveTo(n.x, n.y - 4);
        ctx.lineTo(n.x, n.y + 4);
        ctx.stroke();
      } else {
        // Sharp micro square node
        ctx.fillStyle = 'rgba(29, 99, 255, 0.5)';
        ctx.fillRect(n.x - 1.5, n.y - 1.5, 3, 3);
      }
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ----------------------------------------------------
// 4. AFTERNOW-STYLE SCROLL REVEALS & HEADER EFFECTS
// ----------------------------------------------------
function initScrollAnimations() {
  const header = document.querySelector('header.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  });

  // Assign reveal classes to sections and cards
  const revealElements = document.querySelectorAll(
    'section, .hero-panel, .pillar-box, .job-card, .matrix-card, .info-pane, .contact-box'
  );
  revealElements.forEach((el, index) => {
    el.classList.add('reveal-init');
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ----------------------------------------------------
// LINKEDIN SMALL POPUP WINDOW HELPER
// ----------------------------------------------------
function openLinkedInPopup(e) {
  if (e) e.preventDefault();
  const width = 640;
  const height = 750;
  const left = Math.max(0, Math.floor((window.screen.width - width) / 2));
  const top = Math.max(0, Math.floor((window.screen.height - height) / 2));
  const url = 'https://www.linkedin.com/in/adam-enablly';
  const popup = window.open(
    url,
    'linkedinPopup',
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=yes`
  );
  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    popup.focus();
  }
  return false;
}

// ----------------------------------------------------
// 5. ANIMATED NUMBERS COUNTER (FAST-TO-SLOW DECAY, RE-ANIMATES ON REFRESH & RE-ENTRY)
// ----------------------------------------------------
function parseMetricTarget(el) {
  if (el.dataset.targetNum !== undefined) return;
  const rawText = el.innerText.trim();
  const matchNum = rawText.match(/\d+(\.\d+)?/);
  if (!matchNum) return;

  el.dataset.targetNum = matchNum[0];
  el.dataset.isFloat = rawText.includes('.') ? 'true' : 'false';
  el.dataset.prefix = rawText.startsWith('$') ? '$' : '';
  el.dataset.midUnit = (rawText.includes('M') || rawText.includes('m')) ? 'M' : (rawText.includes('k') || rawText.includes('K')) ? 'k' : '';
  el.dataset.suffix = rawText.includes('%') ? '%' : rawText.includes('+') ? '+' : '';
}

function resetCounter(el) {
  if (el._animId) {
    cancelAnimationFrame(el._animId);
    el._animId = null;
  }
  el.dataset.animating = 'false';
  if (el.isContentEditable) return;
  parseMetricTarget(el);
  const prefix = el.dataset.prefix || '';
  const midUnit = el.dataset.midUnit || '';
  const suffix = el.dataset.suffix || '';
  const isFloat = el.dataset.isFloat === 'true';
  el.innerHTML = `${prefix}${isFloat ? '0.0' : '0'}${midUnit}<span>${suffix}</span>`;
}

function animateCounter(el, staggeredDuration = null) {
  if (el.isContentEditable) return;
  parseMetricTarget(el);

  const target = parseFloat(el.dataset.targetNum || '0');
  const isFloat = el.dataset.isFloat === 'true';
  const prefix = el.dataset.prefix || '';
  const midUnit = el.dataset.midUnit || '';
  const suffix = el.dataset.suffix || '';

  if (el._animId) {
    cancelAnimationFrame(el._animId);
    el._animId = null;
  }

  el.dataset.animating = 'true';

  // 30% slower towards the end + randomized staggered durations (2900ms - 4200ms)
  // Each card receives a distinct, randomized duration so they never arrive at the end at the same time
  const duration = staggeredDuration || (2900 + Math.random() * 1100);
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out with exponent 5.8: 30% slower deceleration curve at the end, ticking very slowly into final values
    const ease = 1 - Math.pow(1 - progress, 5.8);
    const current = target * ease;

    if (progress < 1) {
      if (isFloat) {
        el.innerHTML = `${prefix}${current.toFixed(1)}${midUnit}<span>${suffix}</span>`;
      } else {
        el.innerHTML = `${prefix}${Math.floor(current)}${midUnit}<span>${suffix}</span>`;
      }
      el._animId = requestAnimationFrame(update);
    } else {
      el.innerHTML = `${prefix}${isFloat ? target.toFixed(1) : target}${midUnit}<span>${suffix}</span>`;
      el.dataset.animating = 'false';
      el._animId = null;
    }
  }

  el._animId = requestAnimationFrame(update);
}

function initNumberCounters() {
  const metricCards = document.querySelectorAll('.metric-card');
  if (!metricCards.length) return;

  metricCards.forEach(card => {
    const valEl = card.querySelector('.metric-val');
    if (valEl) parseMetricTarget(valEl);
  });

  const observer = new IntersectionObserver((entries) => {
    const intersectingEntries = entries.filter(e => e.isIntersecting);

    if (intersectingEntries.length > 0) {
      // Create a randomly shuffled set of staggered durations (ranging from ~2900ms to ~4100ms)
      // to ensure all cards feel staggered and never arrive at the finish at the same time
      const baseTimes = [2900, 3220, 3540, 3860, 4150];
      // Fisher-Yates shuffle base times for unpredictable arrival order
      for (let i = baseTimes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baseTimes[i], baseTimes[j]] = [baseTimes[j], baseTimes[i]];
      }

      intersectingEntries.forEach((entry, idx) => {
        const valEl = entry.target.querySelector('.metric-val');
        if (!valEl) return;
        const duration = (baseTimes[idx % baseTimes.length] || 3100) + Math.floor(Math.random() * 120);
        animateCounter(valEl, duration);
      });
    }

    entries.filter(e => !e.isIntersecting).forEach(entry => {
      const valEl = entry.target.querySelector('.metric-val');
      if (valEl) resetCounter(valEl);
    });
  }, { threshold: 0.2 });

  metricCards.forEach(c => observer.observe(c));
}

// ----------------------------------------------------
// 6. ADMIN AUTHENTICATION
// ----------------------------------------------------
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('active');
    const pwdInput = document.getElementById('adminPasswordInput');
    if (pwdInput) pwdInput.focus();
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function submitAdminLogin() {
  const emailInput = document.getElementById('adminEmailInput');
  const passInput = document.getElementById('adminPasswordInput');
  const email = emailInput ? emailInput.value.trim() : '';
  const pass = passInput ? passInput.value.trim() : '';

  if ((email.toLowerCase() === 'adamlau.creatif@gmail.com' || email.includes('@')) && (pass === 'admin123' || pass.length >= 4)) {
    localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    closeLoginModal();
    activateAdminMode();
    showToast('Admin Mode Active. Click any text to edit or hover over your portrait to upload.');
  } else {
    alert('Authentication error. Default email: adamlau.creatif@gmail.com | Demo password: admin123');
  }
}

function activateAdminMode() {
  isAdmin = true;
  document.body.classList.add('admin-mode');
  const dock = document.getElementById('adminDock');
  if (dock) dock.classList.add('active');
  
  const loginBtn = document.getElementById('adminLoginBtn');
  if (loginBtn) loginBtn.style.display = 'none';

  document.querySelectorAll('[data-editable="true"]').forEach(el => {
    el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'false');
  });
}

function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEY_AUTH);
  isAdmin = false;
  document.body.classList.remove('admin-mode');
  
  const dock = document.getElementById('adminDock');
  if (dock) dock.classList.remove('active');

  const loginBtn = document.getElementById('adminLoginBtn');
  if (loginBtn) loginBtn.style.display = 'inline-flex';

  document.querySelectorAll('[data-editable="true"]').forEach(el => {
    el.removeAttribute('contenteditable');
  });
  showToast('Admin mode deactivated.');
}

// ----------------------------------------------------
// 7. LIVE CONTENT PERSISTENCE & EXPORT
// ----------------------------------------------------
function saveAllChanges() {
  const edits = [];
  document.querySelectorAll('[data-editable="true"]').forEach((el, index) => {
    edits.push({
      index: index,
      tag: el.tagName,
      id: el.id || '',
      className: el.className || '',
      html: el.innerHTML
    });
  });
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(edits));
  showToast('All text modifications saved to browser storage!');
}

function applySavedEdits(editsList) {
  if (!Array.isArray(editsList) || editsList.length === 0) return;
  const editableElements = Array.from(document.querySelectorAll('[data-editable="true"]'));

  // 1. Direct ID matching first (most robust)
  const unhandledItems = [];
  const handledElements = new Set();

  editsList.forEach(item => {
    if (item.id && document.getElementById(item.id)) {
      const el = document.getElementById(item.id);
      el.innerHTML = item.html;
      handledElements.add(el);
    } else {
      unhandledItems.push(item);
    }
  });

  if (unhandledItems.length === 0) return;

  // 2. Identify newly added editable landmarks in DOM
  const photoBadgeEl = document.getElementById('photoBadge');
  const pillarsSectionTagEl = document.getElementById('pillarsSectionTag');
  const photoBadgeIdx = editableElements.indexOf(photoBadgeEl);
  const pillarsTagIdx = editableElements.indexOf(pillarsSectionTagEl);

  // Check if legacy data was saved before photo-badge was added:
  const isLegacyBeforePhotoBadge = editsList.length > 2 && editsList[2] && editsList[2].tag === 'H1';

  // Check if saved data contains pillarsSectionTag:
  const hasPillarsTagInEdits = editsList.some(it => 
    it.id === 'pillarsSectionTag' || 
    (it.html && it.html.includes('ARCHITECTURAL DISCIPLINES'))
  );

  unhandledItems.forEach(item => {
    let targetIdx = item.index;

    if (isLegacyBeforePhotoBadge) {
      if (photoBadgeIdx !== -1 && item.index >= photoBadgeIdx) {
        targetIdx += 1;
      }
      if (!hasPillarsTagInEdits && pillarsTagIdx !== -1 && targetIdx >= pillarsTagIdx) {
        targetIdx += 1;
      }
    } else if (!hasPillarsTagInEdits && pillarsTagIdx !== -1 && item.index >= pillarsTagIdx) {
      targetIdx += 1;
    }

    const targetEl = editableElements[targetIdx];
    if (targetEl && !handledElements.has(targetEl)) {
      // Semantic sanity check: never put a multiline paragraph/headline into H1 if item tag wasn't H1
      if (targetEl.tagName === 'H1' && item.tag && item.tag !== 'H1') {
        return;
      }
      targetEl.innerHTML = item.html;
      handledElements.add(targetEl);
    }
  });
}

function resetToOriginalDefaults() {
  if (confirm('Are you sure you want to reset all customized text back to default?')) {
    localStorage.removeItem(STORAGE_KEY_DATA);
    localStorage.removeItem(STORAGE_KEY_PHOTO);
    location.reload();
  }
}

function exportUpdatedHTML() {
  const wasAdmin = isAdmin;
  document.body.classList.remove('admin-mode');
  document.querySelectorAll('[data-editable="true"]').forEach(el => el.removeAttribute('contenteditable'));

  const cleanHTML = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;

  if (wasAdmin) {
    document.body.classList.add('admin-mode');
    document.querySelectorAll('[data-editable="true"]').forEach(el => el.setAttribute('contenteditable', 'true'));
  }

  const blob = new Blob([cleanHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Exported index.html! Commit this file to your GitHub repository.');
}

// ----------------------------------------------------
// 8. EXECUTIVE PHOTO UPLOADER
// ----------------------------------------------------
function triggerPhotoUpload() {
  const input = document.getElementById('photoFileInput');
  if (input) input.click();
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file (PNG, JPG, WebP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const img = document.getElementById('profileImage');
    if (img) img.src = dataUrl;
    localStorage.setItem(STORAGE_KEY_PHOTO, dataUrl);
    showToast('Portrait photo updated & saved! You can also download it for your GitHub repo.');
  };
  reader.readAsDataURL(file);
}

function downloadProfilePhoto() {
  const img = document.getElementById('profileImage');
  if (!img) return;
  const a = document.createElement('a');
  a.href = img.src;
  a.download = 'profile.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Downloaded profile.jpg! Place this into your repository folder.');
}

function resetProfilePhoto() {
  localStorage.removeItem(STORAGE_KEY_PHOTO);
  const img = document.getElementById('profileImage');
  if (img) img.src = DEFAULT_AVATAR;
  showToast('Portrait image reset to default graphic.');
}

// ----------------------------------------------------
// 9. INTERACTIVE FILTERS & TAG HIGHLIGHTING
// ----------------------------------------------------
function filterJobs(category, btn) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.job-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterByTag(tagName) {
  if (isAdmin) return; // In admin mode, allow editing tag text without triggering role filtering
  document.querySelectorAll('.tag').forEach(t => {
    if (t.innerText.toLowerCase().includes(tagName.toLowerCase())) {
      t.classList.add('highlighted');
    } else {
      t.classList.remove('highlighted');
    }
  });

  const cards = document.querySelectorAll('.job-card');
  let matchedCount = 0;
  cards.forEach(card => {
    const skills = (card.getAttribute('data-skills') || '').toLowerCase();
    const content = card.innerText.toLowerCase();
    if (skills.includes(tagName.toLowerCase()) || content.includes(tagName.toLowerCase())) {
      card.style.display = 'block';
      card.style.borderColor = 'var(--blue-core)';
      matchedCount++;
    } else {
      card.style.borderColor = 'var(--border-subtle)';
    }
  });

  showToast(`Filtered roles applying: "${tagName}" (${matchedCount} roles found)`);
}

function toggleDetails(dossierId, btn) {
  const el = document.getElementById(dossierId);
  if (!el) return;
  if (el.classList.contains('open')) {
    el.classList.remove('open');
    btn.innerText = '▼ View Tech Stack & Architecture Notes';
  } else {
    el.classList.add('open');
    btn.innerText = '▲ Hide Tech Stack & Architecture Notes';
  }
}

// ----------------------------------------------------
// 10. IN-SITU BULLET & TAG ADDITION
// ----------------------------------------------------
function addBulletPoint(btn) {
  const ul = btn.previousElementSibling;
  if (!ul) return;
  const li = document.createElement('li');
  li.setAttribute('data-editable', 'true');
  li.setAttribute('contenteditable', 'true');
  li.innerText = 'New verified milestone or leadership achievement (click to edit)...';
  ul.appendChild(li);
  li.focus();
  showToast('Added new bullet point. Click to customize.');
}

function addTag(btn) {
  const container = btn.previousElementSibling;
  if (!container) return;
  const span = document.createElement('span');
  span.className = 'tag';
  span.setAttribute('data-editable', 'true');
  span.setAttribute('contenteditable', 'true');
  span.innerText = 'New Tool / Skill';
  container.appendChild(span);
  span.focus();
  showToast('Added new tech tag.');
}

function addEducation(btn) {
  const container = btn.parentElement;
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'info-record';
  div.innerHTML = `
    <div class="record-degree" data-editable="true" contenteditable="true">Degree / Certification Title</div>
    <div class="record-institution" data-editable="true" contenteditable="true">Institution Name</div>
    <div class="record-dates" data-editable="true" contenteditable="true">Month Year – Month Year</div>
  `;
  container.insertBefore(div, btn);
  showToast('Added education/certification entry.');
}

// ----------------------------------------------------
// 11. CLIPBOARD & TOAST NOTIFICATION UTILITIES
// ----------------------------------------------------
function copyContact(text, msg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;
  msgEl.innerText = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}


// ----------------------------------------------------
// SHARED 3D GEOMETRY CONTINENTS DATA (USED BY GLOBES)
// ----------------------------------------------------
const rawContinents = [
    // North America
    [
      [-168, 65], [-160, 71], [-140, 69], [-125, 69], [-95, 73], [-82, 65], [-76, 58],
      [-60, 48], [-65, 44], [-70, 42], [-76, 35], [-81, 25], [-82, 23], [-90, 21],
      [-97, 26], [-105, 22], [-88, 16], [-80, 8], [-77, 8], [-85, 13], [-96, 16],
      [-105, 20], [-115, 30], [-124, 40], [-125, 48], [-135, 57], [-152, 60], [-165, 60], [-168, 65]
    ],
    // South America
    [
      [-77, 8], [-71, 12], [-60, 10], [-50, 0], [-35, -5], [-35, -8], [-40, -22],
      [-50, -30], [-57, -38], [-66, -45], [-68, -55], [-75, -50], [-72, -40], [-71, -30],
      [-77, -10], [-80, -2], [-77, 8]
    ],
    // Europe & Mediterranean
    [
      [-9, 36], [-9, 43], [-1, 44], [-4, 48], [2, 51], [8, 54], [10, 56], [14, 54],
      [20, 55], [26, 60], [30, 68], [15, 68], [5, 62], [5, 58], [2, 51], [-4, 48],
      [-8, 44], [-9, 36]
    ],
    // Scandinavia
    [
      [5, 59], [10, 58], [12, 56], [18, 59], [22, 65], [28, 71], [24, 71], [15, 69], [5, 62], [5, 59]
    ],
    // British Isles & Ireland
    [
      [-5, 50], [1.5, 51], [0, 53], [-2, 57], [-5, 58], [-5, 55], [-3, 53], [-5, 50]
    ],
    [
      [-10, 51.5], [-6, 52], [-6, 55], [-10, 54], [-10, 51.5]
    ],
    // Africa
    [
      [-6, 36], [10, 37], [25, 32], [32, 31], [33, 27], [43, 12], [51, 12], [42, 0],
      [40, -10], [35, -20], [32, -28], [28, -34], [18, -34], [12, -18], [9, -5],
      [9, 4], [0, 6], [-13, 9], [-17, 15], [-17, 21], [-11, 28], [-6, 36]
    ],
    // Eurasia / Central & North Asia
    [
      [32, 31], [35, 33], [40, 38], [50, 40], [60, 40], [70, 40], [80, 40], [90, 40],
      [100, 40], [110, 40], [120, 40], [140, 50], [160, 60], [180, 66], [170, 70],
      [140, 73], [100, 75], [75, 70], [60, 68], [50, 68], [40, 65], [30, 70], [28, 70],
      [35, 60], [45, 50], [40, 40], [35, 33]
    ],
    // India Subcontinent
    [
      [68, 24], [72, 20], [77, 10], [80, 8], [80, 13], [85, 20], [88, 22], [90, 24],
      [80, 27], [73, 26], [68, 24]
    ],
    // Southeast Asia & China Coast
    [
      [98, 22], [100, 14], [101, 3], [104, 1.3], [103, 7], [108, 12], [106, 20],
      [118, 24], [122, 30], [122, 38], [120, 40], [105, 35], [98, 22]
    ],
    // Japan
    [
      [130, 31], [132, 34], [139, 35], [141, 41], [142, 44], [145, 44], [140, 38], [136, 34], [130, 31]
    ],
    // Maritime Southeast Asia (Sumatra, Java, Borneo, Philippines)
    [
      [95, 5], [105, -5], [100, 0], [95, 5]
    ],
    [
      [106, -6], [114, -8], [114, -7], [106, -6]
    ],
    [
      [110, 1], [117, 4], [119, 0], [115, -4], [110, -2], [110, 1]
    ],
    [
      [120, 18], [126, 12], [125, 7], [121, 10], [120, 18]
    ],
    // Australia
    [
      [114, -22], [122, -18], [131, -12], [136, -12], [138, -17], [142, -11], [145, -15],
      [153, -28], [151, -34], [148, -38], [140, -38], [137, -35], [134, -33], [129, -32],
      [124, -33], [115, -34], [113, -26], [114, -22]
    ],
    // New Zealand
    [
      [173, -35], [178, -38], [175, -41], [170, -44], [167, -46], [170, -43], [173, -35]
    ],
    // Greenland
    [
      [-45, 60], [-35, 66], [-20, 75], [-30, 82], [-55, 82], [-55, 70], [-45, 60]
    ]
  ];

  // Densify polygons so lines hug spherical curvature seamlessly
function densify(polygon, maxDeg = 6) {
    const pts = [];
    for (let i = 0; i < polygon.length; i++) {
      const p1 = polygon[i];
      const p2 = polygon[(i + 1) % polygon.length];
      pts.push(p1);
      const dLon = p2[0] - p1[0];
      const dLat = p2[1] - p1[1];
      const dist = Math.hypot(dLon, dLat);
      if (dist > maxDeg) {
        const steps = Math.ceil(dist / maxDeg);
        for (let s = 1; s < steps; s++) {
          const frac = s / steps;
          pts.push([p1[0] + dLon * frac, p1[1] + dLat * frac]);
        }
      }
    }
    return pts;
  }

const SHARED_CONTINENTS = rawContinents.map(poly => densify(poly));

// ----------------------------------------------------
// 12. 3D SLANTED SPINNING GEOMETRY GLOBE (CAD VIEWPORT)
// ----------------------------------------------------
function initCadGlobe() {
  const canvas = document.getElementById('cadGlobeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let radius = 62;
  let centerX = 0;
  let centerY = 80;

  // Geometry configuration: Earth's 23.5° axial tilt and slight 14° camera elevation
  const TILT_Z = -23.5 * (Math.PI / 180);
  const PITCH_X = 14 * (Math.PI / 180);
  const cosT = Math.cos(TILT_Z), sinT = Math.sin(TILT_Z);
  const cosP = Math.cos(PITCH_X), sinP = Math.sin(PITCH_X);

  let rotation = 1.85; // Initial rotation angle
  let spinSpeed = 0.005; // Smooth slow stately rotation
  let isDragging = false;
  let lastMouseX = 0;
  let isVisible = true;

  // Raw geographic polygons for continents & major landmasses [lon, lat]
  const continents = SHARED_CONTINENTS;

  // Major Country / Regional Tech & Fintech Hubs with Pulsing Blue Dots
  const hubs = [
    { name: 'Kuala Lumpur', code: 'MY // KL', lat: 3.14, lon: 101.69, primary: true, offset: 0.0 },
    { name: 'Tokyo', code: 'JP // TYO', lat: 35.68, lon: 139.76, offset: 0.3 },
    { name: 'London', code: 'UK // LDN', lat: 51.51, lon: -0.13, offset: 0.6 },
    { name: 'New York', code: 'US // NYC', lat: 40.71, lon: -74.01, offset: 0.9 },
    { name: 'San Francisco', code: 'US // SFO', lat: 37.77, lon: -122.42, offset: 0.2 },
    { name: 'Sydney', code: 'AU // SYD', lat: -33.87, lon: 151.21, offset: 0.5 },
    { name: 'Frankfurt', code: 'EU // FRA', lat: 50.11, lon: 8.68, offset: 0.75 },
    { name: 'Dubai', code: 'AE // DXB', lat: 25.20, lon: 55.27, offset: 0.4 },
    { name: 'Singapore', code: 'SG // SIN', lat: 1.35, lon: 103.82, offset: 0.15 }
  ];

  // Geodesic Network Arcs (hub index pairs)
  const connections = [
    [0, 1], // KL ↔ London
    [0, 3], // KL ↔ Tokyo
    [0, 5], // KL ↔ Sydney
    [1, 2], // London ↔ NYC
    [2, 4], // NYC ↔ SFO
    [4, 1], // SFO ↔ Tokyo
    [1, 6], // London ↔ Frankfurt
    [7, 6]  // Dubai ↔ Frankfurt
  ];

  // Canvas Resize Handler
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width || 280;
    height = rect.height || 172;
    dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    centerX = width / 2;
    centerY = 80;
    radius = Math.min(width, height) * 0.37;
  }

  window.addEventListener('resize', resize);
  resize();

  // IntersectionObserver to pause rendering when offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(canvas);

  // Mouse & Touch Interactivity (Drag to Rotate)
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouseX;
    rotation += deltaX * 0.007;
    lastMouseX = e.clientX;
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
    }
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMouseX;
    rotation += deltaX * 0.007;
    lastMouseX = e.touches[0].clientX;
  }, { passive: true });
  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // 3D Spherical Coordinate Transformation
  function project3D(lonDeg, latDeg, R, rot) {
    const rad = Math.PI / 180;
    const lambda = lonDeg * rad + rot;
    const phi = latDeg * rad;

    const cosPhi = Math.cos(phi);
    const x0 = R * cosPhi * Math.sin(lambda);
    const y0 = R * Math.sin(phi);
    const z0 = R * cosPhi * Math.cos(lambda);

    // 1. Earth Slanted Axis Tilt (around Z axis)
    const x1 = x0 * cosT - y0 * sinT;
    const y1 = x0 * sinT + y0 * cosT;
    const z1 = z0;

    // 2. Camera Elevation Pitch (around X axis)
    const x2 = x1;
    const y2 = y1 * cosP - z1 * sinP;
    const z2 = y1 * sinP + z1 * cosP;

    return {
      x: centerX + x2,
      y: centerY - y2,
      z: z2,
      rawX: x2,
      rawY: y2
    };
  }

  // Project point along the slanted polar axis
  function projectAxisPoint(yDist) {
    const x1 = -yDist * sinT;
    const y1 = yDist * cosT;
    const z1 = 0;

    const x2 = x1;
    const y2 = y1 * cosP - z1 * sinP;
    const z2 = y1 * sinP + z1 * cosP;

    return {
      x: centerX + x2,
      y: centerY - y2,
      z: z2
    };
  }

  // Animation Loop
  function render(time) {
    requestAnimationFrame(render);
    if (!isVisible) return;

    if (!isDragging) {
      rotation += spinSpeed;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Subtle CAD Crosshairs in Canvas Corners
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.8;
    const ch = 7;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(10, 10 + ch); ctx.lineTo(10, 10); ctx.lineTo(10 + ch, 10);
    ctx.moveTo(width - 10 - ch, 10); ctx.lineTo(width - 10, 10); ctx.lineTo(width - 10, 10 + ch);
    ctx.moveTo(10, height - 10 - ch); ctx.lineTo(10, height - 10); ctx.lineTo(10 + ch, height - 10);
    ctx.moveTo(width - 10 - ch, height - 10); ctx.lineTo(width - 10, height - 10); ctx.lineTo(width - 10, height - 10 - ch);
    ctx.stroke();

    // 2. CAD Orbit / Outer Range Ring
    ctx.save();
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.8)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Globe Base Sphere (Clean white fill with subtle soft halo)
    const baseGrad = ctx.createRadialGradient(
      centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1,
      centerX, centerY, radius
    );
    baseGrad.addColorStop(0, '#ffffff');
    baseGrad.addColorStop(0.85, '#f8fafc');
    baseGrad.addColorStop(1, '#eef2f6');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = baseGrad;
    ctx.fill();

    // Outer silhouette border
    ctx.strokeStyle = 'rgba(29, 99, 255, 0.28)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 4. Slanted Polar Axis (23.5° physical tilt line)
    const axisTop = projectAxisPoint(radius + 18);
    const axisNorth = projectAxisPoint(radius);
    const axisSouth = projectAxisPoint(-radius);
    const axisBottom = projectAxisPoint(-radius - 18);

    // Dashed extended axis lines
    ctx.save();
    ctx.strokeStyle = 'rgba(29, 99, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    // Top extension
    ctx.beginPath();
    ctx.moveTo(axisNorth.x, axisNorth.y);
    ctx.lineTo(axisTop.x, axisTop.y);
    ctx.stroke();

    // Bottom extension
    ctx.beginPath();
    ctx.moveTo(axisSouth.x, axisSouth.y);
    ctx.lineTo(axisBottom.x, axisBottom.y);
    ctx.stroke();
    ctx.restore();

    // Slanted Axis Endcaps & Ticks
    const normalAngle = Math.atan2(axisTop.y - axisNorth.y, axisTop.x - axisNorth.x) + Math.PI / 2;
    const nx = Math.cos(normalAngle) * 4;
    const ny = Math.sin(normalAngle) * 4;

    ctx.strokeStyle = 'var(--blue-core, #1d63ff)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(axisTop.x - nx, axisTop.y - ny);
    ctx.lineTo(axisTop.x + nx, axisTop.y + ny);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(axisBottom.x - nx, axisBottom.y - ny);
    ctx.lineTo(axisBottom.x + nx, axisBottom.y + ny);
    ctx.stroke();

    // Polar labels
    ctx.font = '600 7px "JetBrains Mono", monospace';
    ctx.fillStyle = '#1d63ff';
    ctx.textAlign = 'left';
    ctx.fillText('N 23.5°', axisTop.x + 6, axisTop.y + 2);

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('S', axisBottom.x + 6, axisBottom.y + 4);

    // 5. Wireframe Parallels (Latitude Rings)
    const latitudes = [-60, -30, 0, 30, 60];
    latitudes.forEach(lat => {
      const isEquator = lat === 0;
      const pts = [];
      for (let lon = 0; lon <= 360; lon += 6) {
        pts.push(project3D(lon, lat, radius, rotation));
      }

      // Draw visible front arc (z > 0)
      ctx.beginPath();
      let drawing = false;
      pts.forEach(p => {
        if (p.z > 0) {
          if (!drawing) {
            ctx.moveTo(p.x, p.y);
            drawing = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          drawing = false;
        }
      });
      ctx.strokeStyle = isEquator ? 'rgba(29, 99, 255, 0.42)' : 'rgba(29, 99, 255, 0.16)';
      ctx.lineWidth = isEquator ? 1.2 : 0.7;
      ctx.stroke();

      // Faint back arc (z <= 0)
      ctx.save();
      ctx.setLineDash([1, 4]);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      drawing = false;
      pts.forEach(p => {
        if (p.z <= 0) {
          if (!drawing) {
            ctx.moveTo(p.x, p.y);
            drawing = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          drawing = false;
        }
      });
      ctx.stroke();
      ctx.restore();
    });

    // 6. Wireframe Meridians (Longitude Rings)
    for (let m = 0; m < 8; m++) {
      const lon = m * 45;
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 6) {
        pts.push(project3D(lon, lat, radius, rotation));
      }

      // Visible arc (z > 0)
      ctx.beginPath();
      let drawing = false;
      pts.forEach(p => {
        if (p.z > 0) {
          if (!drawing) {
            ctx.moveTo(p.x, p.y);
            drawing = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          drawing = false;
        }
      });
      ctx.strokeStyle = 'rgba(29, 99, 255, 0.14)';
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }

    // 7. Country & Continental Geometric Outlines
    ctx.save();
    continents.forEach(poly => {
      const proj = poly.map(pt => project3D(pt[0], pt[1], radius, rotation));
      const len = proj.length;
      if (len < 2) return;

      ctx.beginPath();
      let first = true;
      for (let i = 0; i < len; i++) {
        const p1 = proj[i];
        const p2 = proj[(i + 1) % len];

        if (p1.z > 0 && p2.z > 0) {
          if (first) {
            ctx.moveTo(p1.x, p1.y);
            first = false;
          }
          ctx.lineTo(p2.x, p2.y);
        } else if (p1.z > 0 && p2.z <= 0) {
          // Clip from visible to hidden
          const t = p1.z / (p1.z - p2.z);
          const cx_ = p1.x + t * (p2.x - p1.x);
          const cy_ = p1.y + t * (p2.y - p1.y);
          if (first) {
            ctx.moveTo(p1.x, p1.y);
            first = false;
          }
          ctx.lineTo(cx_, cy_);
          first = true;
        } else if (p1.z <= 0 && p2.z > 0) {
          // Clip from hidden to visible
          const t = -p1.z / (p2.z - p1.z);
          const cx_ = p1.x + t * (p2.x - p1.x);
          const cy_ = p1.y + t * (p2.y - p1.y);
          ctx.moveTo(cx_, cy_);
          ctx.lineTo(p2.x, p2.y);
          first = false;
        }
      }

      ctx.strokeStyle = '#0f172a'; // Crisp technical slate
      ctx.lineWidth = 1.15;
      ctx.stroke();

      ctx.fillStyle = 'rgba(29, 99, 255, 0.04)';
      ctx.fill();
    });
    ctx.restore();

    // 8. Geodesic Flight & Fiber Mesh Arcs
    const sec = time / 1000;
    connections.forEach(([iA, iB]) => {
      const hA = hubs[iA];
      const hB = hubs[iB];
      if (!hA || !hB) return;

      const pA = project3D(hA.lon, hA.lat, radius, rotation);
      const pB = project3D(hB.lon, hB.lat, radius, rotation);

      // Only draw when at least one hub is on the front side
      if (pA.z > -10 || pB.z > -10) {
        ctx.save();
        ctx.strokeStyle = 'rgba(29, 99, 255, 0.28)';
        ctx.lineWidth = 0.9;
        ctx.setLineDash([2, 3]);

        ctx.beginPath();
        let inPath = false;
        const steps = 14;
        let packetPt = null;
        const packetT = (sec * 0.4 + (iA * 0.2)) % 1.0;

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const lon = hA.lon + (hB.lon - hA.lon) * t;
          const lat = hA.lat + (hB.lat - hA.lat) * t;
          const arcP = project3D(lon, lat, radius, rotation);

          if (arcP.z > 0) {
            if (!inPath) {
              ctx.moveTo(arcP.x, arcP.y);
              inPath = true;
            } else {
              ctx.lineTo(arcP.x, arcP.y);
            }
          } else {
            inPath = false;
          }

          if (Math.abs(t - packetT) < 0.04 && arcP.z > 0) {
            packetPt = arcP;
          }
        }
        ctx.stroke();
        ctx.restore();

        // Traveling data packet
        if (packetPt) {
          ctx.beginPath();
          ctx.arc(packetPt.x, packetPt.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = '#1d63ff';
          ctx.fill();
        }
      }
    });

    // 9. Major Country / Regional Hubs with Pulsing Blue Dots
    hubs.forEach(hub => {
      const p = project3D(hub.lon, hub.lat, radius, rotation);
      if (p.z <= 0) return; // Behind horizon

      // Pulse wave phases
      const wave1 = (sec * 0.9 + hub.offset) % 1.0;
      const wave2 = (sec * 0.9 + hub.offset + 0.5) % 1.0;

      // Pulse Ring 1
      const r1 = 2.8 + wave1 * 11;
      const alpha1 = (1 - wave1) * 0.8;
      ctx.strokeStyle = `rgba(29, 99, 255, ${alpha1})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r1, 0, Math.PI * 2);
      ctx.stroke();

      // Pulse Ring 2
      const r2 = 2.8 + wave2 * 11;
      const alpha2 = (1 - wave2) * 0.8;
      ctx.strokeStyle = `rgba(29, 99, 255, ${alpha2})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r2, 0, Math.PI * 2);
      ctx.stroke();

      // Core Solid Blue Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = '#1d63ff';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // CAD Leader Tag for prominent hubs facing front
      if (hub.primary || p.z > 25) {
        ctx.save();
        ctx.font = '700 6.5px "JetBrains Mono", monospace';
        ctx.fillStyle = hub.primary ? '#1d63ff' : '#475569';
        ctx.strokeStyle = hub.primary ? 'rgba(29, 99, 255, 0.45)' : 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 0.8;

        const isRight = p.x < centerX + 20;
        const lx1 = isRight ? p.x + 4 : p.x - 4;
        const ly1 = p.y - 4;
        const lx2 = isRight ? p.x + 12 : p.x - 12;
        const ly2 = p.y - 12;
        const lx3 = isRight ? lx2 + 28 : lx2 - 28;

        ctx.beginPath();
        ctx.moveTo(lx1, ly1);
        ctx.lineTo(lx2, ly2);
        ctx.lineTo(lx3, ly2);
        ctx.stroke();

        ctx.textAlign = isRight ? 'left' : 'right';
        ctx.fillText(hub.code, isRight ? lx2 + 2 : lx2 - 2, ly2 - 2);
        ctx.restore();
      }
    });

    // 10. CAD Viewport Telemetry Micro-Readout
    ctx.save();
    ctx.font = '500 6px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    const deg = Math.floor(((rotation * 180 / Math.PI) % 360 + 360) % 360);
    ctx.fillText(`θ: ${String(deg).padStart(3, '0')}°`, 14, height - 12);
    ctx.textAlign = 'right';
    ctx.fillText('CAD.3D // TILT -23.5°', width - 14, height - 12);
    ctx.restore();
  }

  requestAnimationFrame(render);
}




// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------
// 13. 3D EXECUTIVE HERO GLOBE (CAD ARCHITECTURAL SPHERE, DYNAMIC COORDINATES, SATELLITES & FLIGHT TRAFFIC)
// ----------------------------------------------------
function initHeroGlobe() {
  const canvas = document.getElementById('heroGlobeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let radius = 640;
  let centerX = 0;
  let centerY = 0;

  // Earth 23.5° physical axial tilt and 14° camera elevation pitch
  const TILT_Z = -23.5 * (Math.PI / 180);
  const PITCH_X = 14 * (Math.PI / 180);
  const cosT = Math.cos(TILT_Z), sinT = Math.sin(TILT_Z);
  const cosP = Math.cos(PITCH_X), sinP = Math.sin(PITCH_X);

  let rotation = -1.65; // Stately initial angle oriented towards Southeast Asia / Indian Ocean
  let spinSpeed = 0.0016; // Elegant planetary rotation
  let isDragging = false;
  let lastMouseX = 0;
  let isVisible = true;

  // World Flight Hubs [lat, lon]
  const hubs = [
    { name: 'Kuala Lumpur', code: 'KUL', lat: 3.14, lon: 101.69, primary: true, tag: 'MY // KUL [APAC HQ]' },
    { name: 'Singapore', code: 'SIN', lat: 1.35, lon: 103.82, primary: false, tag: 'SG // SIN' },
    { name: 'Tokyo', code: 'TYO', lat: 35.68, lon: 139.76, primary: false, tag: 'JP // HND' },
    { name: 'Sydney', code: 'SYD', lat: -33.87, lon: 151.21, primary: false, tag: 'AU // SYD' },
    { name: 'Melbourne', code: 'MEL', lat: -37.81, lon: 144.96, primary: false, tag: 'AU // MEL' },
    { name: 'Dubai', code: 'DXB', lat: 25.20, lon: 55.27, primary: false, tag: 'AE // DXB' },
    { name: 'London', code: 'LHR', lat: 51.51, lon: -0.13, primary: false, tag: 'UK // LHR' },
    { name: 'Frankfurt', code: 'FRA', lat: 50.11, lon: 8.68, primary: false, tag: 'DE // FRA' },
    { name: 'New York', code: 'JFK', lat: 40.71, lon: -74.01, primary: false, tag: 'US // JFK' },
    { name: 'San Francisco', code: 'SFO', lat: 37.77, lon: -122.42, primary: false, tag: 'US // SFO' },
    { name: 'Hong Kong', code: 'HKG', lat: 22.31, lon: 114.17, primary: false, tag: 'HK // HKG' },
    { name: 'Johannesburg', code: 'JNB', lat: -26.20, lon: 28.04, primary: false, tag: 'ZA // JNB' }
  ];

  // Convert lat/lon to 3D unit cartesian vector
  function latLonToVec(lat, lon) {
    const rLat = lat * Math.PI / 180;
    const rLon = lon * Math.PI / 180;
    return [
      Math.cos(rLat) * Math.sin(rLon),
      Math.sin(rLat),
      Math.cos(rLat) * Math.cos(rLon)
    ];
  }

  hubs.forEach(h => {
    h.vec = latLonToVec(h.lat, h.lon);
  });

  // Spherical Linear Interpolation (SLERP) for geodesic flight arcs
  function slerpVec(v1, v2, t) {
    let dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    dot = Math.max(-1, Math.min(1, dot));
    const theta = Math.acos(dot);
    if (Math.abs(theta) < 0.0001 || Math.sin(theta) === 0) {
      return v1;
    }
    const s1 = Math.sin((1 - t) * theta) / Math.sin(theta);
    const s2 = Math.sin(t * theta) / Math.sin(theta);
    return [
      s1 * v1[0] + s2 * v2[0],
      s1 * v1[1] + s2 * v2[1],
      s1 * v1[2] + s2 * v2[2]
    ];
  }

  // Active Flight Corridors & Real-Time Aircraft
  const flightRoutes = [
    { from: 0, to: 6, callsign: 'MH001', alt: 'FL380', speed: 0.038, offset: 0.12 }, // KUL -> LHR
    { from: 0, to: 5, callsign: 'MH161', alt: 'FL390', speed: 0.042, offset: 0.65 }, // KUL -> DXB
    { from: 0, to: 2, callsign: 'MH088', alt: 'FL410', speed: 0.045, offset: 0.35 }, // KUL -> TYO
    { from: 0, to: 4, callsign: 'MH149', alt: 'FL390', speed: 0.040, offset: 0.50 }, // KUL -> MEL
    { from: 1, to: 3, callsign: 'SQ221', alt: 'FL400', speed: 0.038, offset: 0.82 }, // SIN -> SYD
    { from: 1, to: 6, callsign: 'SQ322', alt: 'FL380', speed: 0.033, offset: 0.40 }, // SIN -> LHR
    { from: 5, to: 7, callsign: 'EK045', alt: 'FL370', speed: 0.046, offset: 0.20 }, // DXB -> FRA
    { from: 5, to: 11, callsign: 'EK761', alt: 'FL390', speed: 0.044, offset: 0.60 }, // DXB -> JNB
    { from: 6, to: 8, callsign: 'BA178', alt: 'FL380', speed: 0.036, offset: 0.10 }, // LHR -> JFK
    { from: 8, to: 9, callsign: 'UA234', alt: 'FL360', speed: 0.052, offset: 0.75 }, // JFK -> SFO
    { from: 9, to: 2, callsign: 'UA857', alt: 'FL390', speed: 0.030, offset: 0.28 }, // SFO -> TYO
    { from: 10, to: 0, callsign: 'CX723', alt: 'FL380', speed: 0.048, offset: 0.48 }  // HKG -> KUL
  ];

  // 3D Spherical Coordinate Transformation
  function transformVec3D(vec, R, altFrac, rot) {
    const curR = R * (1 + altFrac);
    // Rotate around Earth polar Y axis
    const sinR = Math.sin(rot), cosR = Math.cos(rot);
    const x0 = curR * (vec[0] * cosR + vec[2] * sinR);
    const y0 = curR * vec[1];
    const z0 = curR * (-vec[0] * sinR + vec[2] * cosR);

    // 1. Slanted Axis Tilt (around Z axis)
    const x1 = x0 * cosT - y0 * sinT;
    const y1 = x0 * sinT + y0 * cosT;
    const z1 = z0;

    // 2. Camera Elevation Pitch (around X axis)
    const x2 = x1;
    const y2 = y1 * cosP - z1 * sinP;
    const z2 = y1 * sinP + z1 * cosP;

    return {
      x: centerX + x2,
      y: centerY - y2,
      z: z2,
      rawX: x2,
      rawY: y2
    };
  }

  function project3D(lonDeg, latDeg, R, rot, altFrac = 0) {
    const v = latLonToVec(latDeg, lonDeg);
    return transformVec3D(v, R, altFrac, rot);
  }

  // Polar Axis projection line (passing through center along Earth's tilt)
  function projectAxisPoint(yDist) {
    const x1 = -yDist * sinT;
    const y1 = yDist * cosT;
    const x2 = x1;
    const y2 = y1 * cosP;
    const z2 = y1 * sinP;
    return {
      x: centerX + x2,
      y: centerY - y2,
      z: z2
    };
  }

  // 3D Orbit calculation for satellites (inclined Keplerian ellipse)
  function projectOrbitPoint(orbitRadius, inclinationDeg, orbitAngleRad) {
    const inc = inclinationDeg * (Math.PI / 180);
    const cosI = Math.cos(inc), sinI = Math.sin(inc);
    const xOrb = orbitRadius * Math.cos(orbitAngleRad);
    const yOrb = orbitRadius * Math.sin(orbitAngleRad);

    // Rotate orbital plane by inclination
    const x0 = xOrb;
    const y0 = yOrb * cosI;
    const z0 = yOrb * sinI;

    // Slanted axis tilt & camera pitch
    const x1 = x0 * cosT - y0 * sinT;
    const y1 = x0 * sinT + y0 * cosT;
    const z1 = z0;

    const x2 = x1;
    const y2 = y1 * cosP - z1 * sinP;
    const z2 = y1 * sinP + z1 * cosP;

    return {
      x: centerX + x2,
      y: centerY - y2,
      z: z2
    };
  }

  // Canvas Resize Handler
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width || window.innerWidth;
    height = rect.height || 820;
    dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    centerX = width / 2;
    // Dramatic, prominent spherical framing showing the full majestic 23.5° slope behind hero card
    radius = Math.min(width * 0.55, 660);
    // Center positioned so the tilted equator, tropics, and polar axis slope elegantly across the hero
    centerY = 80;
  }

  window.addEventListener('resize', resize);
  resize();

  // IntersectionObserver to pause rendering when offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.02 });
  observer.observe(canvas);

  // Mouse & Touch Interactivity (Drag to Rotate)
  const heroSection = document.getElementById('overview');
  if (heroSection) {
    heroSection.addEventListener('mousedown', (e) => {
      if (e.target.closest('a, button, input, .photo-wrapper, .admin-controls')) return;
      isDragging = true;
      lastMouseX = e.clientX;
    });
  }

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouseX;
    rotation += deltaX * 0.0035;
    lastMouseX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Animation Loop
  function render(time) {
    requestAnimationFrame(render);
    if (!isVisible) return;

    if (!isDragging) {
      rotation += spinSpeed;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Subtle CAD Crosshairs in Canvas Corners
    ctx.save();
    ctx.strokeStyle = 'rgba(29, 99, 255, 0.25)';
    ctx.lineWidth = 0.8;
    const ch = 10;
    ctx.beginPath();
    ctx.moveTo(24, 24 + ch); ctx.lineTo(24, 24); ctx.lineTo(24 + ch, 24);
    ctx.moveTo(width - 24 - ch, 24); ctx.lineTo(width - 24, 24); ctx.lineTo(width - 24, 24 + ch);
    ctx.moveTo(24, height - 24 - ch); ctx.lineTo(24, height - 24); ctx.lineTo(24 + ch, height - 24);
    ctx.moveTo(width - 24 - ch, height - 24); ctx.lineTo(width - 24, height - 24); ctx.lineTo(width - 24, height - 24 - ch);
    ctx.stroke();
    ctx.restore();

    // 2. Outer CAD Azimuth Compass Ring (000° to 359° with ticks and cardinal points)
    const compassR = radius + 22;
    ctx.save();
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.7)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, compassR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Compass degree tick marks
    ctx.save();
    for (let deg = 0; deg < 360; deg += 10) {
      const rad = deg * (Math.PI / 180);
      const isMajor = deg % 30 === 0;
      const isCardinal = deg % 90 === 0;
      const len = isCardinal ? 7 : (isMajor ? 4 : 2);
      const rInner = compassR - len;
      const rOuter = compassR + len;

      const cosA = Math.cos(rad), sinA = Math.sin(rad);
      ctx.beginPath();
      ctx.moveTo(centerX + cosA * rInner, centerY + sinA * rInner);
      ctx.lineTo(centerX + cosA * rOuter, centerY + sinA * rOuter);
      ctx.strokeStyle = isCardinal ? '#1d63ff' : (isMajor ? 'rgba(29, 99, 255, 0.45)' : 'rgba(203, 213, 225, 0.8)');
      ctx.lineWidth = isCardinal ? 1.2 : 0.7;
      ctx.stroke();

      if (isCardinal) {
        ctx.font = '700 6.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#1d63ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const labels = { 0: '090° [E]', 90: '180° [S]', 180: '270° [W]', 270: '000° [N]' };
        const textR = compassR + 14;
        ctx.fillText(labels[deg], centerX + cosA * textR, centerY + sinA * textR);
      }
    }
    ctx.restore();

    // 3. Globe Base Sphere (Luminous Tech Blueprint Radial Atmosphere)
    const baseGrad = ctx.createRadialGradient(
      centerX - radius * 0.25, centerY - radius * 0.25, radius * 0.1,
      centerX, centerY, radius
    );
    baseGrad.addColorStop(0, "rgba(255, 255, 255, 0.01)");
    baseGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.02)");
    baseGrad.addColorStop(0.92, "rgba(148, 163, 184, 0.06)");
    baseGrad.addColorStop(1, "rgba(148, 163, 184, 0.15)");

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = baseGrad;
    ctx.fill();

    // Horizon border with crisp technical navy + blue halo
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // 4. Slanted Polar Axis (23.5° physical tilt line extending past poles)
    const axisTop = projectAxisPoint(radius + 40);
    const axisNorthPole = projectAxisPoint(radius);
    const axisSouthPole = projectAxisPoint(-radius);
    const axisBottom = projectAxisPoint(-radius - 40);

    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Top extension
    ctx.beginPath();
    ctx.moveTo(axisNorthPole.x, axisNorthPole.y);
    ctx.lineTo(axisTop.x, axisTop.y);
    ctx.stroke();

    // Bottom extension
    ctx.beginPath();
    ctx.moveTo(axisSouthPole.x, axisSouthPole.y);
    ctx.lineTo(axisBottom.x, axisBottom.y);
    ctx.stroke();

    // Interior dashed axis passing through globe
    ctx.strokeStyle = 'rgba(29, 99, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(axisNorthPole.x, axisNorthPole.y);
    ctx.lineTo(axisSouthPole.x, axisSouthPole.y);
    ctx.stroke();
    ctx.restore();

    // Slanted Axis Endcaps & Cross-Ticks
    const normalAngle = Math.atan2(axisTop.y - axisNorthPole.y, axisTop.x - axisNorthPole.x) + Math.PI / 2;
    const nx = Math.cos(normalAngle) * 6;
    const ny = Math.sin(normalAngle) * 6;

    ctx.save();
    ctx.strokeStyle = '#1d63ff';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(axisTop.x - nx, axisTop.y - ny); ctx.lineTo(axisTop.x + nx, axisTop.y + ny);
    ctx.moveTo(axisBottom.x - nx, axisBottom.y - ny); ctx.lineTo(axisBottom.x + nx, axisBottom.y + ny);
    ctx.stroke();

    // Polar labels
    ctx.font = '700 7px "JetBrains Mono", monospace';
    ctx.fillStyle = '#1d63ff';
    ctx.textAlign = 'left';
    ctx.fillText('N 23.5° [AXIS // TRUE_NORTH]', axisTop.x + 8, axisTop.y + 2);

    ctx.fillStyle = '#64748b';
    ctx.fillText('S 23.5° [ANTARCTIC_POLE]', axisBottom.x + 8, axisBottom.y + 4);
    ctx.restore();

    // 5. Technical Graticule: Latitude Parallels with Rotating Equator Coordinates
    const lats = [-60, -30, -23.5, 0, 23.5, 30, 60];
    lats.forEach(lat => {
      const isEquator = lat === 0;
      const isTropic = Math.abs(lat) === 23.5;
      ctx.save();
      ctx.strokeStyle = isEquator ? 'rgba(255, 255, 255, 0.5)' : (isTropic ? 'rgba(148, 163, 184, 0.35)' : 'rgba(148, 163, 184, 0.22)');
      ctx.lineWidth = isEquator ? 1.5 : (isTropic ? 0.9 : 0.6);
      if (!isEquator) ctx.setLineDash(isTropic ? [3, 4] : [2, 5]);

      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 5) {
        const p = project3D(lon, lat, radius, rotation);
        if (p.z > 0) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.stroke();
      ctx.restore();

      // Latitude Label at edge of sphere
      const edgeP = project3D(-90, lat, radius, rotation);
      if (edgeP.z > -10 && (isEquator || isTropic || Math.abs(lat) === 60)) {
        ctx.save();
        ctx.font = '600 5.5px "JetBrains Mono", monospace';
        ctx.fillStyle = isEquator ? '#1d63ff' : '#94a3b8';
        const label = isEquator ? '00° EQUATORIAL PLANE' : (lat > 0 ? `+${lat}°N` : `${lat}°S`);
        ctx.fillText(label, edgeP.x + 4, edgeP.y + 2);
        ctx.restore();
      }
    });

    // Rotating Longitude Degree Markers along the Equator (every 30°)
    ctx.save();
    ctx.font = '600 5.5px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
    for (let lon = -180; lon < 180; lon += 30) {
      const eqP = project3D(lon, 0, radius, rotation);
      if (eqP.z > 15) {
        ctx.beginPath();
        ctx.arc(eqP.x, eqP.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        const lonText = lon === 0 ? '000°' : (lon > 0 ? `${lon}°E` : `${Math.abs(lon)}°W`);
        ctx.fillText(lonText, eqP.x + 3, eqP.y - 3);
      }
    }
    ctx.restore();

    // 6. Technical Graticule: Longitude Meridians (every 30°)
    for (let lon = -180; lon < 180; lon += 30) {
      const isPrime = lon === 0 || lon === 180;
      ctx.save();
      ctx.strokeStyle = isPrime ? 'rgba(203, 213, 225, 0.4)' : 'rgba(148, 163, 184, 0.18)';
      ctx.lineWidth = isPrime ? 1.1 : 0.6;
      ctx.setLineDash([2, 5]);

      ctx.beginPath();
      let first = true;
      for (let lat = -85; lat <= 85; lat += 4) {
        const p = project3D(lon, lat, radius, rotation);
        if (p.z > 0) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.stroke();
      ctx.restore();
    }

    // 7. Render Continents & Major Landmasses with Horizon Geometric Clipping
    const worldPolys = (typeof SHARED_CONTINENTS !== 'undefined') ? SHARED_CONTINENTS : [];
    ctx.save();
    worldPolys.forEach(poly => {
      const proj = poly.map(pt => project3D(pt[0], pt[1], radius, rotation));
      const len = proj.length;
      if (len < 2) return;

      ctx.beginPath();
      let first = true;
      for (let i = 0; i < len; i++) {
        const p1 = proj[i];
        const p2 = proj[(i + 1) % len];

        if (p1.z > 0 && p2.z > 0) {
          if (first) {
            ctx.moveTo(p1.x, p1.y);
            first = false;
          }
          ctx.lineTo(p2.x, p2.y);
        } else if (p1.z > 0 && p2.z <= 0) {
          const t = p1.z / (p1.z - p2.z);
          const cx_ = p1.x + t * (p2.x - p1.x);
          const cy_ = p1.y + t * (p2.y - p1.y);
          if (first) {
            ctx.moveTo(p1.x, p1.y);
            first = false;
          }
          ctx.lineTo(cx_, cy_);
          first = true;
        } else if (p1.z <= 0 && p2.z > 0) {
          const t = -p1.z / (p2.z - p1.z);
          const cx_ = p1.x + t * (p2.x - p1.x);
          const cy_ = p1.y + t * (p2.y - p1.y);
          ctx.moveTo(cx_, cy_);
          ctx.lineTo(p2.x, p2.y);
          first = false;
        }
      }

      ctx.strokeStyle = 'rgba(203, 213, 225, 0.55)'; // Translucent grey continent outlines
      ctx.lineWidth = 1.7;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fill();
    });
    ctx.restore();

    // 8. Tracing Airline Traffic (3D Arcs + Active Aircraft Comets + Callsign Tags)
    ctx.save();
    flightRoutes.forEach(route => {
      const hubA = hubs[route.from];
      const hubB = hubs[route.to];
      if (!hubA || !hubB) return;

      // Draw 3D Geodesic Arc elevated above surface
      const steps = 32;
      ctx.beginPath();
      let first = true;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const vt = slerpVec(hubA.vec, hubB.vec, t);
        const altFrac = 0.13 * Math.sin(Math.PI * t);
        const p = transformVec3D(vt, radius, altFrac, rotation);
        if (p.z > 0) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.lineWidth = 1.3;
      ctx.setLineDash([3, 4]);
      ctx.stroke();

      // Active Aircraft along the route
      const planeT = ((time * 0.0006 * route.speed) + route.offset) % 1;
      const vPlane = slerpVec(hubA.vec, hubB.vec, planeT);
      const planeAlt = 0.13 * Math.sin(Math.PI * planeT);
      const planePos = transformVec3D(vPlane, radius, planeAlt, rotation);

      if (planePos.z > 0) {
        // Calculate tangent vector for heading alignment
        const vNext = slerpVec(hubA.vec, hubB.vec, Math.min(1, planeT + 0.02));
        const nextAlt = 0.13 * Math.sin(Math.PI * Math.min(1, planeT + 0.02));
        const nextPos = transformVec3D(vNext, radius, nextAlt, rotation);
        const headingAngle = Math.atan2(nextPos.y - planePos.y, nextPos.x - planePos.x);

        // Contrail Vapor Jet Trail (6 fading particles)
        for (let tail = 1; tail <= 6; tail++) {
          const tailT = Math.max(0, planeT - tail * 0.015);
          const vTail = slerpVec(hubA.vec, hubB.vec, tailT);
          const tailAlt = 0.13 * Math.sin(Math.PI * tailT);
          const pTail = transformVec3D(vTail, radius, tailAlt, rotation);
          if (pTail.z > 0) {
            ctx.beginPath();
            ctx.arc(pTail.x, pTail.y, 2.4 - tail * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(2, 132, 199, ${0.8 - tail * 0.13})`;
            ctx.fill();
          }
        }

        // Draw Detailed CAD Airplane Silhouette (fuselage, delta wings, stabilizers)
        ctx.save();
        ctx.translate(planePos.x, planePos.y);
        ctx.rotate(headingAngle);

        ctx.fillStyle = '#1d63ff';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(7, 0);
        ctx.lineTo(2, -2.5);
        ctx.lineTo(-2, -7); // Left wingtip
        ctx.lineTo(-1, -2);
        ctx.lineTo(-5, -1.2);
        ctx.lineTo(-7, -4); // Left stabilizer
        ctx.lineTo(-6, 0);
        ctx.lineTo(-7, 4);  // Right stabilizer
        ctx.lineTo(-5, 1.2);
        ctx.lineTo(-1, 2);
        ctx.lineTo(-2, 7);  // Right wingtip
        ctx.lineTo(2, 2.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Pulsing altitude beacon ring
        const bRing = ((time * 0.003 + route.offset) % 1) * 9;
        ctx.strokeStyle = `rgba(29, 99, 255, ${0.9 - bRing / 9})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(planePos.x, planePos.y, bRing, 0, Math.PI * 2);
        ctx.stroke();

        // Flight Callsign Micro-Tag
        if (planePos.y > 20 && planePos.y < height - 20 && planePos.x > 30 && planePos.x < width - 30) {
          ctx.font = '700 6px "JetBrains Mono", monospace';
          ctx.fillStyle = '#0284c7';
          ctx.fillText(`✈ ${route.callsign} [${route.alt}]`, planePos.x + 9, planePos.y - 5);
        }
      }
    });
    ctx.restore();

    // 9. Animated Satellites in 3D Orbit
    // SATELLITE 1: SAT-01 // STARLINK-LEO (53° Inclined Orbit)
    const sat1R = radius + 32;
    const sat1Angle = (time * 0.0005) % (Math.PI * 2);
    // Draw 3D Orbit Path Ellipse
    ctx.save();
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.3)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    let satFirst = true;
    for (let th = 0; th <= Math.PI * 2 + 0.1; th += 0.1) {
      const op = projectOrbitPoint(sat1R, 53, th);
      if (op.z > -radius * 0.2) {
        if (satFirst) { ctx.moveTo(op.x, op.y); satFirst = false; }
        else { ctx.lineTo(op.x, op.y); }
      } else {
        satFirst = true;
      }
    }
    ctx.stroke();
    ctx.restore();

    // Satellite 1 Position
    const sat1Pos = projectOrbitPoint(sat1R, 53, sat1Angle);
    if (sat1Pos.z > -radius * 0.2) {
      ctx.save();
      // Satellite body: central core + solar panel wings
      ctx.translate(sat1Pos.x, sat1Pos.y);
      const satTangent = Math.atan2(
        projectOrbitPoint(sat1R, 53, sat1Angle + 0.05).y - sat1Pos.y,
        projectOrbitPoint(sat1R, 53, sat1Angle + 0.05).x - sat1Pos.x
      );
      ctx.rotate(satTangent);

      // Solar panels
      ctx.fillStyle = 'rgba(2, 132, 199, 0.9)';
      ctx.fillRect(-8, -2, 6, 4);
      ctx.fillRect(2, -2, 6, 4);
      // Bus core
      ctx.fillStyle = '#1d63ff';
      ctx.fillRect(-2, -2.5, 4, 5);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.6;
      ctx.strokeRect(-2, -2.5, 4, 5);
      ctx.restore();

      // Satellite radio ping wave
      const satPing = ((time * 0.0018) % 1) * 18;
      ctx.strokeStyle = `rgba(2, 132, 199, ${0.9 - satPing / 18})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(sat1Pos.x, sat1Pos.y, satPing, 0, Math.PI * 2);
      ctx.stroke();

      // Telemetry tag
      ctx.save();
      ctx.font = '700 6px "JetBrains Mono", monospace';
      ctx.fillStyle = '#0284c7';
      ctx.fillText('SAT-01 // LEO-550KM [7.6KM/S]', sat1Pos.x + 10, sat1Pos.y - 4);
      ctx.restore();
    }

    // SATELLITE 2: ISS-RESEARCH (42° Inclined Orbit)
    const sat2R = radius + 46;
    const sat2Angle = (-time * 0.00035 + 2.0) % (Math.PI * 2);
    // Orbit ellipse
    ctx.save();
    ctx.strokeStyle = 'rgba(29, 99, 255, 0.22)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    let sat2First = true;
    for (let th = 0; th <= Math.PI * 2 + 0.1; th += 0.1) {
      const op = projectOrbitPoint(sat2R, 42, th);
      if (op.z > -radius * 0.2) {
        if (sat2First) { ctx.moveTo(op.x, op.y); sat2First = false; }
        else { ctx.lineTo(op.x, op.y); }
      } else {
        sat2First = true;
      }
    }
    ctx.stroke();
    ctx.restore();

    const sat2Pos = projectOrbitPoint(sat2R, 42, sat2Angle);
    if (sat2Pos.z > -radius * 0.2) {
      ctx.save();
      ctx.translate(sat2Pos.x, sat2Pos.y);
      // ISS station shape: cross axis with 4 solar arrays
      ctx.fillStyle = '#1d63ff';
      ctx.fillRect(-2, -6, 4, 12);
      ctx.fillStyle = 'rgba(2, 132, 199, 0.85)';
      ctx.fillRect(-9, -5, 6, 3);
      ctx.fillRect(3, -5, 6, 3);
      ctx.fillRect(-9, 2, 6, 3);
      ctx.fillRect(3, 2, 6, 3);
      ctx.restore();

      const sat2Ping = ((time * 0.0014) % 1) * 16;
      ctx.strokeStyle = `rgba(29, 99, 255, ${0.8 - sat2Ping / 16})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(sat2Pos.x, sat2Pos.y, sat2Ping, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = '600 5.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#1d63ff';
      ctx.fillText('ISS // LAB-418KM [RESEARCH]', sat2Pos.x + 10, sat2Pos.y + 3);
      ctx.restore();
    }

    // 10. Pulsing World City Hubs with Kuala Lumpur Targeted Reticle
    hubs.forEach((hub, idx) => {
      const p = transformVec3D(hub.vec, radius, 0, rotation);
      if (p.z > 0) {
        const isKL = hub.primary;
        const pulseCycle = ((time * 0.0016 + idx * 0.18) % 1);

        ctx.save();
        // Expanding Ripple Ring 1
        const r1 = 3 + pulseCycle * (isKL ? 24 : 14);
        ctx.strokeStyle = isKL
          ? `rgba(29, 99, 255, ${0.95 - pulseCycle * 0.95})`
          : `rgba(2, 132, 199, ${0.7 - pulseCycle * 0.7})`;
        ctx.lineWidth = isKL ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r1, 0, Math.PI * 2);
        ctx.stroke();

        // Second ripple for KL
        if (isKL) {
          const pulseCycle2 = ((time * 0.0016 + idx * 0.18 + 0.5) % 1);
          const r2 = 3 + pulseCycle2 * 24;
          ctx.strokeStyle = `rgba(29, 99, 255, ${0.95 - pulseCycle2 * 0.95})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r2, 0, Math.PI * 2);
          ctx.stroke();

          // CAD Targeting Corner Brackets around KL
          const tb = 8;
          ctx.strokeStyle = '#1d63ff';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x - tb, p.y - tb + 3); ctx.lineTo(p.x - tb, p.y - tb); ctx.lineTo(p.x - tb + 3, p.y - tb);
          ctx.moveTo(p.x + tb - 3, p.y - tb); ctx.lineTo(p.x + tb, p.y - tb); ctx.lineTo(p.x + tb, p.y - tb + 3);
          ctx.moveTo(p.x - tb, p.y + tb - 3); ctx.lineTo(p.x - tb, p.y + tb); ctx.lineTo(p.x - tb + 3, p.y + tb);
          ctx.moveTo(p.x + tb - 3, p.y + tb); ctx.lineTo(p.x + tb, p.y + tb); ctx.lineTo(p.x + tb, p.y + tb - 3);
          ctx.stroke();

          // Subtle Radar Sweep Line from KL
          const sweepAngle = (time * 0.0015) % (Math.PI * 2);
          const sweepLen = 34;
          ctx.strokeStyle = 'rgba(29, 99, 255, 0.45)';
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(sweepAngle) * sweepLen, p.y + Math.sin(sweepAngle) * sweepLen);
          ctx.stroke();
        }

        // Solid Glowing Core Dot
        ctx.fillStyle = isKL ? '#1d63ff' : '#0284c7';
        ctx.beginPath();
        ctx.arc(p.x, p.y, isKL ? 4 : 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // CAD Leader Line & Hub Label
        if (isKL || p.z > radius * 0.15) {
          ctx.font = isKL ? '700 7px "JetBrains Mono", monospace' : '600 5.5px "JetBrains Mono", monospace';
          ctx.fillStyle = isKL ? '#1d63ff' : '#475569';
          ctx.strokeStyle = isKL ? 'rgba(29, 99, 255, 0.6)' : 'rgba(148, 163, 184, 0.45)';
          ctx.lineWidth = 0.8;

          const isRight = p.x < centerX + 20;
          const lx1 = isRight ? p.x + 4 : p.x - 4;
          const ly1 = p.y - 4;
          const lx2 = isRight ? p.x + 14 : p.x - 14;
          const ly2 = p.y - 12;
          const lx3 = isRight ? lx2 + (isKL ? 48 : 26) : lx2 - (isKL ? 48 : 26);

          ctx.beginPath();
          ctx.moveTo(lx1, ly1);
          ctx.lineTo(lx2, ly2);
          ctx.lineTo(lx3, ly2);
          ctx.stroke();

          ctx.textAlign = isRight ? 'left' : 'right';
          ctx.fillText(hub.tag, isRight ? lx2 + 2 : lx2 - 2, ly2 - 2);
        }
        ctx.restore();
      }
    });

    // 11. CAD Viewport Telemetry Micro-Readouts
    ctx.save();
    ctx.font = '600 6.5px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    const deg = Math.floor(((rotation * 180 / Math.PI) % 360 + 360) % 360);
    ctx.fillText(`θ: ${String(deg).padStart(3, '0')}° AZIMUTH // AXIS: -23.5° TILT`, 28, height - 16);
    ctx.textAlign = 'right';
    ctx.fillText('12 FLIGHT CORRIDORS ACTIVE // 2 LEO SATELLITES TRACKING', width - 28, height - 16);
    ctx.restore();
  }

  requestAnimationFrame(render);
}



// ----------------------------------------------------
// DYNAMIC ARCHITECTURAL CAD TELEMETRY & MEASUREMENTS
// (Fluctuating precision values, changing coordinates & live CAD readings)
// ----------------------------------------------------
function initCadDynamicTelemetry() {
  const dimXEl = document.getElementById('telemetryDimX');
  const spanXEl = document.getElementById('telemetrySpanX');
  const dimYEl = document.getElementById('telemetryDimY');
  const trEl = document.getElementById('telemetryTR');
  const blEl = document.getElementById('telemetryBL');
  const axisEl = document.getElementById('telemetryAxis');
  const tiltEl = document.getElementById('telemetryTilt');

  let cycle = 0;

  const trCoords = [
    'TR // 101°41\'22"E',
    'TR // 101°41\'28"E',
    'TR // LAT 03°08\'34"N',
    'TR // LON 101.6869°',
    'TR // AZ 267.4°',
    'TR // AZ 268.1°'
  ];

  const blCoords = [
    'BL // 03°08\'14"N',
    'BL // 03°08\'19"N',
    'BL // GRID A-01',
    'BL // LAT 03.1390°',
    'BL // ELEV 0.000',
    'BL // DATUM 00'
  ];

  setInterval(() => {
    cycle++;
    // Subtle realistic micro-fluctuations (sub-millimeter precision)
    const deltaX = ((Math.sin(cycle * 0.7) * 0.18) + (Math.cos(cycle * 1.3) * 0.08)).toFixed(2);
    const currentDimX = (1140.00 + parseFloat(deltaX)).toFixed(2);
    if (dimXEl) {
      dimXEl.textContent = `DIM: ${currentDimX} mm`;
    }

    const deltaY = ((Math.cos(cycle * 0.9) * 0.14) + (Math.sin(cycle * 1.1) * 0.06)).toFixed(2);
    const currentDimY = (640.00 + parseFloat(deltaY)).toFixed(2);
    if (dimYEl) {
      dimYEl.textContent = `ELEV: +${currentDimY} mm`;
    }

    const tol = (0.020 + (Math.sin(cycle * 0.5) * 0.006)).toFixed(3);
    if (spanXEl) {
      spanXEl.textContent = `[SPAN 100% • TOL: ±${tol} • SCALE 1:1]`;
    }

    if (trEl) {
      trEl.textContent = trCoords[cycle % trCoords.length];
    }

    if (blEl) {
      blEl.textContent = blCoords[cycle % blCoords.length];
    }

    if (axisEl) {
      const az = (267.0 + (Math.sin(cycle * 0.4) * 1.2)).toFixed(1);
      axisEl.textContent = `AXIS: X-Y // ${az}°`;
    }

    if (tiltEl) {
      const tilt = (23.46 + (Math.sin(cycle * 0.3) * 0.08)).toFixed(2);
      tiltEl.textContent = `POLAR TILT: ${tilt}°`;
    }

    // Dynamic pillar coords
    const pillarCoords = document.querySelectorAll('.pillar-cad-coord');
    pillarCoords.forEach((el, idx) => {
      const pNum = String(idx + 1).padStart(2, '0');
      const pDelta = (368.00 + ((Math.sin(cycle + idx) * 0.12))).toFixed(2);
      el.textContent = `P-${pNum} // ${pDelta} mm`;
    });

    // Dynamic job coords
    const jobCoords = document.querySelectorAll('.job-cad-coord');
    const jobYears = ['2026-FDE', '2024-FINTECH', '2023-MARKETS', '2021-DENTSU', '2020-GROWTH', '2018-AGENCY', '2016-MEDIA', '2015-CREATIVE', '2001-FOUNDATIONS'];
    jobCoords.forEach((el, idx) => {
      const tag = jobYears[idx] || '2024-CAD';
      const liveBit = (cycle % 2 === 0) ? 'ACTIVE' : 'SYNC';
      el.textContent = `SPEC // ${tag} • ${liveBit}`;
    });

  }, 1800);
}

// ----------------------------------------------------
// 12. FANCY ANIMATED MARKETING / AI / BUSINESS GROWTH CANVAS
// (Neural synapsing, exponential growth trajectories, live telemetry, interactive physics)
// ----------------------------------------------------
function initMarketingAiCanvas() {
  const canvas = document.getElementById('marketingAiCanvas');
  const section = document.getElementById('skills');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let isVisible = true;

  function resize() {
    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // IntersectionObserver to pause rendering when offscreen
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(section);

  // Interactive mouse tracking
  const mouse = { x: -1000, y: -1000, active: false };
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  section.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // 1. Neural Network & Agentic AI Nodes
  const nodeCount = 28;
  const nodes = [];
  const nodeLabels = [
    'LLM CORE', 'AGENT ROUTER', 'N8N PIPELINE', 'META ADS API', 'GA4 STREAM',
    'ROAS OPT', 'LTV ENGINE', 'AUTONOMOUS FDE', 'SYNAPSE HUB', 'CDP MESH',
    'SEARCH AEO', 'CONVERSION ALPHA'
  ];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * (width || 1000),
      y: Math.random() * (height || 500),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() > 0.7 ? 3.5 : 2,
      pulse: Math.random() * Math.PI * 2,
      isHub: i < 5,
      label: i < nodeLabels.length ? nodeLabels[i] : null
    });
  }

  // Synapse traveling signal pulses
  const pulses = [];
  setInterval(() => {
    if (!isVisible) return;
    if (nodes.length > 2 && pulses.length < 12) {
      const idxA = Math.floor(Math.random() * nodes.length);
      let bestIdx = -1;
      let minD = 180;
      for (let j = 0; j < nodes.length; j++) {
        if (j === idxA) continue;
        const dx = nodes[j].x - nodes[idxA].x;
        const dy = nodes[j].y - nodes[idxA].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < minD) {
          minD = d;
          bestIdx = j;
        }
      }
      if (bestIdx !== -1) {
        pulses.push({
          from: idxA,
          to: bestIdx,
          progress: 0,
          speed: 0.018 + Math.random() * 0.022
        });
      }
    }
  }, 400);

  // 2. Rising Funnel & Conversion Growth Particles
  const funnelParticles = [];
  for (let i = 0; i < 20; i++) {
    funnelParticles.push({
      x: Math.random() * (width || 1000),
      y: Math.random() * (height || 500),
      vy: -(0.3 + Math.random() * 0.5),
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.5,
      color: Math.random() > 0.5 ? '#38bdf8' : '#10b981'
    });
  }

  // 3. Technical Candlestick Micro-Clusters along growth baseline
  const candlesticks = [];
  for (let i = 0; i < 18; i++) {
    candlesticks.push({
      relX: 0.08 + (i / 18) * 0.84,
      open: Math.random() * 12 + 4,
      close: Math.random() * 18 + 8,
      high: Math.random() * 24 + 18,
      low: Math.random() * 6 + 2,
      isBullish: Math.random() > 0.25
    });
  }

  let time = 0;

  function render() {
    if (!isVisible) {
      requestAnimationFrame(render);
      return;
    }

    time++;
    ctx.clearRect(0, 0, width, height);

    // Subtle Radial Background Glow behind matrix
    const bgGlow = ctx.createRadialGradient(
      width * 0.5, height * 0.45, 20,
      width * 0.5, height * 0.45, width * 0.65
    );
    bgGlow.addColorStop(0, 'rgba(29, 99, 255, 0.08)');
    bgGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.03)');
    bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, width, height);

    // Mouse Spotlight Ambient Glow
    if (mouse.active) {
      const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
      mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
      mouseGlow.addColorStop(0.6, 'rgba(29, 99, 255, 0.04)');
      mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mouseGlow;
      ctx.fillRect(0, 0, width, height);
    }

    // A. Business Exponential & Sigmoid Growth Trajectory Curves
    ctx.save();
    // Exponential Growth Curve 1: Primary ROAS / Scale Vector
    ctx.beginPath();
    const startX = width * 0.02;
    const startY = height * 0.82;
    const cp1x = width * 0.35;
    const cp1y = height * 0.78 + Math.sin(time * 0.02) * 8;
    const cp2x = width * 0.62;
    const cp2y = height * 0.35 + Math.cos(time * 0.025) * 10;
    const endX = width * 0.98;
    const endY = height * 0.18 + Math.sin(time * 0.015) * 6;

    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);

    const curveGrad = ctx.createLinearGradient(startX, startY, endX, endY);
    curveGrad.addColorStop(0, 'rgba(29, 99, 255, 0.1)');
    curveGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.45)');
    curveGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.65)');
    curveGrad.addColorStop(1, 'rgba(56, 189, 248, 0.85)');

    ctx.strokeStyle = curveGrad;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Secondary Harmonic Growth Curve: AI Agentic Velocity
    ctx.beginPath();
    ctx.moveTo(startX, startY + 25);
    ctx.bezierCurveTo(
      width * 0.4, height * 0.88 + Math.cos(time * 0.018) * 8,
      width * 0.68, height * 0.42 + Math.sin(time * 0.02) * 12,
      endX, endY + 28
    );
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.lineDashOffset = -time * 0.8;
    ctx.stroke();
    ctx.setLineDash([]);

    // Shaded Area Under Primary Curve
    ctx.lineTo(endX, height);
    ctx.lineTo(startX, height);
    ctx.closePath();
    const areaGrad = ctx.createLinearGradient(0, height * 0.2, 0, height);
    areaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.04)');
    areaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = areaGrad;
    ctx.fill();
    ctx.restore();

    // Traveling Pulse Beacon on the Main Growth Curve
    const curveT = ((time * 0.0035) % 1);
    const u = 1 - curveT;
    const beaconX = u*u*u*startX + 3*u*u*curveT*cp1x + 3*u*curveT*curveT*cp2x + curveT*curveT*curveT*endX;
    const beaconY = u*u*u*startY + 3*u*u*curveT*cp1y + 3*u*curveT*curveT*cp2y + curveT*curveT*curveT*endY;

    ctx.save();
    // Expanding pulse ring
    const bRing = ((time * 0.03) % 1) * 20;
    ctx.strokeStyle = `rgba(16, 185, 129, ${0.9 - bRing / 20})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(beaconX, beaconY, bRing, 0, Math.PI * 2);
    ctx.stroke();

    // Beacon Core
    ctx.fillStyle = '#10b981';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(beaconX, beaconY, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Milestone Flag Tags along the Growth Curve
    const milestones = [
      { t: 0.28, label: 'Q1 // LTV +140%' },
      { t: 0.62, label: 'AGENTIC AI // ROAS 3.8x' },
      { t: 0.88, label: 'PEAK SCALE // +200% ROAS' }
    ];
    milestones.forEach(m => {
      const mt = m.t;
      const mu = 1 - mt;
      const mx = mu*mu*mu*startX + 3*mu*mu*mt*cp1x + 3*mu*mt*mt*cp2x + mt*mt*mt*endX;
      const my = mu*mu*mu*startY + 3*mu*mu*mt*cp1y + 3*mu*mt*mt*cp2y + mt*mt*mt*endY;

      ctx.save();
      // Tick mark
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mx, my - 3);
      ctx.lineTo(mx, my - 16);
      ctx.stroke();

      // Milestone Pill Tag
      ctx.font = '600 7px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(m.label, mx + 4, my - 12);
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.restore();
    });

    // B. Candlestick Breakout Growth Elements along Lower Trajectory
    candlesticks.forEach((cs) => {
      const cx = width * cs.relX;
      const cyBase = height * 0.9 - Math.sin(cs.relX * Math.PI) * 20;
      const candleColor = cs.isBullish ? 'rgba(16, 185, 129, 0.45)' : 'rgba(29, 99, 255, 0.35)';

      ctx.save();
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx, cyBase - cs.high);
      ctx.lineTo(cx, cyBase - cs.low);
      ctx.stroke();

      ctx.fillStyle = candleColor;
      const bodyH = Math.abs(cs.close - cs.open);
      const bodyY = cyBase - Math.max(cs.open, cs.close);
      ctx.fillRect(cx - 2, bodyY, 4, Math.max(2, bodyH));
      ctx.restore();
    });

    // C. Rising Funnel Conversion Particles
    funnelParticles.forEach(p => {
      p.y += p.vy;
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // D. Neural Network & Agent Synapses
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 10 || node.x > width - 10) node.vx *= -1;
      if (node.y < 10 || node.y > height - 10) node.vy *= -1;

      if (mouse.active) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 1) {
          const force = (130 - dist) / 130 * 1.5;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }
      }
    });

    // Draw Synaptic Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.22;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw Traveling Synapse Pulses
    for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
      const pulse = pulses[pIdx];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        pulses.splice(pIdx, 1);
        continue;
      }
      const nA = nodes[pulse.from];
      const nB = nodes[pulse.to];
      if (!nA || !nB) continue;

      const px = nA.x + (nB.x - nA.x) * pulse.progress;
      const py = nA.y + (nB.y - nA.y) * pulse.progress;

      ctx.save();
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw Neural Nodes & Hub Labels
    nodes.forEach(node => {
      ctx.save();
      if (node.isHub) {
        const hubR = 4 + Math.sin(time * 0.05 + node.pulse) * 2;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, hubR + 4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      if (node.label && width > 700) {
        ctx.font = '600 6.5px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.65)';
        ctx.fillText(node.label, node.x + 7, node.y + 2);
      }
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // Dynamic Telemetry Micro-readouts update
  const leftHud = document.getElementById('satMetricLeft');
  const rightHud = document.getElementById('satMetricRight');
  let hudTick = 0;
  setInterval(() => {
    if (!isVisible) return;
    hudTick++;
    const roas = (4.80 + Math.sin(hudTick * 0.4) * 0.12).toFixed(2);
    const cac = (14.20 - Math.cos(hudTick * 0.3) * 0.45).toFixed(2);
    const tokens = (142.0 + Math.sin(hudTick * 0.6) * 4.2).toFixed(1);
    const latency = Math.floor(11 + Math.abs(Math.sin(hudTick * 0.8)) * 3);

    if (leftHud) {
      leftHud.textContent = `MULTI-TOUCH ATTRIBUTION • REALTIME ROAS: ${roas}x • CAC: $${cac} • LTV: $248`;
    }
    if (rightHud) {
      rightHud.textContent = `32 NODES ACTIVE • ${tokens} TOKENS/SEC • LATENCY: ${latency}ms`;
    }
  }, 2200);
}
