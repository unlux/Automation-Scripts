// ==UserScript==
// @name         LPU Placements Highlighter
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Highlight "Yes", "Click to cancel", and "OC" links in LPU Placements portal
// @author       lux
// @match        https://ums.lpu.in/Placements/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function highlightLinks() {
    const rows = document.querySelectorAll(
      "tr.aspGridView_RowStyle, tr.aspGridView_AlternatingRowStyle"
    );
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (!cells.length) return;

      const codeCell = cells[0]; // first column = Drive Code
      const codeText = codeCell.textContent.trim();

      // Highlight OC codes
      if (codeText.startsWith("OC.")) {
        codeCell.style.backgroundColor = "#ffd966"; // soft yellow
        codeCell.style.fontWeight = "bold";
        codeCell.style.borderRadius = "4px";
        codeCell.style.padding = "2px 4px";
      }
    });

    const links = document.querySelectorAll("a.aspLinkButton, a.reg-btn");
    links.forEach((link) => {
      const text = link.textContent.trim().toLowerCase();

      if (text.includes("yes") || text.includes("click to cancel")) {
        // Green highlight for Yes / Click to cancel
        link.style.backgroundColor = "#ffffff";
        // link.style.color = "white";
        link.style.fontWeight = "bold";
        link.style.padding = "3px 6px";
        link.style.borderRadius = "5px";

        const row = link.closest("tr");
        if (row) {
          row.style.backgroundColor = "#74ff47"; // brighter green
        }
      }
    });
  }

  // Run once after page load
  window.addEventListener("load", highlightLinks);

  // Run again if DOM updates (like AJAX refresh)
  const observer = new MutationObserver(highlightLinks);
  observer.observe(document.body, { childList: true, subtree: true });
})();
