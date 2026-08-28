/**
 * 音乐播放器 — 从原 Next.js MusicPlayerClient.tsx 移植（无 React / 无构建）。
 * 音轨列表来自 public/audio/ 目录（这里为静态快照）。
 */
(function () {
  'use strict';

  var TRACKS = ['track01.mp3'];

  var state = {
    current: 0,
    playing: false,
    randomized: false,
  };

  var audioEl = null;
  var trackInfoEl = null;
  var autoplayHintEl = null;
  var playPauseBtn = null;
  var btnIconEl = null;

  function currentTrack() {
    return TRACKS.length > 0 ? TRACKS[state.current] : undefined;
  }

  function init() {
    audioEl = document.getElementById('bg-audio');
    trackInfoEl = document.getElementById('track-info');
    autoplayHintEl = document.getElementById('autoplay-hint');
    playPauseBtn = document.getElementById('play-pause-btn');
    if (audioEl && playPauseBtn) {
      btnIconEl = playPauseBtn.querySelector('.btn-icon');
    }

    if (TRACKS.length === 0) {
      if (trackInfoEl) {
        trackInfoEl.textContent = '♫ 暂无音频文件';
      }
      return;
    }

    // 加载时随机选一首起始曲目（仅 1 首时无差别，保留原行为）。
    if (!state.randomized) {
      state.current = Math.floor(Math.random() * TRACKS.length);
      state.randomized = true;
    }

    // 尝试自动播放（浏览器可能拦截带声音的自动播放）。
    if (audioEl) {
      audioEl.addEventListener('play', function () {
        state.playing = true;
        if (playPauseBtn) {
          playPauseBtn.title = '暂停';
        }
        if (btnIconEl) {
          btnIconEl.textContent = '❚❚';
        }
        hideAutoplayHint();
      });
      audioEl.addEventListener('pause', function () {
        state.playing = false;
        if (playPauseBtn) {
          playPauseBtn.title = '播放';
        }
        if (btnIconEl) {
          btnIconEl.textContent = '▶';
        }
      });
      audioEl.addEventListener('ended', function () {
        next();
      });

      var promise = audioEl.play();
      if (promise !== undefined) {
        promise.then(function () {
          state.playing = true;
          hideAutoplayHint();
        }).catch(function () {
          // 自动播放被浏览器拦截，显示手动播放按钮。
          state.playing = false;
          showAutoplayHint();
        });
      }
    }
  }

  function play() {
    if (!audioEl) {
      return;
    }
    audioEl.play();
    state.playing = true;
    hideAutoplayHint();
  }

  function pause() {
    if (!audioEl) {
      return;
    }
    audioEl.pause();
    state.playing = false;
  }

  function togglePlay() {
    if (state.playing) {
      pause();
    } else {
      play();
    }
  }

  function next() {
    if (TRACKS.length === 0) {
      return;
    }
    state.current = (state.current + 1) % TRACKS.length;
    applyTrack();
  }

  function prev() {
    if (TRACKS.length === 0) {
      return;
    }
    state.current = (state.current - 1 + TRACKS.length) % TRACKS.length;
    applyTrack();
  }

  function applyTrack() {
    if (!audioEl) {
      return;
    }
    var track = currentTrack();
    audioEl.src = 'audio/' + encodeURIComponent(track);
    audioEl.load();
    if (trackInfoEl) {
      trackInfoEl.textContent = '♫ ' + track.replace(/\.(mp3|wav|ogg|m4a|aac)$/i, '');
    }
    audioEl.play().catch(function () {
      showAutoplayHint();
    });
  }

  function showAutoplayHint() {
    if (autoplayHintEl) {
      autoplayHintEl.style.display = '';
    }
  }

  function hideAutoplayHint() {
    if (autoplayHintEl) {
      autoplayHintEl.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    init();

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', togglePlay);
    }
    var prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', prev);
    }
    var nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', next);
    }
  });
})();
