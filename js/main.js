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
