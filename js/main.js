/**
 * @author Narendra Khadayat
 */

//--Happy coading ...

// All Functions
document.addEventListener("DOMContentLoaded", function () {
  initLanguageToggle();
  initDateTime();
  // initVisitorCounter();
  // initWeatherWidget();
  // initMap();
  // initGallery();
  // initContactForm();
  // initNewsletter();
  // initChatbot();
  initBackToTop();
  // initMobileMenu();
  initAnimations();
});

/**
 * Language Toggle Functionality
 */
function initLanguageToggle() {
  const toggleBtn = document.getElementById("langToggle");
  const englishElements = document.querySelectorAll(".english");
  const nepaliElements = document.querySelectorAll(".nepali");
  let isEnglish = true;

  // Set initial language
  updateLanguage();

  toggleBtn.addEventListener("click", function () {
    isEnglish = !isEnglish;
    updateLanguage();
  });

  function updateLanguage() {
    if (isEnglish) {
      englishElements.forEach((el) => (el.style.display = "inline"));
      nepaliElements.forEach((el) => (el.style.display = "none"));
    } else {
      englishElements.forEach((el) => (el.style.display = "none"));
      nepaliElements.forEach((el) => (el.style.display = "inline"));
    }

    // Update elements with data attributes
    document.querySelectorAll("[data-en]").forEach((el) => {
      el.textContent = isEnglish
        ? el.getAttribute("data-en")
        : el.getAttribute("data-ne");
    });

    //lan update placeholders
    document.querySelectorAll('input[placeholder=" "]').forEach((input) => {
      const label = input.nextElementSibling;
      if (label && label.tagName === "LABEL") {
        label.textContent = isEnglish
          ? label.getAttribute("data-en")
          : label.getAttribute("data-ne");
      }
    });
  }
}

/**
 * Date and Time Display
 */
