/*
 * Q-ASSIST site navigation behaviour.
 * Handles: (1) the "Guiding Principles" dropdown (mouse + keyboard),
 *          (2) the mobile menu toggle.
 * No dependencies; runs directly in the browser.
 */
(function () {
  "use strict";

  /* ----- Guiding Principles dropdown ----- */

  var dropdown = document.querySelector(".dropdown");
  var toggle = dropdown ? dropdown.querySelector(".dropdown-toggle") : null;
  var menu = dropdown ? dropdown.querySelector(".dropdown-menu") : null;

  function openDropdown() {
    dropdown.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    dropdown.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function isOpen() {
    return dropdown.classList.contains("open");
  }

  if (dropdown && toggle && menu) {
    // Click (also fires for Enter/Space on the button, so the dropdown
    // opens with the keyboard out of the box).
    toggle.addEventListener("click", function () {
      if (isOpen()) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Hover support for pointer users. Only on wider screens, where the
    // dropdown floats; on mobile it sits inline in the menu.
    var hoverQuery = window.matchMedia("(min-width: 861px) and (hover: hover)");

    dropdown.addEventListener("mouseenter", function () {
      if (hoverQuery.matches) {
        openDropdown();
      }
    });

    dropdown.addEventListener("mouseleave", function () {
      if (hoverQuery.matches) {
        closeDropdown();
      }
    });

    // Keyboard: ArrowDown from the toggle moves into the first menu item;
    // Escape closes and returns focus to the toggle.
    toggle.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openDropdown();
        var first = menu.querySelector("a");
        if (first) {
          first.focus();
        }
      }
    });

    dropdown.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        closeDropdown();
        toggle.focus();
      }
    });

    // Close when focus leaves the dropdown (e.g. tabbing past the last item).
    dropdown.addEventListener("focusout", function (event) {
      if (!dropdown.contains(event.relatedTarget)) {
        closeDropdown();
      }
    });

    // Close when clicking anywhere else on the page.
    document.addEventListener("click", function (event) {
      if (isOpen() && !dropdown.contains(event.target)) {
        closeDropdown();
      }
    });
  }

  /* ----- Timeline scroll reveal ----- */

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var steps = document.querySelectorAll(".tl-step");

  if (steps.length && !prefersReduced && "IntersectionObserver" in window) {
    steps.forEach(function (step) {
      step.classList.add("tl-hidden");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("tl-hidden");
            entry.target.classList.add("tl-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    steps.forEach(function (step) {
      observer.observe(step);
    });
  }

  /* ----- Roadmap marker scroll reveal ----- */

  var markers = document.querySelectorAll(".stage-link");

  if (markers.length && !prefersReduced && "IntersectionObserver" in window) {
    markers.forEach(function (m) {
      m.classList.add("marker-hidden");
    });

    var roadmap = document.querySelector(".roadmap-road");
    if (roadmap) {
      var markerObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              markers.forEach(function (m, i) {
                setTimeout(function () {
                  m.classList.remove("marker-hidden");
                  m.classList.add("marker-visible");
                }, i * 120);
              });
              markerObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      markerObserver.observe(roadmap);
    }
  }

  /* ----- Team bio popup ----- */

  var overlay = document.querySelector(".team-popup-overlay");
  var popup = overlay ? overlay.querySelector(".team-popup") : null;
  var cards = document.querySelectorAll(".team-card[data-bio-index]");

  if (overlay && popup && cards.length) {
    document.body.classList.add("js-bio-popup");

    var closeBtn = overlay.querySelector(".team-popup-close");
    var popupPhoto = overlay.querySelector(".team-popup-photo");
    var popupName = overlay.querySelector(".team-popup-name");
    var popupRole = overlay.querySelector(".team-popup-role");
    var popupBio = overlay.querySelector(".team-popup-bio");
    var activeCard = null;

    function openPopup(card) {
      var img = card.querySelector("img");
      var name = card.querySelector("h3");
      var role = card.querySelector(".role");
      var bio = card.querySelector(".bio");
      popupPhoto.src = img.src;
      popupPhoto.alt = img.alt;
      popupName.textContent = name.textContent;
      popupRole.textContent = role.textContent;
      popupBio.innerHTML = bio.innerHTML;
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      activeCard = card;
      closeBtn.focus();
    }

    function closePopup() {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      if (activeCard) {
        activeCard.focus();
        activeCard = null;
      }
    }

    cards.forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", card.querySelector("h3").textContent + " — view bio");

      card.addEventListener("click", function () {
        openPopup(card);
      });

      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPopup(card);
        }
      });
    });

    closeBtn.addEventListener("click", closePopup);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePopup();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) {
        closePopup();
      }
    });
  }

  /* ----- Mobile menu toggle ----- */

  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
