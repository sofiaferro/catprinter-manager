const { spawn } = require('child_process');
const path = require('path');

function scheduleKeepAwake() {
    setInterval(() => {
        const catprinterDir = path.join(__dirname, '..', 'child');
        const pythonExecutable = process.platform === 'win32' ? 'python' : 'python3';
        const scriptPath = path.join(catprinterDir, 'dummy-print.py');

        const pythonProcess = spawn(pythonExecutable, [scriptPath], {
            cwd: catprinterDir,
            stdio: 'inherit',
            shell: true
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('🔋 Successfully sent dummy wake-up command to printer');
            } else {
                console.error(`🪫 Failed to send wake-up command. Code: ${code}`);
            }
        });
    }, 9 * 60 *  1000);
}

module.exports = { scheduleKeepAwake };
