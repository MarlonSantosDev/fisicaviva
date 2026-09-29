Fisica.sims = Fisica.sims || {};

Fisica.sims.inercia = (function () {
  var stopLoop = null;
  var x = 90;
  var v = 0;
  var friction = false;

  function text() {
    if (!friction) {
      return "Efeito: o disco atravessa o gelo sem mudar de velocidade. Não há seta de força porque a resultante é zero. Inércia é isso: parado continua parado, e em movimento segue reto com a mesma velocidade.";
    }
    if (v <= 0 && x > 90) {
      return "Efeito: o disco foi perdendo velocidade até parar. A força do atrito aponta contra o movimento, por isso a velocidade cai. A primeira lei continua valendo: quem mudou o movimento foi uma força, não a ausência dela.";
    }
    return "Efeito: com o atrito ligado, o disco desacelera. O gelo deixa de ser livre e surge uma força contra o movimento. Sem essa força, ele seguiria em linha reta.";
  }

  return {
    start: function (ctx) {
      this.stop();
      x = 90;
      v = 0;
      friction = false;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Disco deslizando no gelo">' +
        '<rect width="720" height="260" fill="var(--sky)"/>' +
        '<ellipse cx="140" cy="48" rx="40" ry="16" fill="var(--cloud)"/>' +
        '<ellipse cx="170" cy="44" rx="24" ry="12" fill="var(--cloud)"/>' +
        '<path d="M0 150 Q180 118 360 148 T720 136 V260 H0 Z" fill="var(--ice)"/>' +
        '<path d="M40 198 H680" stroke="var(--sky-deep)" stroke-width="3" stroke-dasharray="10 12" stroke-linecap="round"/>' +
        '<g id="puck" transform="translate(90 0)">' +
        '<ellipse cx="0" cy="28" rx="34" ry="8" fill="var(--sky-deep)" opacity="0.45"/>' +
        '<ellipse cx="0" cy="0" rx="36" ry="16" fill="var(--hair)"/>' +
        '<ellipse cx="-8" cy="-4" rx="14" ry="6" fill="var(--muted)" opacity="0.55"/>' +
        "</g></svg>";
      ctx.formula.innerHTML = '<p class="static-eq">ΣF = 0 → a velocidade fica constante</p>';
      ctx.controls.innerHTML =
        '<div class="row">' +
        '<button type="button" class="primary" id="in-go">Soltar o disco</button>' +
        '<label class="switch"><input type="checkbox" id="in-friction"> Com atrito</label>' +
        "</div>";
      var puck = document.getElementById("puck");
      function paint() {
        puck.setAttribute("transform", "translate(" + x.toFixed(1) + " 168)");
        ctx.explain.textContent = text();
      }
      document.getElementById("in-friction").addEventListener("change", function (e) {
        friction = e.target.checked;
        ctx.formula.innerHTML = friction
          ? '<p class="static-eq">Atrito → a velocidade diminui até zero</p>'
          : '<p class="static-eq">ΣF = 0 → a velocidade fica constante</p>';
        paint();
      });
      document.getElementById("in-go").addEventListener("click", function () {
        if (stopLoop) stopLoop();
        x = 90;
        v = friction ? 240 : 180;
        if (Fisica.reduced()) {
          x = friction ? 280 : 620;
          v = friction ? 0 : 180;
          paint();
          return;
        }
        stopLoop = Fisica.animate(function (dt) {
          var a = friction ? -160 : 0;
          v += a * dt;
          if (v < 0) v = 0;
          x += v * dt;
          if (x > 620) {
            if (!friction) x = 80;
            else {
              x = 620;
              v = 0;
              paint();
              return false;
            }
          }
          if (friction && v === 0) {
            paint();
            return false;
          }
          paint();
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
