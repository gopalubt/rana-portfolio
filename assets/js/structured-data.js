// Create a script tag to hold the JSON-LD structured data
var ldJsonScript = document.createElement('script');
ldJsonScript.setAttribute('type', 'application/ld+json');

// JSON-LD data
var structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gopal Singh Rana",
  "jobTitle": "Frontend Developer",
  "url": "https://gopalubt.github.io/rana-portfolio/",
  "image": "https://gopalubt.github.io/assets/profile.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/gopal-rana-820a4862/",
    "https://github.com/gopalubt"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "GSR Tech"
  },
  "description": "Gopal Singh Rana is a frontend developer specializing in Angular, web development, and performance optimization."
};

// Inject the JSON-LD data into the script tag
ldJsonScript.text = JSON.stringify(structuredData);

// Append the script tag to the document's head
document.head.appendChild(ldJsonScript);
