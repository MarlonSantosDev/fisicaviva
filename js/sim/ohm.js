Fisica.sims = Fisica.sims || {};

Fisica.sims.ohm = (function () {
  var volts = 6;
  var ohms = 3;

  return {
    start: function (ctx) {
      this.stop();
      volts = 6;
      ohms = 3;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Circuito com pilha, resistor e lâmpada">' +
        '<rect width="720" height="260" fill="var(--card)"/>' +
        '<rect y="188" width="720" height="72" fill="var(--wood)"/>' +
        '<rect x="90" y="150" width="36" height="70" rx="4" fill="var(--ink)"/>' +
        '<rect x="96" y="138" width="24" height="16" rx="2" fill="var(--force)"/>' +
        '<path d="M108 138 V70 H300" fill="none" stroke="var(--ink)" stroke-width="4"/>' +
        '<path d="M108 220 H560 V192" fill="none" stroke="var(--ink)" stroke-width="4"/>' +
        '<path d="M300 70 h40 l14 16 16-28 16 28 16-28 16 28 14-16 h40" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M470 70 H560 V120" fill="none" stroke="var(--ink)" stroke-width="4"/>' +
        '<circle id="oh-glow" cx="560" cy="148" fill="var(--sun)"/>' +
        '<circle id="oh-bulb" cx="560" cy="148" r="26" fill="var(--sun)"/>' +
        '<rect x="548" y="176" width="24" height="16" rx="3" fill="var(--ink)"/>' +
        "</svg>";
      ctx.formula.innerHTML = '<p class="static-eq" id="oh-eq"></p>';
      ctx.controls.innerHTML =
        '<label class="field"><span>Tensão</span><output id="oh-v"></output><input id="oh-rv" type="range" min="1" max="12" step="1" value="6"></label>' +
        '<label class="field"><span>Resistência</span><output id="oh-r"></output><input id="oh-rr" type="range" min="1" max="20" step="1" value="3"></label>';

      function paint() {
        var i = volts / Math.max(ohms, 1);
        var bright = Math.min(1, i / 8);
        var glow = document.getElementById("oh-glow");
        glow.setAttribute("r", String(28 + bright * 36));
        glow.setAttribute("opacity", String(0.15 + bright * 0.75));
        document.getElementById("oh-bulb").setAttribute("opacity", String(0.45 + bright * 0.55));
        document.getElementById("oh-v").textContent = Fisica.fmt(volts) + " V";
        document.getElementById("oh-r").textContent = Fisica.fmt(ohms) + " Ω";
        document.getElementById("oh-eq").textContent = "I = " + Fisica.fmt(volts) + " ÷ " + Fisica.fmt(ohms) + " = " + Fisica.fmt(i) + " A";
        var luz = bright > 0.66 ? "forte" : bright >= 0.25 ? "médio" : "fraco";
        ctx.explain.textContent = "Efeito: a lâmpada está com brilho " + luz + " porque a corrente é " + Fisica.fmt(i) + " A. A pilha empurra as cargas com " + Fisica.fmt(volts) + " V e o resistor segura o fluxo com " + Fisica.fmt(ohms) + " Ω. I = V / R. Subir a tensão aumenta a corrente e a luz. Subir a resistência faz o contrário: passa menos corrente e a lâmpada apaga um pouco.";
      }
      document.getElementById("oh-rv").addEventListener("input", function (e) {
        volts = Fisica.readRange(e.target);
        paint();
      });
      document.getElementById("oh-rr").addEventListener("input", function (e) {
        ohms = Fisica.readRange(e.target);
        paint();
      });
      paint();
    },
    stop: function () {}
  };
})();
