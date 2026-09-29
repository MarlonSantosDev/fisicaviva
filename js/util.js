var Fisica = window.Fisica || {};

Fisica.fmt = function (n) {
  var r = Math.round(n * 100) / 100;
  var neg = r < 0;
  var abs = Math.abs(r);
  var s;
  if (Math.abs(abs - Math.round(abs)) < 0.001) s = String(Math.round(abs));
  else s = abs.toFixed(2).replace(".", ",");
  s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return neg ? "\u2212" + s : s;
};

Fisica.reduced = function () {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

Fisica.readRange = function (input) {
  var min = Number(input.min);
  var max = Number(input.max);
  var step = Number(input.step);
  if (!isFinite(step) || step <= 0) step = 1;
  var n = Number(input.value);
  if (!isFinite(min)) min = 0;
  if (!isFinite(max)) max = min;
  if (!isFinite(n)) n = min;
  if (n < min) n = min;
  if (n > max) n = max;
  var steps = Math.round((n - min) / step);
  n = min + steps * step;
  if (n < min) n = min;
  if (n > max) n = max;
  var places = 0;
  var text = String(step);
  if (text.indexOf(".") >= 0) places = text.length - text.indexOf(".") - 1;
  n = Number(n.toFixed(places));
  input.value = String(n);
  return n;
};

Fisica.animate = function (fn) {
  var id = 0;
  var last = 0;
  var alive = true;
  function tick(t) {
    if (!alive) return;
    if (!last) last = t;
    var dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    if (fn(dt, t) === false) return;
    id = requestAnimationFrame(tick);
  }
  id = requestAnimationFrame(tick);
  return function stop() {
    alive = false;
    cancelAnimationFrame(id);
  };
};

Fisica.person = function (fill) {
  return (
    '<ellipse cx="2" cy="196" rx="20" ry="4" fill="var(--ink)" opacity="0.18"/>' +
    '<path d="M-4 162 L-10 190" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M12 162 L18 190" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M-16 190 H-6" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M14 190 H24" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M-12 142 Q-26 152 -18 164" fill="none" stroke="var(--skin)" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M16 140 Q30 148 26 160" fill="none" stroke="var(--skin)" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="-14" y="128" width="32" height="38" rx="12" fill="' + fill + '"/>' +
    '<circle cx="4" cy="110" r="16" fill="var(--skin)"/>' +
    '<path d="M-8 106 Q4 86 18 104 Q10 94 4 96 Q-2 94 -8 106 Z" fill="var(--hair)"/>' +
    '<circle cx="8" cy="110" r="1.7" fill="var(--ink)"/>' +
    '<circle cx="14" cy="110" r="1.5" fill="var(--ink)"/>' +
    '<path d="M8 116 Q12 120 16 116" fill="none" stroke="var(--ink)" stroke-width="1.3" stroke-linecap="round"/>'
  );
};
