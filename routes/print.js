const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const printService = require('../services/printService');

const upload = multer({
  dest: path.join(__dirname, 'tmp'),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Simple print queue management
let printQueue = [];
let isPrinting = false;

router.post('/print', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó un archivo de imagen' });
    }

    const { originalname, path: tempPath } = req.file;
    const imagePath = path.join('/tmp', originalname);

    // Move the file from the temporary directory to the desired location
    await fs.rename(tempPath, imagePath);

    // Add to the print queue
    printQueue.push({ name: originalname, path: imagePath });

    // Start printing if not already in progress
    if (!isPrinting) {
      processPrintQueue();
    }

    res.json({ message: `La imagen ${originalname} fue añadida a la cola de impresión` });
  } catch (error) {
    console.error('Error al procesar la solicitud de impresión:', error);
    res.status(500).json({ error: 'No se pudo procesar la solicitud de impresión', details: error.message });
  }
});

async function processPrintQueue() {
  if (printQueue.length === 0) {
    isPrinting = false;
    return;
  }

  isPrinting = true;
  const { name, path: imagePath } = printQueue.shift();

  try {
    console.log(`🖨️ Procesando el trabajo de impresión para ${name}`);
    await printService.printImage(name, imagePath);
    console.log(`✅ Terminada la impresión de ${name}`);
  } catch (error) {
    console.error(`🆘 Error al imprimir ${name}:`, error);
  } finally {
    // Process the next in the queue
    processPrintQueue();
  }
}

module.exports = router;