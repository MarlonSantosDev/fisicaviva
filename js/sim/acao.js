Fisica.sims = Fisica.sims || {};

Fisica.sims.acao = (function () {
  var stopLoop = null;
  var mL = 40;
  var mR = 80;
  var force = 80;
  var xL = 250;
  var xR = 470;

  function explain() {
    var aL = force / mL;
    var aR = force / mR;
    var same = mL === mR;
    var base = "Efeito: as duas setas vermelhas têm o mesmo tamanho e sentidos opostos. O empurrão da esquerda age no boneco da direita, e a reação age no da esquerda. São " + Fisica.fmt(force) + " N em cada um.";
    if (same) {
      return base + " As massas são iguais (" + Fisica.fmt(mL) + " kg), então as acelerações também: " + Fisica.fmt(aL) + " m/s² para cada lado. Eles se afastam no mesmo ritmo.";
    }
    var leve = mL < mR ? "o da esquerda" : "o da direita";
    var aLeve = mL < mR ? aL : aR;
    return base + " As forças são iguais, mas as acelerações não. " + leve + " é mais leve e acelera mais (" + Fisica.fmt(aLeve) + " m/s²), por isso se afasta mais depressa.";
  }

  return {
    start: function (ctx) {
      this.stop();
      mL = 40;
      mR = 80;
      force = 80;
      xL = 250;
      xR = 470;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Dois bonecos se empurrando">' +
        '<rect width="720" height="260" fill="var(--sun)"/>' +
        '<rect y="198" width="720" height="62" fill="var(--wood)"/>' +
        '<g id="ac-l" transform="translate(250 0)">' + Fisica.person("var(--orange)") +
        '<path d="M24 150 H58" stroke="var(--force)" stroke-width="8" stroke-linecap="round"/>' +
        '<polygon points="58,142 78,150 58,158" fill="var(--force)"/></g>' +
        '<g id="ac-r" transform="translate(470 0) scale(-1 1)">' + Fisica.person("var(--accel)") +
        '<path d="M24 150 H58" stroke="var(--force)" stroke-width="8" stroke-linecap="round"/>' +
        '<polygon points="58,142 78,150 58,158" fill="var(--force)"/></g>' +
        "</svg>";
      ctx.formula.innerHTML = '<p class="static-eq" id="ac-eq"></p>';
      ctx.controls.innerHTML =
        '<label class="field"><span>Massa da esquerda</span><output id="ac-ml"></output><input id="ac-rL" type="range" min="20" max="100" step="10" value="40"></label>' +
        '<label class="field"><span>Massa da direita</span><output id="ac-mr"></output><input id="ac-rR" type="range" min="20" max="100" step="10" value="80"></label>' +
        '<label class="field"><span>Força do empurrão</span><output id="ac-ff"></output><input id="ac-rF" type="range" min="20" max="200" step="10" value="80"></label>' +
        '<div class="row"><button type="button" class="primary" id="ac-go">Empurrar</button></div>';

      function paint() {
        document.getElementById("ac-l").setAttribute("transform", "translate(" + xL.toFixed(1) + " 0)");
        document.getElementById("ac-r").setAttribute("transform", "translate(" + xR.toFixed(1) + " 0) scale(-1 1)");
        document.getElementById("ac-ml").textContent = Fisica.fmt(mL) + " kg";
        document.getElementById("ac-mr").textContent = Fisica.fmt(mR) + " kg";
        document.getElementById("ac-ff").textContent = Fisica.fmt(force) + " N";
        document.getElementById("ac-eq").textContent = "F = " + Fisica.fmt(force) + " N nos dois · a esquerda = " + Fisica.fmt(force / mL) + " m/s² · a direita = " + Fisica.fmt(force / mR) + " m/s²";
        ctx.explain.textContent = explain();
      }
      function reset() {
        if (stopLoop) stopLoop();
        stopLoop = null;
        xL = 250;
        xR = 470;
        paint();
      }
      document.getElementById("ac-rL").addEventListener("input", function (e) {
        mL = Fisica.readRange(e.target);
        reset();
      });
      document.getElementById("ac-rR").addEventListener("input", function (e) {
        mR = Fisica.readRange(e.target);
        reset();
      });
      document.getElementById("ac-rF").addEventListener("input", function (e) {
        force = Fisica.readRange(e.target);
        reset();
      });
      document.getElementById("ac-go").addEventListener("click", function () {
        if (stopLoop) stopLoop();
        xL = 250;
        xR = 470;
        var vL = 0;
        var vR = 0;
        var scale = 46;
        if (Fisica.reduced()) {
          xL = 160;
          xR = 560;
          paint();
          return;
        }
        stopLoop = Fisica.animate(function (dt) {
          vL += (force / mL) * scale * dt;
          vR += (force / mR) * scale * dt;
          xL -= vL * dt;
          xR += vR * dt;
          if (xL < 80) xL = 80;
          if (xR > 640) xR = 640;
          paint();
          if (xL <= 80 && xR >= 640) return false;
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
