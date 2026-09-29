Fisica.sims = Fisica.sims || {};

Fisica.sims.onda = (function () {
  var stopLoop = null;
  var amp = 36;
  var waves = 2;
  var phase = 0;

  function path(ph) {
    var d = "";
    var x0 = 156;
    var x1 = 680;
    var mid = 150;
    var k = (waves * Math.PI * 2) / (x1 - x0);
    var x;
    for (x = x0; x <= x1; x += 8) {
      var y = mid + amp * Math.sin(k * (x - x0) - ph);
      d += (x === x0 ? "M" : "L") + x + " " + y.toFixed(1) + " ";
    }
    return d;
  }

  return {
    start: function (ctx) {
      this.stop();
      amp = 36;
      waves = 2;
      phase = 0;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Corda formando uma onda">' +
        '<rect width="720" height="260" fill="var(--sky)"/>' +
        '<rect y="210" width="720" height="50" fill="var(--wood)"/>' +
        '<g id="on-hand" transform="translate(64 18)">' + Fisica.person("var(--accel)") + "</g>" +
        '<path id="on-arm" fill="none" stroke="var(--skin)" stroke-width="6" stroke-linecap="round"/>' +
        '<path id="on-rope" fill="none" stroke="var(--orange)" stroke-width="6" stroke-linecap="round"/>' +
        "</svg>";
      ctx.formula.innerHTML = '<p class="static-eq">v = λ · f</p>';
      ctx.controls.innerHTML =
        '<label class="field"><span>Amplitude</span><output id="on-a"></output><input id="on-ra" type="range" min="12" max="60" step="2" value="36"></label>' +
        '<label class="field"><span>Ondas na corda</span><output id="on-f"></output><input id="on-rf" type="range" min="1" max="4" step="1" value="2"></label>';

      function paint() {
        var d = path(phase);
        document.getElementById("on-rope").setAttribute("d", d);
        var yHand = 150 + amp * Math.sin(-phase);
        document.getElementById("on-arm").setAttribute("d", "M90 158 Q124 " + yHand.toFixed(1) + " 156 " + yHand.toFixed(1));
        document.getElementById("on-a").textContent = Fisica.fmt(amp);
        document.getElementById("on-f").textContent = String(waves);
        ctx.explain.textContent = "Efeito: a mão sobe e desce e a corda copia esse movimento mais adiante. A amplitude é " + Fisica.fmt(amp) + ": é quanto cada ponto sobe acima do meio. Na corda cabem " + waves + (waves === 1 ? " onda. " : " ondas. ") + "Cada pedaço da corda só vai para cima e para baixo. Quem anda para a direita é o formato, a crista. Mais ondas na mesma corda significam comprimento menor; a velocidade da onda é comprimento vezes frequência.";
      }
      document.getElementById("on-ra").addEventListener("input", function (e) {
        amp = Fisica.readRange(e.target);
        paint();
      });
      document.getElementById("on-rf").addEventListener("input", function (e) {
        waves = Fisica.readRange(e.target);
        paint();
      });
      paint();
      if (!Fisica.reduced()) {
        stopLoop = Fisica.animate(function (dt) {
          phase += dt * 2.4;
          paint();
        });
      }
    },
    stop: function () {
      if (stopLoop) stopLoop();
      stopLoop = null;
    }
  };
})();
