Fisica.sims = Fisica.sims || {};

Fisica.sims.newton2 = (function () {
  var stopLoop = null;
  var obj = "pessoa";
  var force = 140;
  var dir = 1;
  var x = 180;
  var names = { pessoa: "a pessoa", caixa: "a caixa", bola: "a bola", carro: "o carro" };
  var mass = { pessoa: 70, caixa: 10, bola: 0.4, carro: 1000 };
  var massLabel = { pessoa: "70 kg", caixa: "10 kg", bola: "0,4 kg", carro: "1.000 kg" };

  function accel() {
    return force / mass[obj];
  }

  function explain() {
    var a = accel();
    var lado = dir > 0 ? "direita" : "esquerda";
    if (force === 0) {
      return "Efeito: as setas somem porque não há força nem aceleração. " + names[obj] + " não fica mais rápido nem mais devagar. Se estava parado, continua parado. Quando F = 0, a segunda lei dá a = 0, que é a primeira lei escrita em números.";
    }
    return "Efeito: a seta vermelha é a força e a azul é a aceleração. As duas apontam para a " + lado + " e crescem juntas. Ao empurrar, " + names[obj] + " sai devagar e vai ficando mais rápido — esse aumento de velocidade é a aceleração. Conta: a = " + Fisica.fmt(force) + " ÷ " + massLabel[obj].replace(" kg", "") + " = " + Fisica.fmt(a) + " m/s². A cada segundo, a velocidade sobe " + Fisica.fmt(a) + " m/s. A mesma força num corpo mais pesado produz menos aceleração.";
  }

  return {
    start: function (ctx) {
      this.stop();
      obj = "pessoa";
      force = 140;
      dir = 1;
      x = 180;
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Objeto empurrado sobre a grama">' +
        '<defs><linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--sky)"/><stop offset="1" stop-color="var(--cloud)"/></linearGradient></defs>' +
        '<rect width="720" height="260" fill="url(#skyN)"/>' +
        '<circle cx="630" cy="46" r="22" fill="var(--sun)"/>' +
        '<ellipse cx="150" cy="54" rx="36" ry="14" fill="var(--cloud)"/>' +
        '<ellipse cx="178" cy="50" rx="22" ry="12" fill="var(--cloud)"/>' +
        '<ellipse cx="250" cy="200" rx="210" ry="36" fill="var(--grass-dark)"/>' +
        '<rect y="198" width="720" height="62" fill="var(--grass)"/>' +
        '<rect x="600" y="150" width="10" height="50" rx="3" fill="var(--orange)"/>' +
        '<circle cx="605" cy="132" r="26" fill="var(--grass-dark)"/>' +
        '<g id="n2-actor">' +
        '<g id="n2-speed" opacity="0" fill="none" stroke="var(--cloud)" stroke-width="3" stroke-linecap="round"><path d="M-150 150h-28"/><path d="M-146 164h-20"/><path d="M-148 136h-24"/></g>' +
        '<g id="n2-force"><rect id="n2-fs" y="154" height="12" rx="6" fill="var(--force)"/><polygon id="n2-fh" fill="var(--force)"/><text id="n2-fl" y="166" font-size="22" fill="var(--ink)">F</text></g>' +
        '<g id="n2-accel"><rect id="n2-as" y="78" height="8" rx="4" fill="var(--accel)"/><polygon id="n2-ah" fill="var(--accel)"/><text id="n2-al" y="86" font-size="20" fill="var(--ink)">a</text></g>' +
        '<g id="n2-pessoa">' + Fisica.person("var(--orange)") + "</g>" +
        '<g id="n2-caixa" hidden><ellipse cx="0" cy="198" rx="34" ry="6" fill="var(--ink)" opacity="0.15"/><rect x="-32" y="132" width="64" height="64" rx="6" fill="var(--sun)"/><path d="M-32 132 L0 152 L32 132" fill="none" stroke="var(--card)" stroke-width="3"/><path d="M0 152 V196" stroke="var(--card)" stroke-width="3"/></g>' +
        '<g id="n2-bola" hidden><ellipse cx="0" cy="192" rx="18" ry="5" fill="var(--ink)" opacity="0.15"/><circle cy="170" r="22" fill="var(--cloud)" stroke="var(--force)" stroke-width="3"/><path d="M-18 162 Q0 176 18 158" fill="none" stroke="var(--force)" stroke-width="3"/><path d="M-16 178 Q0 166 16 184" fill="none" stroke="var(--force)" stroke-width="3"/></g>' +
        '<g id="n2-carro" hidden><ellipse cy="198" rx="70" ry="6" fill="var(--ink)" opacity="0.15"/>' +
        '<g transform="translate(-40 182)"><g id="n2-wl"><circle r="16" fill="var(--hair)"/><circle r="7" fill="var(--card)"/><path d="M0-12v24M-12 0h24" stroke="var(--card)" stroke-width="2"/></g></g>' +
        '<g transform="translate(42 182)"><g id="n2-wr"><circle r="16" fill="var(--hair)"/><circle r="7" fill="var(--card)"/><path d="M0-12v24M-12 0h24" stroke="var(--card)" stroke-width="2"/></g></g>' +
        '<path d="M-70 182 h130 q16 0 16-16 v-10 q0-20-28-24 l-30-10 h-70 q-18 0-22 16 z" fill="var(--accel)"/>' +
        '<path d="M-20 136 h40 q10 0 16 12 h-70 z" fill="var(--sky)"/>' +
        "</g></g></svg>";
      ctx.formula.innerHTML =
        '<span class="pill force"><i>F</i> <b id="n2-fv"></b></span>' +
        '<span class="op">÷</span>' +
        '<span class="pill"><i>m</i> <b id="n2-mv"></b></span>' +
        '<span class="op">=</span>' +
        '<span class="pill accel"><i>a</i> <b id="n2-av"></b></span>';
      ctx.controls.innerHTML =
        '<div class="row" role="group" aria-label="Objeto">' +
        '<button type="button" class="choice" data-obj="pessoa">Pessoa · 70 kg</button>' +
        '<button type="button" class="choice" data-obj="caixa">Caixa · 10 kg</button>' +
        '<button type="button" class="choice" data-obj="bola">Bola · 0,4 kg</button>' +
        '<button type="button" class="choice" data-obj="carro">Carro · 1.000 kg</button>' +
        "</div>" +
        '<label class="field"><span>Força</span><output id="n2-out"></output><input id="n2-range" type="range" min="0" max="400" step="10" value="140"></label>' +
        '<div class="row">' +
        '<button type="button" class="primary" id="n2-go">Empurrar</button>' +
        '<div class="row" role="group" aria-label="Direção da força">' +
        '<button type="button" class="choice" id="n2-left">Esquerda</button>' +
        '<button type="button" class="choice" id="n2-right">Direita</button>' +
        "</div></div>";

      var actor = document.getElementById("n2-actor");
      var speed = document.getElementById("n2-speed");

      function place(px) {
        x = px;
        actor.setAttribute("transform", "translate(" + px + " 0)");
        document.getElementById("n2-pessoa").setAttribute("transform", "scale(" + dir + " 1)");
        document.getElementById("n2-caixa").setAttribute("transform", "scale(" + dir + " 1)");
        document.getElementById("n2-bola").setAttribute("transform", "scale(" + dir + " 1)");
        document.getElementById("n2-carro").setAttribute("transform", "scale(" + dir + " 1)");
        speed.setAttribute("transform", "scale(" + dir + " 1)");
        var ang = (px - 180) * dir * 0.9;
        document.getElementById("n2-wl").setAttribute("transform", "rotate(" + ang + ")");
        document.getElementById("n2-wr").setAttribute("transform", "rotate(" + ang + ")");
      }

      function layout() {
        var a = accel();
        var flen = force === 0 ? 0 : 40 + (force / 400) * 110;
        var alen = a < 0.05 ? 0 : Math.min(120, 28 + Math.sqrt(a) * 18);
        var fg = document.getElementById("n2-force");
        var ag = document.getElementById("n2-accel");
        if (flen === 0) fg.setAttribute("hidden", "");
        else fg.removeAttribute("hidden");
        if (alen === 0) ag.setAttribute("hidden", "");
        else ag.removeAttribute("hidden");
        var sign = dir;
        var head = -sign * 32;
        var tail = head - sign * flen;
        var shaftX = Math.min(head, tail);
        document.getElementById("n2-fs").setAttribute("x", String(shaftX));
        document.getElementById("n2-fs").setAttribute("width", String(Math.max(Math.abs(head - tail) - 8, 0)));
        var hx = head;
        document.getElementById("n2-fh").setAttribute("points", (hx - sign * 22) + ",146 " + hx + ",160 " + (hx - sign * 22) + ",174");
        var lx = head - sign * (flen + 18);
        var fl = document.getElementById("n2-fl");
        fl.setAttribute("x", String(lx));
        fl.removeAttribute("transform");
        var ahead = -sign * 12;
        var atail = ahead - sign * alen;
        document.getElementById("n2-as").setAttribute("x", String(Math.min(ahead, atail)));
        document.getElementById("n2-as").setAttribute("width", String(Math.max(Math.abs(ahead - atail) - 6, 0)));
        document.getElementById("n2-ah").setAttribute("points", (ahead - sign * 18) + ",74 " + ahead + ",82 " + (ahead - sign * 18) + ",90");
        var al = document.getElementById("n2-al");
        al.setAttribute("x", String(ahead - sign * (alen + 16)));
        al.removeAttribute("transform");
        document.getElementById("n2-fv").textContent = Fisica.fmt(force) + " N";
        document.getElementById("n2-mv").textContent = massLabel[obj];
        document.getElementById("n2-av").textContent = Fisica.fmt(a) + " m/s²";
        document.getElementById("n2-out").textContent = Fisica.fmt(force) + " N";
        ctx.explain.textContent = explain();
        ["pessoa", "caixa", "bola", "carro"].forEach(function (key) {
          var g = document.getElementById("n2-" + key);
          var b = ctx.controls.querySelector('[data-obj="' + key + '"]');
          if (key === obj) g.removeAttribute("hidden");
          else g.setAttribute("hidden", "");
          b.setAttribute("aria-pressed", key === obj ? "true" : "false");
        });
        document.getElementById("n2-right").setAttribute("aria-pressed", dir > 0 ? "true" : "false");
        document.getElementById("n2-left").setAttribute("aria-pressed", dir < 0 ? "true" : "false");
      }

      ctx.controls.querySelectorAll("[data-obj]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (stopLoop) stopLoop();
          speed.setAttribute("opacity", "0");
          var next = btn.getAttribute("data-obj");
          if (!mass[next]) return;
          obj = next;
          place(dir > 0 ? 180 : 540);
          layout();
        });
      });
      document.getElementById("n2-range").addEventListener("input", function (e) {
        force = Fisica.readRange(e.target);
        layout();
      });
      document.getElementById("n2-right").addEventListener("click", function () {
        if (stopLoop) stopLoop();
        speed.setAttribute("opacity", "0");
        dir = 1;
        place(180);
        layout();
      });
      document.getElementById("n2-left").addEventListener("click", function () {
        if (stopLoop) stopLoop();
        speed.setAttribute("opacity", "0");
        dir = -1;
        place(540);
        layout();
      });
      document.getElementById("n2-go").addEventListener("click", function () {
        if (stopLoop) stopLoop();
        var a = accel();
        var travel = Math.min(300, 28 + Math.sqrt(a) * 70);
        var from = dir > 0 ? 180 : 540;
        var to = from + dir * travel;
        place(from);
        if (force === 0 || Fisica.reduced()) {
          place(force === 0 ? from : to);
          speed.setAttribute("opacity", "0");
          return;
        }
        speed.setAttribute("opacity", "0.9");
        var t0 = 0;
        var duration = Math.max(0.65, 2.1 - Math.min(a, 40) * 0.036);
        stopLoop = Fisica.animate(function (dt, now) {
          if (!t0) t0 = now;
          var u = Math.min(1, (now - t0) / (duration * 1000));
          var e = u * u;
          place(from + (to - from) * e);
          if (u >= 1) {
            speed.setAttribute("opacity", "0");
            return false;
          }
        });
      });
      place(180);
      layout();
    },
    stop: function () {
      if (stopLoop) stopLoop();
      stopLoop = null;
    }
  };
})();
