(function () {
  // Couple's WhatsApp number for RSVP replies (country code + number)
  var COUPLE_WHATSAPP = "917871134250";
  var $ = function (s) { return document.querySelector(s); };

  // Opening gate
  var gate = $("#gate");
  document.body.style.overflow = "hidden";
  $("#openBtn").addEventListener("click", function () {
    gate.classList.add("open");
    document.body.style.overflow = "";
  });

  // Countdown
  var target = new Date($("#cd").dataset.date).getTime();
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var d = Math.max(target - Date.now(), 0);
    $("#d").textContent = Math.floor(d / 864e5);
    $("#h").textContent = pad(Math.floor(d % 864e5 / 36e5));
    $("#m").textContent = pad(Math.floor(d % 36e5 / 6e4));
    $("#s").textContent = pad(Math.floor(d % 6e4 / 1e3));
  }
  tick(); setInterval(tick, 1000);

  // RSVP form -> opens WhatsApp message to the couple
  $("#rsvp").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var msg = "RSVP from " + f.name.value + "\nAttending: " + f.attend.value +
      "\nGuests: " + f.guests.value + "\nMessage: " + (f.msg.value || "-");
    window.open("https://wa.me/" + COUPLE_WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank");
    f.style.display = "none";
    $("#thanks").style.display = "block";
  });

  // Reveal on scroll
  var els = document.querySelectorAll(".sec .h, .story div, .ev, .gal div, form");
  els.forEach(function (el) { el.classList.add("rv"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("show"); }); }
})();
