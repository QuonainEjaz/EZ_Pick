// Force React Native to use the built-in debugger
process.env.REACT_NATIVE_DISABLE_DEBUGGER_AUTO_LAUNCH = 'true';
process.env.REACT_NATIVE_USE_HERMES = 'true';
process.env.RCT_NO_LAUNCH_PACKAGER = '0';
process.env.NO_FLIPPER = '1';

// Start the packager with experimental debugger
const { spawn } = require('child_process');
const path = require('path');
const isWindows = process.platform === 'win32';

console.log('📱 Starting React Native with built-in debugger (no Flipper)...');

// On Windows, we need to use the full path with .cmd extension
const npxCommand = isWindows ? 'npx.cmd' : 'npx';

// Run the start command with experimental debugger
const metro = spawn(npxCommand, ['react-native', 'start', '--experimental-debugger'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    REACT_DEBUGGER: 'echo Skip Flipper, using built-in debugger instead',
  },
  shell: isWindows, // Use shell on Windows for better compatibility
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('Shutting down Metro...');
  metro.kill();
  process.exit(0);
});

metro.on('close', (code) => {
  console.log(`Metro exited with code ${code}`);
  process.exit(code);
}); 