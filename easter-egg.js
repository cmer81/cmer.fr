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

  /* ─── Shell classics ───────────────────────────────────── */
  var pageLoadTime = Date.now();

  COMMANDS['help'] = function () {
    printLines([
      '┌─ Shell ─────────────────────────────────────────────┐',
      '  help         this help',
      '  clear / cls  clear the terminal',
      '  exit / quit  close the terminal',
      '  whoami       current user',
      '  pwd          current directory',
      '  ls           list files',
      '  ls -la       list files (detailed)',
      '  cat <file>   read a file',
      '  uname -a     system info',
      '  uptime       system uptime',
      '  date         current date',
      '  history      command history',
      '  echo <text>  print text',
      '  man <cmd>    manual for a command',
      '  sudo <cmd>   try your luck',
      '  vim          open vim',
      '├─ DevOps ────────────────────────────────────────────┤',
      '  kubectl get pods / nodes / namespaces',
      '  docker ps / docker images',
      '  terraform plan / apply',
      '  git log / git status',
      '  helm list',
      '  systemctl status nginx',
      '  top  df -h  free -h  ps aux',
      '  ping cmer.fr',
      '  curl https://cmer.fr',
      '  ssh cedric@cmer.fr',
      '  nmap cmer.fr',
      '├─ Cloud ─────────────────────────────────────────────┤',
      '  aws s3 ls',
      '  gcloud compute instances list',
      '  cf workers list',
      '├─ Fun ───────────────────────────────────────────────┤',
      '  sl           steam locomotive',
      '  fortune      wise words',
      '  cowsay <text>',
      '  matrix       go deeper',
      '  neofetch     system info, fancy style',
      '  make         build something',
      '  hack         hack the planet',
      '  rm -rf /     don\'t',
      '  reboot       restart everything',
      '  cat .secret  👀',
      '└─────────────────────────────────────────────────────┘'
    ]);
  };

  COMMANDS['clear'] = COMMANDS['cls'] = function () {
    output.innerHTML = '';
  };

  COMMANDS['exit'] = COMMANDS['quit'] = function () {
    close();
  };

  COMMANDS['whoami'] = function () {
    print('cedric');
  };

  COMMANDS['pwd'] = function () {
    print('/home/cedric');
  };

  COMMANDS['ls'] = function (args) {
    if (args[0] === '-la' || args[0] === '-al') {
      printLines([
        'total 48',
        'drwxr-xr-x  8 cedric cedric 4096 Apr  2 10:00 .',
        'drwxr-xr-x  3 root   root   4096 Jan  1 00:00 ..',
        '-rw-r--r--  1 cedric cedric  128 Apr  2 10:00 .secret',
        '-rw-r--r--  1 cedric cedric 8192 Apr  2 10:00 cv.pdf',
        '-rw-r--r--  1 cedric cedric 2048 Apr  2 10:00 skills.txt',
        '-rw-r--r--  1 cedric cedric  512 Apr  2 10:00 contact.txt',
        '-rw-r--r--  1 cedric cedric  256 Apr  2 10:00 README.md',
        'drwxr-xr-x  2 cedric cedric 4096 Apr  2 10:00 projects/',
        'drwxr-xr-x 15 cedric cedric 4096 Apr  2 10:00 k8s-configs/'
      ], 'plain');
    } else {
      print('cv.pdf  skills.txt  contact.txt  README.md  projects/  k8s-configs/  .secret', 'plain');
    }
  };

  var CAT_FILES = {
    'skills.txt': [
      '# Skills',
      '',
      '[Orchestration]  Kubernetes · Docker · Helm · OpenShift',
      '[Cloud]          AWS · GCP · Cloudflare · OpenStack',
      '[CI/CD]          GitHub Actions · GitLab CI · ArgoCD · Flux',
      '[IaC]            Terraform · Ansible · Pulumi',
      '[Observability]  Prometheus · Grafana · Loki · Datadog',
      '[Languages]      Bash · Python · Go (basics)',
      '[Networking]     BGP · Cilium · Istio · Traefik · nginx',
      '[Security]       Vault · Falco · OPA · TLS everywhere'
    ],
    'contact.txt': [
      'Email   : cmer@cmer.fr',
      'LinkedIn: linkedin.com/in/google-cloud/',
      'GitHub  : github.com/cmer81',
      'Web     : https://cmer.fr'
    ],
    '/etc/about': [
      'Cedric Mercier — Lead Platform Engineer',
      'Basé à Rodez, France. Disponible en remote.',
      '15+ ans d\'expérience en infrastructure cloud.',
      'Kubernetes, CI/CD, sécurité réseau : terrain de jeu quotidien.',
      'Fan de systèmes bien construits et de migrations sans coupure.'
    ],
    '/etc/motd': [
      '########################################',
      '#  cmer.fr — infrastructure as poetry  #',
      '#  kubectl get life --all-namespaces    #',
      '#  No issues found. (liar.)             #',
      '########################################'
    ],
    '/dev/null': [],
    '.secret': [
      '🎉 Bravo, tu as trouvé l\'easter egg !',
      '',
      'Ce terminal est là pour les curieux comme toi.',
      'Si tu veux discuter infra, K8s ou café ☕,',
      'envoie-moi un mail : cmer@cmer.fr',
      '',
      'À bientôt peut-être ! — Cedric'
    ],
    'readme.md': [
      '# /home/cedric',
      '',
      'Bienvenue dans mon répertoire home.',
      'Rien d\'intéressant ici... ou presque.',
      'Essaie `cat .secret` 👀'
    ],
    'cv.pdf': [
      'cv.pdf: binary file — visit https://cmer.fr for contact info.',
      'Hint: try `cat contact.txt` instead.'
    ]
  };

  COMMANDS['cat'] = function (args) {
    var file = (args[0] || '').toLowerCase();
    if (!file) { print('usage: cat <file>', 'warn'); return; }
    var content = CAT_FILES[file] || CAT_FILES[file.replace(/^\//, '')] || null;
    if (content === null) {
      print('cat: ' + file + ': No such file or directory', 'error');
    } else if (content.length === 0) {
      // /dev/null — silence
    } else {
      printLines(content, 'plain');
    }
  };

  COMMANDS['uname'] = function () {
    print('Linux cmer.fr 6.1.0-platform #42 SMP Tue Jan  1 00:00:00 UTC 2008 x86_64 GNU/Linux', 'plain');
  };

  COMMANDS['uptime'] = function () {
    var secs = Math.floor((Date.now() - pageLoadTime) / 1000);
    var m = Math.floor(secs / 60);
    var s = secs % 60;
    print(' ' + new Date().toTimeString().slice(0, 8) +
      ' up ' + m + ' min ' + s + ' sec,  1 user,  load average: 0.42, 0.15, 0.08', 'plain');
  };

  COMMANDS['date'] = function () {
    print(new Date().toString(), 'plain');
  };

  COMMANDS['history'] = function () {
    if (cmdHistory.length === 0) { print('(empty)', 'dim'); return; }
    cmdHistory.slice().reverse().forEach(function (c, i) {
      print('  ' + (i + 1) + '  ' + c, 'plain');
    });
  };

  COMMANDS['echo'] = function (args) {
    print(args.join(' '), 'plain');
  };

  var MAN_PAGES = {
    'kubectl': 'kubectl — Kubernetes command-line tool. Controls the cluster manager.',
    'docker':  'docker — Container runtime CLI. Build, run, and ship containers.',
    'terraform': 'terraform — Infrastructure as Code by HashiCorp.',
    'git':     'git — Distributed version control system.',
    'helm':    'helm — The Kubernetes package manager.',
    'curl':    'curl — Transfer data from or to a server.',
    'ssh':     'ssh — OpenSSH remote login client.',
    'ping':    'ping — Send ICMP ECHO_REQUEST to network hosts.',
    'ls':      'ls — List directory contents.',
    'cat':     'cat — Concatenate files and print to stdout.',
    'echo':    'echo — Display a line of text.',
    'clear':   'clear — Clear the terminal screen.',
    'vim':     'vim — Vi IMproved, a programmers text editor. Escape with :q!'
  };

  COMMANDS['man'] = function (args) {
    if (!args[0]) { print('What manual page do you want?', 'warn'); return; }
    var page = MAN_PAGES[args[0].toLowerCase()];
    if (page) {
      print(page, 'plain');
    } else {
      print('No manual entry for ' + args[0], 'error');
    }
  };

  COMMANDS['sudo'] = function (args) {
    var subcmd = args.join(' ').toLowerCase();
    if (subcmd === 'rm -rf /' || subcmd === 'rm -rf /*') {
      print('Deleting everything...', 'warn');
      print('Just kidding. This system is immutable. 😌', 'plain');
    } else {
      print('[sudo] password for cedric: ', 'warn');
      print('Permission denied. Nice try.', 'error');
    }
  };

  COMMANDS['su'] = function () {
    print('Password: ', 'warn');
    print('su: Authentication failure', 'error');
  };

  COMMANDS['vim'] = function () {
    print('You are now stuck in vim.', 'warn');
    print('Type :q! to escape... or just close this terminal.', 'dim');
    setTimeout(close, 2000);
  };

  COMMANDS['rm'] = function (args) {
    var a = args.join(' ');
    if (a === '-rf /' || a === '-rf /*' || a === '-rf /') {
      print('Nice try. This system is immutable. ⛔', 'error');
    } else {
      print('rm: ' + (args[args.length - 1] || '') + ': Permission denied', 'error');
    }
  };

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
