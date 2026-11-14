(function () {
  var links = [].slice.call(document.querySelectorAll("a[data-lb]"));
  if (links.length) {
    var box = document.createElement("div");
    box.className = "lb";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button class="lb-x" type="button" aria-label="Закрыть">×</button><button class="lb-prev" type="button" aria-label="Предыдущая">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-next" type="button" aria-label="Следующая">›</button>';
    document.body.appendChild(box);
    var img = box.querySelector("img");
    var cap = box.querySelector("figcaption");
    var cur = 0;
    var show = function (n) {
      cur = (n + links.length) % links.length;
      img.src = links[cur].href;
      img.alt = cap.textContent = links[cur].getAttribute("data-lb");
      box.hidden = false;
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      box.hidden = true;
      document.body.style.overflow = "";
    };
    links.forEach(function (a, n) {
      a.addEventListener("click", function (e) { e.preventDefault(); show(n); });
    });
    box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("lb-x")) close(); });
    box.querySelector(".lb-prev").addEventListener("click", function () { show(cur - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(cur + 1); });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  // Цели Яндекс Метрики: «buy» — переход к покупке, «download» — скачивание бесплатного PDF, «bot» — открыли бота.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-goal]");
    if (a && window.ym && window.YM_ID) window.ym(window.YM_ID, "reachGoal", a.getAttribute("data-goal"), { item: a.getAttribute("data-item") || "" });
  });
})();
