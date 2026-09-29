Fisica.sims = Fisica.sims || {};

Fisica.sims.queda = (function () {
  var stopLoop = null;
  var drag = false;
  var bottomA = 70;
  var bottomB = 70;

  function explain() {
    if (!drag) {
      return "Efeito: a maçã e a bola descem lado a lado, com a mesma aceleração. Perto da Terra, sem ar, a queda não depende da massa. As duas ganham cerca de 10 m/s de velocidade a cada segundo.";
    }
    return "Efeito: com o ar ligado, a maçã atrasa e a bola pesada segue na frente. O arrasto empurra para cima. Ele pesa mais, em comparação, no objeto leve, que chega perto de uma velocidade limite. A bola quase não sente o ar.";
  }

  return {
    start: function (ctx) {
      this.stop();
      drag = false;
      bottomA = 70;
      bottomB = 70;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Maçã e bola em queda">' +
        '<rect width="720" height="260" fill="var(--sky)"/>' +
        '<rect y="210" width="720" height="50" fill="var(--grass)"/>' +
        '<g id="qd-a"><circle r="16" fill="var(--force)"/><ellipse cx="3" cy="-15" rx="5" ry="2.4" fill="var(--grass-dark)" transform="rotate(-25 3 -15)"/><path d="M2 -14 q3 -8 0 -12" fill="none" stroke="var(--grass-dark)" stroke-width="2" stroke-linecap="round"/></g>' +
        '<g id="qd-b"><circle r="26" fill="var(--hair)"/><circle cx="-8" cy="-4" r="3.2" fill="var(--muted)"/><circle cx="7" cy="3" r="3" fill="var(--muted)"/><circle cx="-1" cy="11" r="2.4" fill="var(--muted)"/></g>' +
        "</svg>";
      ctx.formula.innerHTML = '<p class="static-eq" id="qd-eq">Sem ar: as duas caem com g = 10 m/s²</p>';
      ctx.controls.innerHTML =
        '<div class="row">' +
        '<button type="button" class="primary" id="qd-go">Soltar</button>' +
        '<label class="switch"><input type="checkbox" id="qd-drag"> Com arrasto do ar</label>' +
        "</div>";
      function paint() {
        document.getElementById("qd-a").setAttribute("transform", "translate(250 " + (bottomA - 16).toFixed(1) + ")");
        document.getElementById("qd-b").setAttribute("transform", "translate(470 " + (bottomB - 26).toFixed(1) + ")");
        ctx.explain.textContent = explain();
      }
      function resetPos() {
        if (stopLoop) stopLoop();
        stopLoop = null;
        bottomA = 70;
        bottomB = 70;
        paint();
      }
      document.getElementById("qd-drag").addEventListener("change", function (e) {
        drag = e.target.checked;
        document.getElementById("qd-eq").textContent = drag
          ? "Com ar: o objeto leve chega numa velocidade limite"
          : "Sem ar: as duas caem com g = 10 m/s²";
        resetPos();
      });
      document.getElementById("qd-go").addEventListener("click", function () {
        if (stopLoop) stopLoop();
        bottomA = 70;
        bottomB = 70;
        var vA = 0;
        var vB = 0;
        var g = 280;
        var ground = 208;
        if (Fisica.reduced()) {
          bottomA = drag ? 150 : ground;
          bottomB = ground;
          paint();
          return;
        }
        stopLoop = Fisica.animate(function (dt) {
          var aA = g;
          var aB = g;
          if (drag) {
            aA = g * (1 - vA / 95);
            aB = g * (1 - vB / 420);
          }
          vA += aA * dt;
          vB += aB * dt;
          bottomA = Math.min(ground, bottomA + vA * dt);
          bottomB = Math.min(ground, bottomB + vB * dt);
          paint();
          if (bottomA >= ground && bottomB >= ground) return false;
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
