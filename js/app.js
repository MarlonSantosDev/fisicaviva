(function () {
  var current = null;
  var buttons = {};
  var ctx = {
    stage: document.getElementById("stage"),
    formula: document.getElementById("formula"),
    controls: document.getElementById("controls"),
    explain: document.getElementById("explain-text"),
    simplify: document.getElementById("simplify")
  };

  var nav = document.getElementById("topics");
  Fisica.topics.forEach(function (topic) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "topic";
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = topic.icon + "<span>" + topic.label + "</span>";
    btn.addEventListener("click", function () {
      open(topic.id, true);
    });
    nav.appendChild(btn);
    buttons[topic.id] = btn;
  });

  function find(id) {
    var i;
    for (i = 0; i < Fisica.topics.length; i += 1) {
      if (Fisica.topics[i].id === id) return Fisica.topics[i];
    }
    return Fisica.topics[1];
  }

  function open(id, pushHash) {
    var topic = find(id);
    if (!Fisica.sims[topic.id]) return;
    if (current && Fisica.sims[current]) Fisica.sims[current].stop();
    current = topic.id;
    Object.keys(buttons).forEach(function (key) {
      buttons[key].setAttribute("aria-pressed", key === topic.id ? "true" : "false");
    });
    document.getElementById("kicker").textContent = topic.kicker;
    document.title = topic.kicker + " · Física viva";
    ["og:title", "twitter:title"].forEach(function (name) {
      var meta = document.querySelector(name.indexOf("og:") === 0
        ? 'meta[property="' + name + '"]'
        : 'meta[name="' + name + '"]');
      if (meta) meta.setAttribute("content", document.title);
    });
    document.querySelectorAll(".topics-index [data-topic]").forEach(function (item) {
      var link = item.querySelector("a");
      if (!link) return;
      if (item.getAttribute("data-topic") === topic.id) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    ctx.stage.innerHTML = "";
    ctx.formula.innerHTML = "";
    ctx.controls.innerHTML = "";
    ctx.explain.textContent = "";
    Fisica.sims[topic.id].start(ctx);
    ctx.simplify.textContent = topic.simplify;
    if (pushHash && location.hash !== "#" + topic.id) {
      history.replaceState(null, "", "#" + topic.id);
    }
  }

  window.addEventListener("hashchange", function () {
    var id = location.hash.replace("#", "");
    if (id && id !== current) open(id, false);
  });

  var initial = location.hash.replace("#", "");
  if (!find(initial) || !Fisica.sims[initial]) initial = "newton2";
  open(initial, false);
})();
