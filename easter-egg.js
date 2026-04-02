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

  /* ─── Command history ──────────────────────────────────── */
  var cmdHistory = [];
  var histIdx = -1;

  /* ─── COMMANDS ─────────────────────────────────────────── */
  var COMMANDS = {};

  /* ─── Dispatcher ───────────────────────────────────────── */
  function run(raw) {
    var trimmed = raw.trim();
    if (!trimmed) return;

    // Record history
    cmdHistory.unshift(trimmed);
    histIdx = -1;

    // Echo the command
    print('❯ ' + trimmed, 'dim');

    // Parse
    var parts = trimmed.split(/\s+/);
    var cmd   = parts[0].toLowerCase();
    var args  = parts.slice(1);

    // Dispatch
    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args);
    } else {
      print(cmd + ': command not found — try \'help\'', 'error');
    }
    printBlank();
  }

  /* ─── Input wiring ─────────────────────────────────────── */
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var val = input.value;
      input.value = '';
      run(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) {
        histIdx++;
        input.value = cmdHistory[histIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        input.value = cmdHistory[histIdx];
      } else {
        histIdx = -1;
        input.value = '';
      }
    }
  });

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
