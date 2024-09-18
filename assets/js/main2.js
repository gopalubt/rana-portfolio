// main.js

// Function to load content for a route
async function loadContent(route) {
    try {
      const response = await fetch(`./routes/${route}.html`); // Fetch the route-specific content
      if (!response.ok) throw new Error('Page not found');
      return response.text(); // Return the HTML content
    } catch (error) {
      console.error('Error loading content:', error);
      return '<h1>404 - Page Not Found</h1><p>This page does not exist.</p>'; // Default error content
    }
  }
  
  // Function to handle routing and content loading
  async function router() {
    const path = window.location.pathname.replace('/', '') || 'home'; // Get the current path
    const app = document.getElementById('app');
    
    // Clear current content
    app.innerHTML = '';
  
    // Load content for the current route
    const content = await loadContent(path);
    app.innerHTML = content;
  
    // Setup IntersectionObserver for progressive loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // You can load additional content here if needed
          // For example, add more content chunks if you split your content into parts
        }
      });
    });
  
    observer.observe(app);
  }
  
  // Handle navigation through clicks
  document.addEventListener('click', (event) => {
    if (event.target.matches('[data-link]')) {
      event.preventDefault(); // Prevent default anchor behavior
      const url = event.target.getAttribute('href');
      history.pushState(null, null, url); // Update URL
      router(); // Update content based on new URL
    }
  });
  
  // Handle back/forward navigation
  window.addEventListener('popstate', router);
  
  // Initialize router on page load
  window.addEventListener('load', router);
  