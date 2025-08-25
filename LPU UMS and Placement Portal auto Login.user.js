// ==UserScript==
// @name         LPU UMS + Placements AutoFill
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Autofill login for both LPU UMS and Placements portal
// @author       lux
// @match        https://ums.lpu.in/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Your credentials
  const username = "USERNAME";
  const password = "PASSWORD";

  // Helper to wait until an element is available in DOM
  function waitForElement(selector, callback) {
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        callback(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Detect which page we are on
  const url = window.location.href;

  // Case 1: UMS Login Page
  if (url.includes("/lpuums/")) {
    window.addEventListener("load", () => {
      // Fill UID
      const usernameField = document.getElementById("txtU");
      if (usernameField) {
        usernameField.value = username;
        usernameField.dispatchEvent(new Event("input", { bubbles: true }));
      }

      // Wait for password field after refresh
      waitForElement('input[type="password"]', (passwordField) => {
        passwordField.value = password;
        passwordField.dispatchEvent(new Event("input", { bubbles: true }));

        // Optional: focus captcha input if exists
        const captchaField = document.querySelector('input[id*="Captcha"]');
        if (captchaField) captchaField.focus();
      });
    });
  }

  // Case 2: Placements Login Page
  else if (url.includes("/Placements/")) {
    window.addEventListener("load", () => {
      const usernameField = document.getElementById("txtUserName");
      const passwordField = document.getElementById("txtPassword");
      const loginButton = document.getElementById("Button1");

      if (usernameField && passwordField && loginButton) {
        usernameField.value = username;
        passwordField.value = password;

        // Trigger input events to mimic real typing
        usernameField.dispatchEvent(new Event("input", { bubbles: true }));
        passwordField.dispatchEvent(new Event("input", { bubbles: true }));

        // Auto click login
        loginButton.click();
      }
    });
  }
})();
