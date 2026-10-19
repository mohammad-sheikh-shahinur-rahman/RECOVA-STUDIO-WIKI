/**
 * RECOVA STUDIO — Interactive Web UI & Documentation Engine
 * Handles 3D tilt interaction, quick search filter, and clipboard actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 3D Tilt Effect on App Preview Mockup
  const previewFrame = document.querySelector('.app-frame');
  const previewContainer = document.querySelector('.preview-showcase');

  if (previewFrame && previewContainer) {
    previewContainer.addEventListener('mousemove', (e) => {
      const rect = previewContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;  // Max 6 deg

      previewFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    previewContainer.addEventListener('mouseleave', () => {
      previewFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 2. Real-Time Search for Documentation Wiki
  const searchInput = document.getElementById('wikiSearch');
  if (searchInput) {
    const articles = document.querySelectorAll('.docs-article');
    const navLinks = document.querySelectorAll('.docs-nav-links a');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      articles.forEach((article) => {
        const text = article.innerText.toLowerCase();
        const articleId = article.id;
        const matchingLink = document.querySelector(`.docs-nav-links a[href="#${articleId}"]`);

        if (!query || text.includes(query)) {
          article.style.display = 'block';
          if (matchingLink) matchingLink.style.display = 'block';
        } else {
          article.style.display = 'none';
          if (matchingLink) matchingLink.style.display = 'none';
        }
      });
    });
  }

  // 3. Smooth Active Scrollspy for Docs Sidebar
  const observerSections = document.querySelectorAll('.docs-article');
  if (observerSections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.docs-nav-links a').forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    observerSections.forEach((section) => observer.observe(section));
  }

  // 4. Interactive App Interface Screenshots Showcase Switcher
  const tabBtns = document.querySelectorAll('.ui-tab-btn');
  const tourImg = document.getElementById('uiTourImg');
  const tourTitle = document.getElementById('uiTourTitle');
  const tourDesc = document.getElementById('uiTourDesc');

  if (tabBtns.length > 0 && tourImg && tourTitle && tourDesc) {
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const newImg = btn.getAttribute('data-img');
        const newTitle = btn.getAttribute('data-title');
        const newDesc = btn.getAttribute('data-desc');

        tourImg.style.opacity = '0';
        tourImg.style.transform = 'scale(0.99)';
        setTimeout(() => {
          tourImg.src = newImg;
          tourTitle.innerText = newTitle;
          tourDesc.innerText = newDesc;
          tourImg.style.opacity = '1';
          tourImg.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }
});


// Helper: Copy to Clipboard
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerText;
    buttonElement.innerText = 'Copied! ✓';
    buttonElement.style.color = '#10b981';
    setTimeout(() => {
      buttonElement.innerText = originalText;
      buttonElement.style.color = '';
    }, 2000);
  }).catch((err) => {
    console.error('Failed to copy text: ', err);
  });
}
