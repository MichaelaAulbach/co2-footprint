"use strict";

function initDataTable() {
  const selector = "#emissionTable";
  const el = document.querySelector(selector);
  if (!el) return;
  if (el.dataset.dtReady === "1") return;

  try {
    const dt = $(el).DataTable({

       autoWidth: false,
  dom:
    '<"row mb-3"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
    't' +
    '<"row mt-3"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',

       columns: [
    { render: $.fn.dataTable.render.text() },                       // Land
    { render: $.fn.dataTable.render.text() },                       // Unternehmen
    { render: $.fn.dataTable.render.number(' ', ',', 0, '', '') }   // Emissionen
  ],
  search: {
    regex: false,
    smart: true,
    caseInsensitive: true
  },
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
    const $filter = $(el).closest('.dataTables_wrapper').find('div.dataTables_filter input[type="search"]');
$filter.attr({ inputmode: 'text', maxlength: 200 });
$filter.on('input', function () {
  const clean = this.value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, 200);
  if (clean !== this.value) this.value = clean;
});
    el.dataset.dtReady = "1";
    window._dt = dt;
    console.log("DataTables (jQuery v1.13.8) initialisiert");
  } catch (err) {
    console.error("DataTables-Init fehlgeschlagen:", err);
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
