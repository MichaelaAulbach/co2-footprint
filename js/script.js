"use strict";

import DataTable from "https://cdn.datatables.net/2.1.6/js/dataTables.mjs";
import "https://cdn.datatables.net/2.1.6/js/dataTables.bootstrap5.mjs";

function initDataTable() {
  const selector = "#emissionTable";
  const el = document.querySelector(selector);
  if (!el) return;
  if (el.dataset.dtReady === "1") return;

  try {
    const dt = new DataTable(el, {
      searching:  true,
      ordering:   true,
      order:      [[2, "desc"]],
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
      columnDefs: [{ targets: 2, type: "num", className: "text-end" }],
      language: {
        search: "Suche:",
        lengthMenu: "_MENU_ pro Seite",
        info: "_START_–_END_ von _TOTAL_ Einträgen",
        infoEmpty: "0 Einträge",
        zeroRecords: "Keine passenden Einträge gefunden",
        paginate: { previous: "Zurück", next: "Weiter" }
      }
    });
    el.dataset.dtReady = "1";
    window._dt = dt;
    console.log("✅ DataTable v2 (ESM) initialisiert");
  } catch (err) {
    console.error("❌ DataTables-Init fehlgeschlagen:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[APP] DOM ready");

  const menuBtn   = document.querySelector(".menu-toggle");
  const menuPanel = document.getElementById("localMenu");

  if (menuBtn && menuPanel) {
    const toggleMenu = () => {
      const open = menuPanel.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) menuPanel.querySelector("a")?.focus();
    };

    menuBtn.addEventListener("click", (e) => { e.preventDefault(); toggleMenu(); });
    document.addEventListener("click", (e) => {
      if (menuPanel.classList.contains("is-open") && !menuPanel.contains(e.target) && e.target !== menuBtn) {
        menuPanel.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuPanel.classList.contains("is-open")) {
        menuPanel.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  initDataTable();
});

window.addEventListener("load", () => {
  console.log("[APP] window.load");
  initDataTable();
});
