const { spawn } = require('child_process');
const path = require('path');

async function printImage(imageName, imagePath) {
  return new Promise((resolve, reject) => {
    console.log(path.join(__dirname, '..', 'child'))
    const catprinterDir = path.join(__dirname, '..', 'child');
    const pythonExecutable = process.platform === 'win32' ? 'python' : 'python3';
    const scriptPath = path.join(catprinterDir, 'print.py');

    const pythonProcess = spawn(pythonExecutable, [scriptPath, imagePath], {
      cwd: catprinterDir,
      stdio: 'inherit',
      shell: true
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(`🖨️ Printed ${imageName} successfully`);
      } else {
        reject(new Error(`Printing failed with code ${code}`));
      }
    });
  });
}

module.exports = { printImage };