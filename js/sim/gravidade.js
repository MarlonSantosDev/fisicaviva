Fisica.sims = Fisica.sims || {};

Fisica.sims.gravidade = (function () {
  var G = 6.67e-11;
  var m1 = 6;
  var m2 = 7;
  var dist = 4;

  function forceN() {
    var kg1 = m1 * 1e24;
    var kg2 = m2 * 1e22;
    var r = dist * 1e8;
    return G * kg1 * kg2 / (r * r);
  }

  function sci(n) {
    var exp = Math.floor(Math.log10(n));
    var man = n / Math.pow(10, exp);
    return { man: man, exp: exp };
  }

  return {
    start: function (ctx) {
      this.stop();
      m1 = 6;
      m2 = 7;
      dist = 4;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Terra e Lua se atraindo">' +
        '<rect width="720" height="260" fill="var(--space)"/>' +
        '<g fill="var(--cloud)"><circle cx="80" cy="40" r="1.5"/><circle cx="140" cy="70" r="1.2"/><circle cx="420" cy="28" r="1.3"/><circle cx="560" cy="60" r="1.6"/><circle cx="640" cy="30" r="1.2"/></g>' +
        '<circle id="gv-a" cy="150" r="58" fill="var(--sky-deep)"/>' +
        '<circle id="gv-b" cy="118" r="28" fill="var(--cloud)"/>' +
        '<g id="gv-arrows" stroke="var(--sun)" stroke-width="4" fill="var(--sun)"></g>' +
        "</svg>";
      ctx.formula.innerHTML = '<p class="static-eq" id="gv-eq"></p>';
      ctx.controls.innerHTML =
        '<label class="field"><span>Massa da esquerda</span><output id="gv-m1"></output><input id="gv-r1" type="range" min="1" max="10" step="1" value="6"></label>' +
        '<label class="field"><span>Massa da direita</span><output id="gv-m2"></output><input id="gv-r2" type="range" min="1" max="10" step="1" value="7"></label>' +
        '<label class="field"><span>Distância</span><output id="gv-d"></output><input id="gv-rd" type="range" min="2" max="10" step="1" value="4"></label>';

      function paint() {
        var gap = 180 + dist * 28;
        var x1 = 360 - gap / 2;
        var x2 = 360 + gap / 2;
        document.getElementById("gv-a").setAttribute("cx", String(x1));
        document.getElementById("gv-b").setAttribute("cx", String(x2));
        var F = forceN();
        var len = Math.max(28, Math.min(120, 24 + 22 * Math.log10(F / 1e18)));
        var mid = (x1 + 58 + x2 - 28) / 2;
        var leftTip = mid - 8;
        var rightTip = mid + 8;
        var leftTail = leftTip - len;
        var rightTail = rightTip + len;
        if (leftTail < x1 + 62) {
          var shift = x1 + 62 - leftTail;
          leftTail += shift;
          leftTip += shift;
          rightTail -= shift;
          rightTip -= shift;
        }
        document.getElementById("gv-arrows").innerHTML =
          '<path d="M' + leftTail.toFixed(0) + ' 132 H' + leftTip.toFixed(0) + '"/>' +
          '<polygon points="' + leftTip.toFixed(0) + ',124 ' + (leftTip + 14).toFixed(0) + ',132 ' + leftTip.toFixed(0) + ',140"/>' +
          '<path d="M' + rightTail.toFixed(0) + ' 156 H' + rightTip.toFixed(0) + '"/>' +
          '<polygon points="' + rightTip.toFixed(0) + ',148 ' + (rightTip - 14).toFixed(0) + ',156 ' + rightTip.toFixed(0) + ',164"/>';
        var s = sci(F);
        document.getElementById("gv-m1").textContent = Fisica.fmt(m1) + " × 10²⁴ kg";
        document.getElementById("gv-m2").textContent = Fisica.fmt(m2) + " × 10²² kg";
        document.getElementById("gv-d").textContent = Fisica.fmt(dist) + " × 10⁸ m";
        document.getElementById("gv-eq").innerHTML = "F = " + Fisica.fmt(s.man) + " × 10<sup>" + s.exp + "</sup> N";
        var dobro = " Se a distância dobrasse, a força cairia para um quarto, porque ela depende de r².";
        ctx.explain.textContent = "Efeito: as duas setas amarelas têm o mesmo tamanho. A Terra puxa a Lua com a mesma força com que a Lua puxa a Terra. Agora a força vale " + Fisica.fmt(s.man) + " × 10 elevado a " + s.exp + " newtons. Aumentar uma massa aumenta a força. Aumentar a distância diminui a força bem mais depressa." + dobro;
      }
      document.getElementById("gv-r1").addEventListener("input", function (e) {
        m1 = Fisica.readRange(e.target);
        paint();
      });
      document.getElementById("gv-r2").addEventListener("input", function (e) {
        m2 = Fisica.readRange(e.target);
        paint();
      });
      document.getElementById("gv-rd").addEventListener("input", function (e) {
        dist = Fisica.readRange(e.target);
        paint();
      });
      paint();
    },
    stop: function () {}
  };
})();
