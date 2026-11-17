// ---------- Config ----------
const API_URL = "https://gp-cloud.vercel.app/api/v1/enquiry";
const API_HOST = "https://gopalubt.github.io/rana-portfolio";
const REQUEST_TIMEOUT_MS = 15000;

document.documentElement.classList.add("js");

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = themeBtn.querySelector("i");
  const isDark = theme === "dark";
  icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // storage blocked: theme still works for this visit
  }
}

if (themeBtn) {
  applyTheme(document.documentElement.getAttribute("data-theme") || "dark");
  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => reveal.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// ---------- Contact form ----------
const form = document.getElementById("enquiry");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

function showStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = `form-status ${type}`;
}

function setSending(sending) {
  submitBtn.disabled = sending;
  submitBtn.querySelector(".btn-label").textContent = sending ? "Sending..." : "Send message";
}

// Returns an error message, or "" when the form is valid.
function validate(data) {
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));

  if (!data.name) return markInvalid("inputname", "Please enter your name.");
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return markInvalid("inputEmail", "Please enter a valid email.");
  if (data.mobile.replace(/\D/g, "").length < 7) return markInvalid("inputphone", "Please enter a valid phone number.");
  return "";
}

function markInvalid(id, message) {
  const el = document.getElementById(id);
  el.classList.add("invalid");
  el.focus();
  return message;
}

async function sendEnquiry(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", apihost: API_HOST },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();
    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      mobile: form.elements.mobile.value.trim(),
      // The API has no subject field, so keep it by putting it in the message.
      message: subject ? `Subject: ${subject}\n\n${message}` : message,
    };

    const error = validate(data);
    if (error) {
      showStatus(error, "error");
      return;
    }

    setSending(true);
    showStatus("", "");

    try {
      await sendEnquiry(data);
      form.reset();
      showStatus("Thanks! Your message was sent. We'll get back to you soon.", "ok");
    } catch (err) {
      console.error("Enquiry failed:", err);
      const reason = err.name === "AbortError" ? "The request timed out." : "Something went wrong.";
      showStatus(`${reason} Please try again, or email ranagopal29@gmail.com.`, "error");
    } finally {
      setSending(false);
    }
  });
}
