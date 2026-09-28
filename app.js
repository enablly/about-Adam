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
      html: el.innerHTML
    });
  });
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(edits));
  showToast('All text modifications saved to browser storage!');
}

function applySavedEdits(editsList) {
  const editableElements = document.querySelectorAll('[data-editable="true"]');
  editsList.forEach(item => {
    if (editableElements[item.index]) {
      editableElements[item.index].innerHTML = item.html;
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
