const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  try {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    };

    const catprinterPath = path.join(__dirname, '..', 'child');
    try {
      await fs.access(catprinterPath);
      healthCheck.catprinter = 'Available';
    } catch (error) {
      healthCheck.catprinter = 'Not found';
    }

    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(500).json({
      message: 'Error in health check',
      error: error.message
    });
  }
});

module.exports = router;