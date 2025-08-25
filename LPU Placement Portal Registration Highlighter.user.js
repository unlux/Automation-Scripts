// ==UserScript==
// @name         LPU Placements Highlighter
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Highlight available "Yes" registration links in LPU Placements portal (works for both aspLinkButton and reg-btn styles)
// @author       lux
// @match        https://ums.lpu.in/Placements/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function highlightYesLinks() {
    const links = document.querySelectorAll("a.aspLinkButton, a.reg-btn");
    links.forEach((link) => {
      if (link.textContent.trim().toLowerCase() === "yes") {
        // Style the link itself
        link.style.backgroundColor = "#28a745";
        link.style.color = "white";
        link.style.fontWeight = "bold";
        link.style.padding = "3px 6px";
        link.style.borderRadius = "5px";

        // Also highlight the parent row for visibility
        const row = link.closest("tr");
        if (row) {
          row.style.backgroundColor = "#64e033";
        }
      }
    });
  }

  // Run once after page load
  window.addEventListener("load", highlightYesLinks);

  // Run again if DOM updates (like AJAX refresh)
  const observer = new MutationObserver(highlightYesLinks);
  observer.observe(document.body, { childList: true, subtree: true });
})();
