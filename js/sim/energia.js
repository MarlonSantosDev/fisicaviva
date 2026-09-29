Fisica.sims = Fisica.sims || {};

Fisica.sims.energia = (function () {
  var stopLoop = null;
  var u = 1;
  var m = 2;
  var g = 10;
  var H = 2;

  function energies() {
    var h = u * H;
    var ep = m * g * h;
    var total = m * g * H;
    return { h: h, ep: ep, ec: total - ep, total: total };
  }

  return {
    start: function (ctx) {
      this.stop();
      u = 1;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Bloco descendo uma rampa">' +
        '<rect width="720" height="260" fill="var(--sky)"/>' +
        '<polygon points="80,210 460,210 460,70" fill="var(--grass)"/>' +
        '<rect y="208" width="720" height="52" fill="var(--wood)"/>' +
        '<g id="en-block"><rect x="-22" y="-22" width="44" height="44" rx="4" fill="var(--orange)"/></g>' +
        '<text x="554" y="62" text-anchor="middle" font-size="14" fill="var(--ink)">Ep</text>' +
        '<rect x="540" y="70" width="28" height="120" rx="8" fill="var(--card)"/>' +
        '<rect id="en-ep" x="544" width="20" rx="4" fill="var(--orange)"/>' +
        '<text x="614" y="62" text-anchor="middle" font-size="14" fill="var(--ink)">Ec</text>' +
        '<rect x="600" y="70" width="28" height="120" rx="8" fill="var(--card)"/>' +
        '<rect id="en-ec" x="604" width="20" rx="4" fill="var(--accel)"/>' +
        "</svg>";
      ctx.formula.innerHTML = '<p class="static-eq" id="en-eq"></p>';
      ctx.controls.innerHTML =
        '<label class="field"><span>Altura na rampa</span><output id="en-out"></output><input id="en-range" type="range" min="0" max="100" step="1" value="100"></label>' +
        '<div class="row"><button type="button" class="primary" id="en-go">Descer</button></div>';

      function paint() {
        var e = energies();
        var run = 380;
        var rise = -140;
        var len = Math.sqrt(run * run + rise * rise);
        var px = 80 + u * run + (rise / len) * 22;
        var py = 210 + u * rise + (-run / len) * 22;
        document.getElementById("en-block").setAttribute("transform", "translate(" + px.toFixed(1) + " " + py.toFixed(1) + ") rotate(20)");
        var hEp = (e.ep / e.total) * 104;
        var hEc = (e.ec / e.total) * 104;
        var ep = document.getElementById("en-ep");
        var ec = document.getElementById("en-ec");
        ep.setAttribute("y", String(78 + (104 - hEp)));
        ep.setAttribute("height", String(Math.max(hEp, 0)));
        ec.setAttribute("y", String(78 + (104 - hEc)));
        ec.setAttribute("height", String(Math.max(hEc, 0)));
        document.getElementById("en-out").textContent = Fisica.fmt(e.h) + " m";
        document.getElementById("en-eq").textContent = "Ep " + Fisica.fmt(e.ep) + " J + Ec " + Fisica.fmt(e.ec) + " J = " + Fisica.fmt(e.total) + " J";
        document.getElementById("en-range").value = String(Math.round(u * 100));
        var onde = u > 0.85 ? "no alto" : u < 0.15 ? "embaixo" : "no meio da rampa";
        ctx.explain.textContent = "Efeito: a barra laranja é a energia potencial e a azul é a cinética. O bloco está " + onde + ", a " + Fisica.fmt(e.h) + " m do chão. Potencial: m·g·h = " + Fisica.fmt(e.ep) + " J. Cinética: " + Fisica.fmt(e.ec) + " J. A soma permanece " + Fisica.fmt(e.total) + " J. O que uma perde, a outra ganha, porque a rampa não tira energia.";
      }
      document.getElementById("en-range").addEventListener("input", function (e) {
        if (stopLoop) stopLoop();
        stopLoop = null;
        u = Fisica.readRange(e.target) / 100;
        paint();
      });
      document.getElementById("en-go").addEventListener("click", function () {
        if (stopLoop) stopLoop();
        u = 1;
        if (Fisica.reduced()) {
          u = 0;
          paint();
          return;
        }
        var t0 = 0;
        stopLoop = Fisica.animate(function (dt, now) {
          if (!t0) t0 = now;
          var p = Math.min(1, (now - t0) / 2500);
          u = 1 - p * p;
          paint();
          if (p >= 1) return false;
        });
      });
      paint();
    },
    stop: function () {
      if (stopLoop) stopLoop();
      stopLoop = null;
    }
  };
})();
