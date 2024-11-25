const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const printService = require('../services/printService');

// Configurar multer para la carga de archivos
const upload = multer({
  dest: path.join(__dirname, '..', 'child', 'temp'),
  limits: { fileSize: 10 * 1024 * 1024 }, // Límite de 10MB
});

// Gestión simple de la cola
let printQueue = [];
let isPrinting = false;

router.post('/print', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó un archivo de imagen' });
    }

    const { originalname, path: tempPath } = req.file;
    const imagePath = path.join(__dirname, '..', 'child', originalname);

    // Mover el archivo del directorio temporal al directorio de catprinter
    await fs.rename(tempPath, imagePath);

    // Agregar a la cola de impresión
    printQueue.push({ name: originalname, path: imagePath });

    // Comenzar la impresión si no hay otra en curso
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
    console.log(`Procesando el trabajo de impresión para ${name}`);
    await printService.printImage(name, imagePath);
    console.log(`Terminada la impresión de ${name}`);
  } catch (error) {
    console.error(`Error al imprimir ${name}:`, error);
  } finally {
    // Limpiar el archivo
    try {
      await fs.unlink(imagePath);
      console.log(`Archivo temporal eliminado: ${imagePath}`);
    } catch (unlinkError) {
      console.error(`Error al eliminar el archivo ${imagePath}:`, unlinkError);
    }

    // Procesar el siguiente en la cola
    processPrintQueue();
  }
}

module.exports = router;
