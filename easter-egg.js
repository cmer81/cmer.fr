// easter-egg.js
(function () {
  /* ─── DOM ─────────────────────────────────────────────── */
  var overlay = document.createElement('div');
  overlay.className = 'ee-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Terminal');

  overlay.innerHTML = [
    '<div class="ee-window">',
    '  <div class="ee-titlebar">',
    '    <span class="ee-titlebar-title">cmer@cmer.fr ~ $</span>',
    '    <button class="ee-close" aria-label="Fermer">&times;</button>',
    '  </div>',
    '  <div class="ee-output" id="ee-output"></div>',
    '  <div class="ee-input-wrap">',
    '    <span class="ee-prompt">❯</span>',
    '    <input class="ee-input" id="ee-input" type="text"',
    '           autocomplete="off" autocorrect="off"',
    '           autocapitalize="off" spellcheck="false"',
    '           placeholder="type a command..." />',
    '  </div>',
    '</div>'
  ].join('');

  document.body.appendChild(overlay);

  var output  = document.getElementById('ee-output');
  var input   = document.getElementById('ee-input');
  var closeBtn = overlay.querySelector('.ee-close');

  /* ─── Open / close ─────────────────────────────────────── */
  function open() {
    overlay.classList.add('ee-visible');
    input.focus();
    if (output.children.length === 0) {
      print('Welcome to cmer.fr terminal — type \'help\' to see available commands', 'info');
      print('');
    }
  }

  function close() {
    overlay.classList.remove('ee-visible');
    input.blur();
  }

  /* ─── Print helpers ────────────────────────────────────── */
  function print(text, type) {
    var line = document.createElement('span');
    line.className = 'ee-output-line' + (type ? ' ee-output-line--' + type : '');
    line.textContent = text;
    output.appendChild(line);
    output.appendChild(document.createElement('br'));
    output.scrollTop = output.scrollHeight;
  }

  function printLines(lines, type) {
    lines.forEach(function (l) { print(l, type); });
  }

  function printBlank() { print(''); }

  /* ─── Trigger: press '/' anywhere ─────────────────────── */
  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement || {}).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === '/') {
      e.preventDefault();
      open();
    }
    if (e.key === 'Escape') close();
  });

  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
})();
