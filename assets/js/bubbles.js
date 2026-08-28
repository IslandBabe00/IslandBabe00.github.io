/**
 * 上升泡泡 — 从原 Next.js BubbleRising.tsx 移植（无 React / 无构建）。
 * 固定 20 个上限，600ms 生成 1 个，初始快速补足 5 个。
 */
(function () {
  'use strict';

  var MAX_BUBBLES = 20;

  var PALETTE = [
    ['#00D2FF', '#3AFAFA', '#FFFFFF'],
    ['#FFE600', '#FFB300', '#FFF7CC'],
    ['#FF5E97', '#FF2E7E', '#FFD1E0'],
    ['#7CFF00', '#39D700', '#E6FFCC'],
    ['#B388FF', '#7C4DFF', '#EDE7FF'],
    ['#FF9A00', '#FF6F00', '#FFE0B2'],
  ];

  var nextId = 0;

  function createBubble() {
    return {
      id: nextId++,
      left: (5 + Math.random() * 90) + '%',
      size: 28 + Math.random() * 34,
      duration: 9000 + Math.random() * 7000,
      delay: 0,
      drift: (Math.random() * 2 - 1) * 40,
      colors: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    };
  }

  function spawnBubble(container) {
    if (container.childElementCount >= MAX_BUBBLES) {
      return;
    }
    var b = createBubble();
    var el = document.createElement('span');
    el.className = 'bubble';
    el.style.left = b.left;
    el.style.width = b.size + 'px';
    el.style.height = b.size + 'px';
    el.style.animationDuration = b.duration + 'ms';
    el.style.animationDelay = b.delay + 'ms';
    el.style.setProperty('--drift', b.drift + 'px');
    el.style.background = 'radial-gradient(circle at 30% 30%, ' +
      b.colors[2] + ', ' + b.colors[0] + ' 55%, ' + b.colors[1] + ' 100%)';
    el.addEventListener('animationend', function () {
      el.remove();
    });
    container.appendChild(el);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('bubbles');
    if (!container) {
      return;
    }

    for (var i = 0; i < 5; i++) {
      spawnBubble(container);
    }
    setInterval(function () {
      spawnBubble(container);
    }, 600);
  });
})();
