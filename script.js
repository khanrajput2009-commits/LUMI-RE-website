
// ==============================
// LUMIÈRE SALON - JAVASCRIPT
// ==============================

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  const icon = menuToggle.querySelector("i");

  if (navMenu.classList.contains("active")) {
    icon.classList.replace("fa-bars", "fa-xmark");
  } else {
    icon.classList.replace("fa-xmark", "fa-bars");
  }
});

// Close menu after clicking a link
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

// Reveal animation
const revealElements = document.querySelectorAll(
  ".service-card, .about-text, .about-images, .price-card, .testimonial-card, .booking-form, .section-heading"
);

revealElements.forEach(element => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(element => observer.observe(element));

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Minimum booking date
const dateInput = document.getElementById("date");
const today = new Date();

const localDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localDate;

// Booking form -> WhatsApp
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !service || !date || !time) {
    alert("Please complete all required fields.");
    return;
  }

  // Replace this number with your real WhatsApp number.
  // Use country code and number without + or spaces.
  const salonWhatsApp = "923001234567";

  const bookingMessage =
    "Hello LUMIÈRE Salon! I would like to request an appointment.\n\n" +
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    "Service: " + service + "\n" +
    "Date: " + date + "\n" +
    "Time: " + time + "\n" +
    "Message: " + (message || "No additional message");

  const whatsappURL =
    "https://wa.me/" + salonWhatsApp +
    "?text=" + encodeURIComponent(bookingMessage);

  window.open(whatsappURL, "_blank");
});

// Image fallback
// If one image fails, try another salon-related image.
const fallbackImages = [
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=80",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80"
];

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", function() {
    const currentFallback = Number(this.dataset.fallback || 0);

    if (currentFallback < fallbackImages.length) {
      this.dataset.fallback = currentFallback + 1;
      this.src = fallbackImages[currentFallback];
    }
  });
});
