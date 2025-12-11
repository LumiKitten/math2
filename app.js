// ========================================
// TRIGONOMETRI LEKTIONER - APP.JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFacitToggles();
  initMobileMenu();
  renderKaTeX();
  
  // Show first lesson by default
  showLesson(1);
});

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const lessonId = parseInt(item.dataset.lesson);
      showLesson(lessonId);
      
      // Close mobile menu
      document.querySelector('.sidebar').classList.remove('open');
    });
  });
}

function showLesson(id) {
  // Hide all lessons
  document.querySelectorAll('.lesson').forEach(lesson => {
    lesson.classList.remove('active');
  });
  
  // Show selected lesson
  const targetLesson = document.getElementById(`lesson-${id}`);
  if (targetLesson) {
    targetLesson.classList.add('active');
  }
  
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (parseInt(item.dataset.lesson) === id) {
      item.classList.add('active');
    }
  });
  
  // Update URL hash
  history.pushState(null, '', `#lesson-${id}`);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update nav buttons
  updateNavButtons(id);
  
  // Re-render KaTeX for new content
  renderKaTeX();
}

function updateNavButtons(currentId) {
  const prevBtn = document.getElementById('prev-lesson');
  const nextBtn = document.getElementById('next-lesson');
  const totalLessons = document.querySelectorAll('.lesson').length;
  
  if (prevBtn) {
    prevBtn.disabled = currentId <= 1;
    prevBtn.onclick = () => showLesson(currentId - 1);
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentId >= totalLessons;
    nextBtn.onclick = () => showLesson(currentId + 1);
  }
}

// Handle back/forward browser buttons
window.addEventListener('popstate', () => {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#lesson-')) {
    const id = parseInt(hash.replace('#lesson-', ''));
    if (!isNaN(id)) {
      showLesson(id);
    }
  }
});

// ========================================
// FACIT (ANSWERS) TOGGLE
// ========================================

function initFacitToggles() {
  document.querySelectorAll('.facit-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isVisible = content.classList.contains('visible');
      
      content.classList.toggle('visible');
      toggle.textContent = isVisible ? '👁 Visa facit' : '👁 Dölj facit';
    });
  });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && 
          !sidebar.contains(e.target) && 
          !menuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
}

// ========================================
// KATEX RENDERING
// ========================================

function renderKaTeX() {
  // Auto-render all math in the document
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      errorColor: '#ff7675'
    });
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Smooth scroll to element
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Toggle solution visibility
function toggleSolution(button) {
  const solution = button.parentElement.querySelector('.solution-content');
  if (solution) {
    solution.classList.toggle('visible');
    button.textContent = solution.classList.contains('visible') 
      ? 'Dölj lösning' 
      : 'Visa lösning';
  }
}