function initDateTime() {
  function updateDateTime() {
    const now = new Date();

    // Options for date formatting
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // Format time as HH:MM AM/PM
    let hours = now.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes} ${ampm}`;

    // Update elements
    const dateElements = document.querySelectorAll(
      "#currentDate, #current-date"
    );
    const timeElement = document.getElementById("currentTime");

    dateElements.forEach((el) => {
      el.textContent = now.toLocaleDateString("en-US", dateOptions);
    });

    if (timeElement) {
      timeElement.textContent = timeString;
    }
  }

  // Update immediately and then every minute
  updateDateTime();
  setInterval(updateDateTime, 60000);
}
document.addEventListener('DOMContentLoaded', function () {
    const visitorCountElement = document.getElementById('visitorCount');

    fetch('https://api.countapi.xyz/hit/baril-village/baril-village-total-visits')
        .then(response => response.json())
        .then(data => {
            const count = data.value;
            displayCount(count);
        })
        .catch(error => {
            console.error("Visitor counter error:", error);
            visitorCountElement.textContent = "1K+"; // fallback
        });

    function displayCount(count) {
        if (count < 10000) {
            // Animate 0 → exact number
            animateValue(visitorCountElement, 0, count, 1500);
        } else {
            // First animate till 10000
            animateValue(visitorCountElement, 0, 10000, 1500, () => {
                // Then show in K+ format
                const thousands = Math.floor(count / 1000);
                visitorCountElement.textContent = `${thousands}K+`;
            });
        }
    }

    function animateValue(element, start, end, duration, callback) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else if (callback) {
                callback();
            }
        };
        window.requestAnimationFrame(step);
    }
});


// Weather API Data

async function fetchWeather() {
  const apiKey = "91be7cc07adf1200a79288349d7d1bd9";
  const lat = 29.6944;
  const lon = 80.670941;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data); 

    // Update values on webpage
    document.getElementById("temperature").textContent = `${Math.round(
      data.main.temp
    )}°C`;
    document.getElementById("weatherCondition").textContent =
      data.weather[0].main;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("windSpeed").textContent = `${Math.round(
      data.wind.speed
    )} km/h`;

    updateWeatherIcon(data.weather[0].main);
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    document.getElementById("weatherCondition").textContent = "Unavailable";
  }
}

// Icon + color changer based on weather condition
function updateWeatherIcon(condition) {
  const icon = document.getElementById("weatherIcon");

  switch (condition.toLowerCase()) {
    case "clear":
      icon.className = "fas fa-sun weather-icon-compact";
      icon.style.color = "#f39c12";
      break;
    case "clouds":
      icon.className = "fas fa-cloud weather-icon-compact";
      icon.style.color = "#95a5a6";
      break;
    case "rain":
    case "drizzle":
      icon.className = "fas fa-cloud-showers-heavy weather-icon-compact";
      icon.style.color = "#3498db";
      break;
    case "thunderstorm":
      icon.className = "fas fa-bolt weather-icon-compact";
      icon.style.color = "#9b59b6";
      break;
    case "snow":
      icon.className = "fas fa-snowflake weather-icon-compact";
      icon.style.color = "#b3e5fc";
      break;
    default:
      icon.className = "fas fa-cloud weather-icon-compact";
      icon.style.color = "#bdc3c7";
  }
}

// Run on load
window.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
});

// refresh every 15 minutes
setInterval(fetchWeather, 15 * 60 * 1000);



// ----------------------galary testing 1------------
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const galleryGrid = document.querySelector(".gallery-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const loadMoreBtn = document.getElementById("loadMore");
  const lightbox = document.querySelector(".lightbox-modal");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!galleryGrid) return;

  // Gallery Data - 
  const galleryData = [
    {
      src: "./images/baril_front_view.jpg",
      category: "landscape",
      caption: "View of Baril from the neighboring village of Chhepatta",
      caption_ne: "छिमेकी गाउँ छेपट्टा बाट बारिल को दृश्य",
    },
    {
      src: "./images/baril_icefall.jpg",
      category: "landscape",
      caption: "Snow view from Baril",
      caption_ne: "बारिल बाट हिऊ को दृश्य",
    },
    {
      src: "./images/malla_gaau.jpg",
      category: "landscape",
      caption: "Malla Gau view",
      caption_ne: "मल्ला गाउँको दृश्य",
    },
    {
      src: "./images/chantoli_school.jpg",
      category: "landscape",
      caption: "Latinath Basic School Chantoli",
      caption_ne: "लटिनाथ आधारभूत विद्यालय चन्तोलि",
    },
    {
      src: "./images/balanch_school.jpg",
      category: "landscape",
      caption: "Balanch School",
      caption_ne: "बलाँच  मा.वि.",
    },
    {
      src: "./images/gaura.jpg",
      category: "culture",
      caption: "Gaura Parva Baril",
      caption_ne: "गौरा पर्व बारिल",
    },
    {
      src: "./images/jaat2.jpg",
      category: "culture",
      caption: "The festival is held in Kartik",
      caption_ne: "पारम्परिक चाड (जात्रा) कार्तिक मा",
    },
    {
      src: "./images/baril_school_students.jpg",
      category: "people",
      caption: "Students from baril school",
      caption_ne: "बारिल स्कूलका विद्यार्थीहरू",
    },
    {
      src: "./images/basinda.jpg",
      category: "people",
      caption: "Fun Gathering",
      caption_ne: "रमाइलो भेला",
    },
  ];

  let currentFilter = "all";
  let displayedItems = 4; //  matching data length
  let currentImageIndex = 0;
  let filteredData = [];

  // Initialize gallery
  renderGallery();

  // Filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      displayedItems = 4; // Reset to inti
      renderGallery();
    });
  });

  // Load more button 
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      displayedItems += 4; // Load 4 more items
      renderGallery();

      // Hide button if all items are displayed
      if (displayedItems >= filteredData.length) {
        this.style.display = "none";
      } else {
        this.style.display = "inline-block"; 
      }
    });
  }

  
  // Gallery item click
  galleryGrid.addEventListener("click", function (e) {
    const galleryItem = e.target.closest(".gallery-item");
    if (!galleryItem) return;

    const index = parseInt(galleryItem.dataset.index);
    openLightbox(index);
  });

  // Lightbox controls
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  });

  // Render gallery fixed
  function renderGallery() {
    galleryGrid.innerHTML = "";

    filteredData =
      currentFilter === "all"
        ? galleryData
        : galleryData.filter((item) => item.category === currentFilter);

    const itemsToShow = filteredData.slice(0, displayedItems);

    itemsToShow.forEach((item, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.dataset.index = index;

      // Create image element
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption;
      img.loading = "lazy";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";

      // Add hover overlay
      const overlay = document.createElement("div");
      overlay.className = "gallery-item-overlay";
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background =
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.3s ease";

      galleryItem.appendChild(img);
      galleryItem.appendChild(overlay);
      galleryGrid.appendChild(galleryItem);

      // Handle hover effects
      galleryItem.addEventListener("mouseenter", () => {
        overlay.style.opacity = "1";
      });

      galleryItem.addEventListener("mouseleave", () => {
        overlay.style.opacity = "0";
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.style.display =
        displayedItems >= filteredData.length ? "none" : "inline-block";
    }
  }

  // Open lightbox
  function openLightbox(index) {
    currentImageIndex = index;
    const item = filteredData[currentImageIndex];

    // Get current language
    const isNepali = document.documentElement.lang === "ne";

    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = isNepali ? item.caption_ne : item.caption;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Show previous image
  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + filteredData.length) % filteredData.length;
    const item = filteredData[currentImageIndex];

    const isNepali = document.documentElement.lang === "ne";
    lightboxImg.src = item.src;
    lightboxCaption.textContent = isNepali ? item.caption_ne : item.caption;
  }

  // Show next image
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredData.length;
    const item = filteredData[currentImageIndex];

    const isNepali = document.documentElement.lang === "ne";
    lightboxImg.src = item.src;
    lightboxCaption.textContent = isNepali ? item.caption_ne : item.caption;
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
});


// -----------Map section------------
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  const map = L.map("villageMap").setView([29.694265, 80.671019], 15); // coordinates for Baril

  // ===== SATELLITE BASE LAYER =====
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
      maxZoom: 19,
    }
  ).addTo(map);


  //  for all "View on Map" buttons
  document.querySelectorAll(".btn-locate").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      //  the location key from parent card
      const locationKey = this.closest(".location-card").dataset.location;
      const location = locations[locationKey];

      // 1. Scroll to map section
      document.getElementById("map").scrollIntoView({
        behavior: "smooth",
      });

      // 2. Fly to location on map 
      if (location) {
        setTimeout(() => {
          map.flyTo(location.coords, 16, {
            duration: 1.5,
            easeLinearity: 0.25,
          });

          // Open popup after animation (existing)
          setTimeout(() => {
            const marker = Object.values(map._layers).find((layer) => {
              return (
                layer instanceof L.Marker &&
                layer.getLatLng().lat === location.coords[0] &&
                layer.getLatLng().lng === location.coords[1]
              );
            });
            if (marker) marker.openPopup();
          }, 1500);
        }, 300);
      }
    });
  });

  // Custom Icons Definition
  const icons = {
    residential: L.divIcon({
      html: '<i class="fas fa-home" style="color:rgb(191, 196, 193); font-size: 24px;"></i>',
      className: "custom-icon",
      iconSize: [24, 24],
    }),
    pilgrimage: L.divIcon({
      html: '<i class="fas fa-place-of-worship" style="color: #f39c12; font-size: 24px;"></i>',
      className: "custom-icon",
      iconSize: [24, 24],
    }),
    temple: L.divIcon({
      html: '<i class="fas fa-om" style="color:rgb(180, 11, 247); font-size: 24px;"></i>',
      className: "custom-icon",
      iconSize: [24, 24],
    }),
    school: L.divIcon({
      html: '<i class="fas fa-school" style="color: #3498db; font-size: 24px;"></i>',
      className: "custom-icon",
      iconSize: [24, 24],
    }),
  };

  // locations data with type corrections
  const locations = {
    tupgaan: {
      name: "Tupgaan",
      coords: [29.699703, 80.67587],
      type: "residential",
      description: "DevBhumi",
    },
    malla: {
      name: "Malla-Gau",
      coords: [29.694683, 80.671027],
      type: "residential",
      description: "Main residential area",
    },
    baagmore: {
      name: "Baagmore",
      coords: [29.696872, 80.676512],
      type: "residential",
      description: "Residential area",
    },
    talla: {
      name: "Talla-Gau",
      coords: [29.692972, 80.671086],
      type: "residential",
      description: "Main residential area",
    },
    kotbaril: {
      name: "Kot-Baril",
      coords: [29.69353, 80.674792],
      type: "residential",
      description: "Residential area",
    },
    Tirsha: {
      name: "Tirsha",
      coords: [29.689635, 80.670775],
      type: "residential",
      description: "Residential area",
    },
    khalibagad: {
      name: "Khalibagad",
      coords: [29.689543, 80.672698],
      type: "residential",
      description: "Residential area",
    },
    sittoli: {
      name: "Sittoli",
      coords: [29.687888, 80.667637],
      type: "residential",
      description: "Residential area",
    },
    thulamadau: {
      name: "Latinath-Temple",
      coords: [29.696205, 80.674283],
      type: "temple",
      description: "Historical temple area",
    },
    Bhamak: {
      name: "Bhamak-Tirthsthal",
      coords: [29.692269, 80.676206],
      type: "pilgrimage",
      description: "Sacred Pilgrimage Place",
    },
    samaiji: {
      name: "Samaiji-Temple",
      coords: [29.690928, 80.674467],
      type: "temple",
      description: "Hindu temple",
    },
    Lschool: {
      name: "Latinath-school",
      coords: [29.693387, 80.668943],
      type: "school", 
      description: "Lower Secondary School (OLD)",
    },
    chantoli: {
      name: "Chantoli School",
      coords: [29.68918, 80.66783],
      type: "school", 
      description: "Latinath Basic(1-8) School, Chantoli",
    },
  };

  // Add markers to map
  Object.keys(locations).forEach((key) => {
    const location = locations[key];
    const icon = icons[location.type.toLowerCase()] || icons.residential; 

    L.marker(location.coords, {
      icon: icon,
      riseOnHover: true,
    }).addTo(map).bindPopup(`
          <h4>${location.name}</h4>
          <p>${location.description}</p>
          <small>${
            location.type.charAt(0).toUpperCase() + location.type.slice(1)
          }</small>
      `);
  });

  
  // Add a polygon for forest area gharkudi
  const forestArea = L.polygon(
    [
      [29.693277, 80.661741], //SW
      [29.693526, 80.668495], //SE
      [29.69657, 80.667507], //NE
      [29.696045, 80.661486], //NW
    ],
    {
      color: "green",
      fillColor: "#2e8b57",
      fillOpacity: 0.3,
      weight: 1.5,
    }
  )
    .addTo(map)
    .bindPopup("Gharkudi Forest Conservation Area");

  // Add a polygon for farming area sero
  const farmingArea = L.polygon(
    [
      [29.690202, 80.670984],
      [29.691408, 80.674435],
      [29.694394, 80.674543],
      [29.694488, 80.672885],
    ],
    {
      color: "brown",
      fillColor: "#deb887",
      fillOpacity: 0.3,
      weight: 1,
    }
  )
    .addTo(map)
    .bindPopup("BARIL, SERO Agricultural Field");

  // Location buttons functionality
  document.querySelectorAll(".btn-locate").forEach((button) => {
    button.addEventListener("click", function () {
      const locationKey = this.closest(".location-card").dataset.location;
      const location = locations[locationKey];

      if (location) {
        map.flyTo(location.coords, 16, {
          duration: 1.5,
          easeLinearity: 0.25,
        });

        // Open popup after animation
        setTimeout(() => {
          const marker = Object.values(map._layers).find((layer) => {
            return (
              layer instanceof L.Marker &&
              layer.getLatLng().lat === location.coords[0] &&
              layer.getLatLng().lng === location.coords[1]
            );
          });
          if (marker) marker.openPopup();
        }, 1500);
      }
    });
  });

  //  geolocation control
  map.addControl(
    L.control.locate({
      position: "topright",
      strings: {
        title: "Show my location",
        popup: "You are within {distance} {unit} from this point",
      },
      locateOptions: {
        maxZoom: 16,
      },
    })
  );

  // Add scale control
  L.control.scale({ imperial: false }).addTo(map);

  // // Add fullscreen control
  // map.addControl(
  //   new L.Control.Fullscreen({
  //     position: "topright",
  //     title: {
  //       false: "View Fullscreen",
  //       true: "Exit Fullscreen",
  //     },
  //   })
  // );

  // Add layer control for toggling areas
  const overlayMaps = {
    "Forest Area": forestArea,
    "Farming Area": farmingArea,
  };
  L.control.layers(null, overlayMaps, { position: "topright" }).addTo(map);

  // Add custom button to reset view
  const resetControl = L.Control.extend({
    options: {
      position: "topright",
    },
    onAdd: function (map) {
      const container = L.DomUtil.create(
        "div",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );
      container.innerHTML = '<a href="#" title="Reset View">↻</a>';
      container.style.backgroundColor = "white";
      container.style.cursor = "pointer";
      container.style.padding = "5px";
      container.style.fontSize = "18px";

      container.onclick = function () {
        map.flyTo([29.694265, 80.671019], 15);
        return false;
      };

      return container;
    },
  });
  map.addControl(new resetControl());
});


document.addEventListener("DOMContentLoaded", function () {
  // Tab Switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      tabBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      document.getElementById("formType").value = this.dataset.tab;
      updateFormLabels(this.dataset.tab);
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Show UI feedback
      contactForm.style.display = "none";
      document.querySelector(".form-success").style.display = "block";

      // Submit data
      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
        });
        console.log("Submission result:", await response.json());
      } catch (error) {
        console.error("Submission error:", error);
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = "block";
        document.querySelector(".form-success").style.display = "none";
      }, 3000);
    });
  }

  // Updated label function 
  function updateFormLabels(tabType) {
    const messageLabel = document.querySelector('label[for="message"]');
    if (tabType === "suggestion") {
      messageLabel.setAttribute("data-en", "Your Suggestion");
      messageLabel.setAttribute("data-ne", "तपाईंको सुझाव");
    } else if (tabType === "feedback") {
      messageLabel.setAttribute("data-en", "Your Feedback");
      messageLabel.setAttribute("data-ne", "तपाईंको प्रतिक्रिया");
    } else {
      messageLabel.setAttribute("data-en", "Your Message");
      messageLabel.setAttribute("data-ne", "तपाईंको सन्देश");
    }
  }
});

// -------------------------------


document.addEventListener("DOMContentLoaded", function () {
  const typingElement = document.querySelector(".typing-text");
  const cursor = document.querySelector(".cursor-blink");
  if (!typingElement) return;

  // Configuration
  const config = {
    typingSpeed: 80, // Base speed in ms (constant)
    speedVariation: 20, // +/- ms variation for natural feel
    pauseAtEnd: 3000, // Pause before restart (ms)
    cursorBlinkSpeed: 500, // Cursor blink interval (ms)
  };

  let currentText = "";
  let animationTimeout;
  let isTyping = false;
  let currentLanguage = "en"; // Default language

  // Clean up any previous animation
  function resetAnimation() {
    clearTimeout(animationTimeout);
    isTyping = false;
    cursor.style.visibility = "visible";
  }

  // Get text based on current language
  function getText() {
    return typingElement.getAttribute(`data-${currentLanguage}`) || "";
  }

  // Typewriter effect
  function typeWriter(text, i = 0) {
    if (i < text.length) {
      isTyping = true;
      currentText = text.substring(0, i + 1);
      typingElement.textContent = currentText;

      // Calculate speed with slight variation for natural feel
      const speed =
        config.typingSpeed +
        (Math.random() * config.speedVariation * 2 - config.speedVariation);

      animationTimeout = setTimeout(() => typeWriter(text, i + 1), speed);
    } else {
      isTyping = false;
      // Blink cursor while paused
      let visible = true;
      const blinkInterval = setInterval(() => {
        cursor.style.visibility = visible ? "visible" : "hidden";
        visible = !visible;
      }, config.cursorBlinkSpeed);

      // Restart animation after pause
      animationTimeout = setTimeout(() => {
        clearInterval(blinkInterval);
        typingElement.textContent = "";
        typeWriter(getText());
      }, config.pauseAtEnd);
    }
  }

  // Initialize typing
  function initTyping() {
    resetAnimation();
    typeWriter(getText());
  }

  // Language toggle handler 
  function handleLanguageToggle() {
    currentLanguage = currentLanguage === "en" ? "ne" : "en";
    initTyping();
  }

  // Opt Pause on hover
  typingElement.addEventListener("mouseenter", resetAnimation);
  typingElement.addEventListener("mouseleave", initTyping);

  // Start the animation
  initTyping();

  // Clean up on page unload
  window.addEventListener("beforeunload", resetAnimation);
});

// -------------------------------------------------


document.querySelector(".menu-toggle").addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");

  // Opt Toggle between hamburger and X icon
  const icon = this.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

document.getElementById("currentYear").textContent = new Date().getFullYear();


/**
 * Scroll Animations
 * Animates elements when they come into view
 */
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeIn");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all elements with the 'fadeIn' class
  document.querySelectorAll(".fadeIn").forEach((element) => {
    observer.observe(element);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initBackToTop();
  // initChatbot();
  // initLanguageSupport();

  // Simulate new message notification after delay 
  setTimeout(() => {
    // showNewMessageNotification();
  }, 15000);
});

/**
 * Back to Top Button Functionality
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top");

  if (!backToTopBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}




