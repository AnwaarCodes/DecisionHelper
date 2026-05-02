const { execSync } = require('child_process');
const os = process.platform;
try {
  if (os === 'linux') {
    console.log('Installing rolldown native binding for linux...');
    execSync('npm install @rolldown/binding-linux-x64-gnu --no-save', { stdio: 'inherit' });
  } else {
    console.log('Skipping rolldown native binding install on', os);
  }
} catch (e) {
  console.warn('Failed to install rolldown binding:', e && e.message);
}
