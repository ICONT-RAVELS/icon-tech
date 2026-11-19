(function () {
  // Set your WhatsApp number here (country code + number, no + or spaces)
  var WHATSAPP = "917871134250";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Header shadow on scroll
  var header = $("#header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  // Mobile menu
  var menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$("#nav a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });

  // Live countdown in the phone preview
  var target = new Date("2027-02-12T10:00:00+05:30").getTime();
  function tick() {
    var d = Math.max(target - Date.now(), 0);
    $("#cd").textContent = Math.floor(d / 864e5);
    $("#ch").textContent = Math.floor(d % 864e5 / 36e5);
    $("#cm").textContent = Math.floor(d % 36e5 / 6e4);
  }
  tick(); setInterval(tick, 30000);

  // Theme filter
  $$("#filters .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      $$("#filters .chip").forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var f = chip.dataset.f;
      $$(".theme").forEach(function (t) {
        t.classList.toggle("hide", f !== "all" && t.dataset.c !== f);
      });
    });
  });

  // WhatsApp links: choosing a theme or plan pre-fills the message
  function wa(text) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text); }
  var waBtn = $("#waBtn");
  waBtn.href = wa("Hi, I want a wedding invitation website.");
  $$(".link").forEach(function (b) {
    b.addEventListener("click", function () {
      waBtn.href = wa("Hi, I like the " + b.dataset.theme + " theme. Please share details.");
      $("#ctaText").textContent = "You picked " + b.dataset.theme + ". Tap the button to message us.";
      $("#contact").scrollIntoView({ behavior: "smooth" });
    });
  });
  $$("[data-plan]").forEach(function (a) {
    a.addEventListener("click", function () {
      waBtn.href = wa("Hi, I am interested in the " + a.dataset.plan + " plan.");
      $("#ctaText").textContent = "You picked the " + a.dataset.plan + " plan. Tap the button to message us.";
    });
  });

  // Reveal on scroll
  var items = $$(".theme, .feat, .steps li, .plan, .title");
  items.forEach(function (el) { el.classList.add("rv"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("show"); });
  }
})();
