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

  /* ─── DevOps / Infra ───────────────────────────────────── */
  COMMANDS['kubectl'] = function (args) {
    var sub = args.join(' ').toLowerCase();
    if (sub === 'get pods') {
      printLines([
        'NAMESPACE    NAME                          READY  STATUS    RESTARTS  AGE',
        'production   api-7d9f8c-xk2p9             2/2    Running   0         12d',
        'production   api-7d9f8c-mn3q7             2/2    Running   0         12d',
        'production   worker-5b6d9f-zp1r4          1/1    Running   0         5d',
        'staging      api-6c8e7b-vw9s2             1/1    Running   1         3d',
        'monitoring   prometheus-0                 1/1    Running   0         30d',
        'monitoring   grafana-d4b9c-lk8t1          1/1    Running   0         30d'
      ], 'plain');
    } else if (sub === 'get nodes') {
      printLines([
        'NAME           STATUS  ROLES           AGE  VERSION',
        'node-master-1  Ready   control-plane   90d  v1.29.2',
        'node-worker-1  Ready   <none>          90d  v1.29.2',
        'node-worker-2  Ready   <none>          90d  v1.29.2',
        'node-worker-3  Ready   <none>          87d  v1.29.2'
      ], 'plain');
    } else if (sub === 'get namespaces' || sub === 'get ns') {
      printLines([
        'NAME          STATUS  AGE',
        'default       Active  90d',
        'production    Active  90d',
        'staging       Active  45d',
        'monitoring    Active  90d',
        'cert-manager  Active  90d',
        'ingress       Active  90d'
      ], 'plain');
    } else {
      print('error: unknown command "' + args.join(' ') + '" — try: get pods, get nodes, get namespaces', 'error');
    }
  };

  COMMANDS['docker'] = function (args) {
    var sub = (args[0] || '').toLowerCase();
    if (sub === 'ps') {
      printLines([
        'CONTAINER ID  IMAGE                    COMMAND              STATUS         PORTS',
        'a1b2c3d4e5f6  nginx:1.25-alpine        "nginx -g \'daemon…"  Up 5 days      0.0.0.0:80->80/tcp',
        'b2c3d4e5f6a1  postgres:16-alpine       "docker-entrypoint…" Up 12 days     5432/tcp',
        'c3d4e5f6a1b2  redis:7-alpine           "docker-entrypoint…" Up 12 days     6379/tcp'
      ], 'plain');
    } else if (sub === 'images') {
      printLines([
        'REPOSITORY       TAG           IMAGE ID      CREATED       SIZE',
        'nginx            1.25-alpine   d4a5e0eaa84f  2 weeks ago   41.1MB',
        'postgres         16-alpine     9f6f1e9b2c3a  3 weeks ago   243MB',
        'redis            7-alpine      3b4c5d6e7f8a  1 month ago   31.5MB',
        'cmer/api         latest        1a2b3c4d5e6f  2 days ago    128MB'
      ], 'plain');
    } else {
      print('docker: unknown subcommand "' + sub + '" — try: ps, images', 'error');
    }
  };

  COMMANDS['terraform'] = function (args) {
    var sub = (args[0] || '').toLowerCase();
    if (sub === 'plan') {
      printLines([
        'Refreshing Terraform state in-memory prior to plan...',
        '',
        '  + cloudflare_record.www (new)',
        '  + cloudflare_record.api (new)',
        '  ~ kubernetes_deployment.api (updated)',
        '  - old_lb_rule.legacy (destroyed)',
        '',
        'Plan: 2 to add, 1 to change, 1 to destroy.'
      ], 'plain');
    } else if (sub === 'apply') {
      printLines([
        'cloudflare_record.www: Creating...',
        'cloudflare_record.www: Creation complete after 2s',
        'cloudflare_record.api: Creating...',
        'cloudflare_record.api: Creation complete after 2s',
        'kubernetes_deployment.api: Modifying...',
        'kubernetes_deployment.api: Modifications complete after 8s',
        'old_lb_rule.legacy: Destroying...',
        'old_lb_rule.legacy: Destruction complete after 1s',
        '',
        'Apply complete! Resources: 2 added, 1 changed, 1 destroyed.'
      ], 'plain');
    } else {
      print('Usage: terraform <plan|apply>', 'warn');
    }
  };

  COMMANDS['git'] = function (args) {
    var sub = (args[0] || '').toLowerCase();
    if (sub === 'log') {
      printLines([
        'commit f3a2b1c (HEAD -> main, origin/main)',
        'Author: Cedric Mercier <cmer@cmer.fr>',
        'Date:   Wed Apr 2 10:00:00 2026',
        '    feat: migrate ingress from nginx to Cilium Gateway API',
        '',
        'commit e1d2c3b',
        'Author: Cedric Mercier <cmer@cmer.fr>',
        'Date:   Mon Mar 31 14:30:00 2026',
        '    fix: increase liveness probe timeout on api pods',
        '',
        'commit d0c1b2a',
        'Author: Cedric Mercier <cmer@cmer.fr>',
        'Date:   Fri Mar 28 09:00:00 2026',
        '    chore: bump postgres to 16.3',
        '',
        'commit c9b0a1f',
        'Author: Cedric Mercier <cmer@cmer.fr>',
        'Date:   Thu Mar 27 16:00:00 2026',
        '    feat: add Grafana alerting for pod CrashLoopBackOff'
      ], 'plain');
    } else if (sub === 'status') {
      printLines([
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        '',
        'nothing to commit, working tree clean'
      ], 'plain');
    } else {
      print('git ' + args.join(' ') + ': try \'git log\' or \'git status\'', 'warn');
    }
  };

  COMMANDS['helm'] = function (args) {
    var sub = (args[0] || '').toLowerCase();
    if (sub === 'list') {
      printLines([
        'NAME            NAMESPACE   REVISION  UPDATED                   STATUS    CHART',
        'cert-manager    cert-manager  5       2026-01-15 09:00:00 UTC   deployed  cert-manager-v1.14.0',
        'prometheus      monitoring    12      2026-03-01 14:00:00 UTC   deployed  kube-prometheus-stack-57.0.0',
        'ingress-nginx   ingress        8      2026-02-20 11:00:00 UTC   deployed  ingress-nginx-4.10.0'
      ], 'plain');
    } else {
      print('Usage: helm list', 'warn');
    }
  };

  COMMANDS['systemctl'] = function (args) {
    var sub = args.join(' ').toLowerCase();
    if (sub === 'status nginx') {
      printLines([
        '● nginx.service - A high performance web server',
        '   Loaded: loaded (/lib/systemd/system/nginx.service)',
        '   Active: active (running) since Wed 2026-04-02 00:00:00 UTC; 2h ago',
        '  Process: 1042 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)',
        ' Main PID: 1043 (nginx)',
        '   CGroup: /system.slice/nginx.service',
        '           ├─1043 nginx: master process /usr/sbin/nginx',
        '           └─1044 nginx: worker process'
      ], 'plain');
    } else {
      print('Usage: systemctl status nginx', 'warn');
    }
  };

  COMMANDS['top'] = function () {
    printLines([
      'top — ' + new Date().toTimeString().slice(0, 8) + ' up 42 days — load avg: 0.42, 0.18, 0.09',
      'Tasks: 148 total,  1 running, 147 sleeping',
      '%Cpu(s):  2.1 us,  0.5 sy,  0.0 ni, 97.1 id',
      'MiB Mem :  7892.0 total,  2341.0 free,  3210.0 used,  2341.0 buff/cache',
      '',
      '  PID USER     PR  NI  VIRT   RES   SHR  S  %CPU  %MEM  TIME+   COMMAND',
      ' 1043 cedric   20   0  284m  18.2m  9.1m  S   1.2   0.2  0:42.11  nginx',
      ' 2187 cedric   20   0  1.2g  312m  24.1m  S   0.8   3.9  8:14.02  node',
      ' 3001 cedric   20   0  512m  128m  12.2m  S   0.3   1.6  2:01.55  python3',
      '    1 root     20   0  225m   9.2m  6.4m  S   0.0   0.1  0:01.23  systemd'
    ], 'plain');
  };

  COMMANDS['df'] = function () {
    printLines([
      'Filesystem      Size  Used Avail Use% Mounted on',
      '/dev/sda1        50G   18G   32G  36% /',
      '/dev/sdb1       200G   87G  113G  44% /data',
      'tmpfs           3.9G  1.2M  3.9G   1% /run',
      'overlay          50G   18G   32G  36% /var/lib/docker/overlay2'
    ], 'plain');
  };

  COMMANDS['free'] = function () {
    printLines([
      '              total        used        free      shared  buff/cache   available',
      'Mem:           7.7G        3.1G        2.3G        128M        2.3G        4.2G',
      'Swap:          2.0G          0B        2.0G'
    ], 'plain');
  };

  COMMANDS['ps'] = function () {
    printLines([
      'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT  COMMAND',
      'cedric    1043  1.2  0.2  284120 18632 ?        Ss    nginx: master',
      'cedric    1044  0.1  0.1  284120  9312 ?        S     nginx: worker',
      'cedric    2187  0.8  3.9 1258496 321024 ?       Sl    node server.js',
      'cedric    3001  0.3  1.6  524288 131072 ?       S     python3 worker.py',
      'root         1  0.0  0.1  225256  9472 ?        Ss    /sbin/init'
    ], 'plain');
  };

  COMMANDS['ping'] = function (args) {
    var host = args[0] || 'cmer.fr';
    printLines([
      'PING ' + host + ' (104.21.42.1): 56 data bytes',
      '64 bytes from 104.21.42.1: icmp_seq=0 ttl=60 time=11.842 ms',
      '64 bytes from 104.21.42.1: icmp_seq=1 ttl=60 time=12.103 ms',
      '64 bytes from 104.21.42.1: icmp_seq=2 ttl=60 time=11.967 ms',
      '',
      '--- ' + host + ' ping statistics ---',
      '3 packets transmitted, 3 received, 0% packet loss',
      'round-trip min/avg/max = 11.842/11.971/12.103 ms'
    ], 'plain');
  };

  COMMANDS['curl'] = function (args) {
    var url = args[0] || '';
    if (url.includes('cmer.fr') || !url) {
      printLines([
        '<!DOCTYPE html>',
        '<html lang="fr">',
        '  <head>',
        '    <title>Cedric Mercier — Lead Platform Engineer</title>',
        '    <!-- 👋 salut le curieux -->',
        '  </head>',
        '  <body>',
        '    <!-- Tu aurais pu juste visiter le site normalement... -->',
        '    <!-- Mais non, il a fallu que tu fasses un curl. Respect. -->',
        '  </body>',
        '</html>'
      ], 'plain');
    } else {
      print('curl: could not resolve host: ' + url, 'error');
    }
  };

  COMMANDS['ssh'] = function (args) {
    var host = args[0] || 'cmer.fr';
    print(host + ': Permission denied (publickey).', 'error');
  };

  COMMANDS['nmap'] = function () {
    printLines([
      'Starting Nmap 7.94 ( https://nmap.org )',
      'Nmap scan report for cmer.fr (104.21.42.1)',
      'Host is up (0.012s latency).',
      '',
      'PORT    STATE  SERVICE',
      '80/tcp  open   http',
      '443/tcp open   https',
      '',
      'Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds'
    ], 'plain');
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
