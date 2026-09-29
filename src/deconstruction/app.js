import { DeconstructionEngine } from './engine.js';
import { SoundEngine } from './audio.js';

export function initDeconstructionShowcase() {
  const canvas = document.getElementById('deconstruct-viewport');
  if (!canvas) return;

  const sound = new SoundEngine();

  // 6 Ultra-Minimal Editorial Chapters with Dynamic Cinematic Positioning
  const storyChapters = [
    {
      tag: '01 // AERODYNAMICS',
      title: 'Front Splitter',
      desc: 'Autoclaved carbon-fiber generating 180kg front downforce.',
      badge: '01 / Splitter',
      pos: 'pos-top-left'
    },
    {
      tag: '02 // RUNNING GEAR',
      title: 'BBS Magnesium & Brembo',
      desc: '18-inch forged center-locks with 6-piston monobloc calipers.',
      badge: '02 / Wheels',
      pos: 'pos-bottom-left'
    },
    {
      tag: '03 // COCKPIT',
      title: 'Carbon-Kevlar Sanctuary',
      desc: 'FIA multi-point steel roll cage and Recaro racing cell.',
      badge: '03 / Cockpit',
      pos: 'pos-bottom-center'
    },
    {
      tag: '04 // DOWNFORCE',
      title: 'Dual-Element GT Wing',
      desc: 'High-modulus carbon wing with twin side-exit exhausts.',
      badge: '04 / GT Wing',
      pos: 'pos-top-right'
    },
    {
      tag: '05 // MATRIX',
      title: 'Deconstructed Anatomy',
      desc: 'Every mechanical subsystem decoupled in spatial harmony.',
      badge: '05 / Matrix',
      pos: 'pos-top-center'
    },
    {
      tag: '06 // THE ICON',
      title: 'BMW M3 GTR',
      desc: 'The undefeated 2005 Need for Speed: Most Wanted legend.',
      badge: '06 / Legend',
      pos: 'pos-top-right'
    }
  ];

  // UI Elements
  const stageTag = document.getElementById('stage-tag');
  const stageTitle = document.getElementById('stage-title');
  const stageDesc = document.getElementById('stage-desc');
  const metricExplosion = document.getElementById('metric-explosion');
  const scrubSlider = document.getElementById('scrub-slider');
  const timelineDots = document.querySelectorAll('.timeline-dot');

  let currentProgress = 0;
  let targetProgress = 0;
  let isUserScrubbing = false;
  let activeChapterIndex = -1;

  // Performance Optimization: Render-on-demand & settling frames
  let renderFramesNeeded = 30; // initial boot frames for smooth model & IBL spinup
  function requestFrames(count = 15) {
    renderFramesNeeded = Math.max(renderFramesNeeded, count);
  }

  const engine = new DeconstructionEngine({
    canvas,
    onProgressChange: (p, deconstruct) => {
      if (!isUserScrubbing && scrubSlider) {
        scrubSlider.value = String(p * 100);
      }
    }
  });
  window.__engine = engine;

  // Theme Management (Dark Showroom / Light Showroom)
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  function applyTheme(themeName) {
    const isLight = themeName === 'light';
    document.body.classList.toggle('light-mode', isLight);
    document.body.classList.toggle('dark-mode', !isLight);
    engine.setTheme(themeName);
    if (themeIcon) themeIcon.textContent = isLight ? '☾' : '☼';
    if (themeLabel) themeLabel.textContent = isLight ? 'Dark' : 'Light';
    try {
      localStorage.setItem('bmw_m3_theme', themeName);
    } catch (_) {}
    requestFrames(15);
  }

  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('bmw_m3_theme') || 'dark';
  } catch (_) {}
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      sound.playClick();
      const currentIsLight = document.body.classList.contains('light-mode');
      applyTheme(currentIsLight ? 'dark' : 'light');
    });
  }

  // Load BMW M3 E46 GTR 3D model
  engine.loadModel('/assets/car/model.glb')
    .then(() => {
      console.log('Model loaded successfully');
      requestFrames(35);
    })
    .catch(err => {
      console.error('CRITICAL: Failed to load car model:', err);
    });

  // ==========================================================================
  // SCROLL SYNCHRONIZATION (Continuous 1:1 Cinematic Tracking)
  // ==========================================================================
  function onScroll() {
    if (isUserScrubbing) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const scrollY = window.scrollY || window.pageYOffset;
    targetProgress = Math.max(0, Math.min(1.0, scrollY / maxScroll));
    requestFrames(15);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  const floatingHud = document.getElementById('floating-story-hud');
  const storyEditorial = document.getElementById('story-editorial');
  let hudFadeTimer = null;

  // Minimal Editorial Narrative Synchronization with Smooth Position & Fade Transitions
  function updateStoryHUD(p, deconstructP) {
    let index = 0;
    if (p >= 0.88) index = 5;
    else if (p >= 0.72) index = 4;
    else if (p >= 0.54) index = 3;
    else if (p >= 0.36) index = 2;
    else if (p >= 0.18) index = 1;
    else index = 0;

    timelineDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    if (index !== activeChapterIndex) {
      const isFirstInit = activeChapterIndex === -1;
      activeChapterIndex = index;
      const ch = storyChapters[index];

      if (isFirstInit) {
        if (stageTag) stageTag.textContent = ch.tag;
        if (stageTitle) stageTitle.textContent = ch.title;
        if (stageDesc) stageDesc.textContent = ch.desc;
        if (metricExplosion) metricExplosion.textContent = ch.badge;
        if (floatingHud) {
          floatingHud.className = 'floating-story-hud ' + ch.pos;
        }
      } else {
        if (hudFadeTimer) clearTimeout(hudFadeTimer);
        if (storyEditorial) storyEditorial.classList.add('fade-out');

        hudFadeTimer = setTimeout(() => {
          if (stageTag) stageTag.textContent = ch.tag;
          if (stageTitle) stageTitle.textContent = ch.title;
          if (stageDesc) stageDesc.textContent = ch.desc;
          if (metricExplosion) metricExplosion.textContent = ch.badge;
          if (floatingHud) {
            floatingHud.className = 'floating-story-hud ' + ch.pos;
          }
          if (storyEditorial) storyEditorial.classList.remove('fade-out');
          requestFrames(25);
        }, 150);
      }
    }
  }

  // Scrub Slider
  if (scrubSlider) {
    scrubSlider.addEventListener('input', e => {
      isUserScrubbing = true;
      targetProgress = Number(e.target.value) / 100;
      currentProgress = targetProgress;
      engine.updateCinematicScroll(currentProgress);
      updateStoryHUD(currentProgress, engine.deconstructionProgress);
      requestFrames(15);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: targetProgress * maxScroll, behavior: 'instant' });
    });

    scrubSlider.addEventListener('change', () => {
      isUserScrubbing = false;
      requestFrames(10);
    });
  }

  // Paint Finish Swatches
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const finishKey = btn.dataset.finish;
      engine.setPaintFinish(finishKey);
      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      requestFrames(15);
    });
  });

  // Fullscreen Management
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const enterFullscreenBtn = document.getElementById('enter-fullscreen-btn');

  async function toggleAppFullscreen() {
    try {
      const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isFullscreen) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape').catch(() => {});
        }
        if (orientationPrompt) orientationPrompt.classList.add('dismissed');
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      }
      requestFrames(30);
    } catch (err) {
      console.warn('Fullscreen action error:', err);
    }
  }

  function updateFullscreenUI() {
    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (fullscreenBtn) {
      fullscreenBtn.textContent = isFullscreen ? 'Exit Full' : '⛶ Fullscreen';
    }
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      sound.playClick();
      toggleAppFullscreen();
    });
  }

  if (enterFullscreenBtn) {
    enterFullscreenBtn.addEventListener('click', () => {
      sound.playClick();
      toggleAppFullscreen();
    });
  }

  document.addEventListener('fullscreenchange', updateFullscreenUI);
  document.addEventListener('webkitfullscreenchange', updateFullscreenUI);

  // Floating Story HUD Collapse Toggle
  const hudCollapseBtn = document.getElementById('hud-collapse-btn');
  if (hudCollapseBtn && floatingHud) {
    // Default to collapsed on compact landscape screens so the car is 100% visible
    if (window.innerWidth > window.innerHeight && window.innerHeight <= 620) {
      floatingHud.classList.add('collapsed');
      hudCollapseBtn.innerHTML = '+';
      hudCollapseBtn.setAttribute('title', 'Expand Details');
    }

    hudCollapseBtn.addEventListener('click', () => {
      sound.playClick();
      const isCollapsed = floatingHud.classList.toggle('collapsed');
      hudCollapseBtn.innerHTML = isCollapsed ? '+' : '&minus;';
      hudCollapseBtn.setAttribute('title', isCollapsed ? 'Expand Details' : 'Collapse Details');
    });
  }

  // Mobile Orientation Prompt Dismissal
  const orientationPrompt = document.getElementById('orientation-prompt');
  const dismissOrientationBtn = document.getElementById('dismiss-orientation-btn');
  if (dismissOrientationBtn && orientationPrompt) {
    dismissOrientationBtn.addEventListener('click', () => {
      sound.playClick();
      orientationPrompt.classList.add('dismissed');
    });
  }

  // Auto-reset dismissal if user turns to landscape so returning to portrait reminds them if needed
  window.addEventListener('resize', () => {
    onScroll();
    requestFrames(25);
    if (window.innerWidth > window.innerHeight && orientationPrompt) {
      orientationPrompt.classList.remove('dismissed');
    }
  });

  // Touch Swipe Gesture for mobile (fluidly scrub through 3D deconstruction)
  let touchStartY = 0;
  let touchStartX = 0;
  let isTouchDragging = false;
  let touchStartScrollY = 0;

  window.addEventListener('touchstart', (e) => {
    if (e.target.closest('button, input, a, .header-actions, .slider-panel, .finishes-panel, .inspect-drawer, .spatial-pin, #orientation-prompt')) {
      return;
    }
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartScrollY = window.scrollY || window.pageYOffset;
      isTouchDragging = true;
      requestFrames(15);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isTouchDragging || e.touches.length !== 1) return;
    const dy = touchStartY - e.touches[0].clientY;
    const dx = touchStartX - e.touches[0].clientX;

    const isLandscape = window.innerWidth > window.innerHeight;
    const delta = isLandscape && Math.abs(dx) > Math.abs(dy) ? dx : dy;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrollFactor = 2.0;
    const nextScroll = Math.max(0, Math.min(maxScroll, touchStartScrollY + delta * scrollFactor));
    window.scrollTo({ top: nextScroll, behavior: 'auto' });
    requestFrames(20);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isTouchDragging = false;
    requestFrames(15);
  }, { passive: true });

  // ==========================================================================
  // HIGH-PERFORMANCE SMART ANIMATION LOOP (60-120 FPS FLUIDITY + ZERO IDLE WASTE)
  // ==========================================================================
  function tick() {
    const diff = targetProgress - currentProgress;
    const isMoving = Math.abs(diff) > 0.00004;

    if (isMoving) {
      // Smooth progress damping for cinematic camera glide (ultra-smooth flow)
      currentProgress += diff * 0.08;
      engine.updateCinematicScroll(currentProgress);
      updateStoryHUD(currentProgress, engine.deconstructionProgress);
      engine.render();
      renderFramesNeeded = 10;
    } else if (renderFramesNeeded > 0) {
      if (currentProgress !== targetProgress) {
        currentProgress = targetProgress;
        engine.updateCinematicScroll(currentProgress);
        updateStoryHUD(currentProgress, engine.deconstructionProgress);
      }
      engine.render();
      renderFramesNeeded--;
    }

    requestAnimationFrame(tick);
  }

  // Initial trigger
  onScroll();
  tick();
}
