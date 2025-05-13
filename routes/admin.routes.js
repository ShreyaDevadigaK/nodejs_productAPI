const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const db = require('../models');
const { Op } = require('sequelize');

router.get('/report', auth, role('admin'), adminCtrl.getMonthlyReport);

// scheduler
router.get('/run-scheduler', auth, role('admin'), async (req, res) => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentProducts = await db.Product.findAll({
    where: {
      createdAt: { [Op.gte]: yesterday },
      createdBy: { [Op.ne]: null }
    }
  });

  if (recentProducts.length > 0) {
    res.json({ message: 'Admin added new products in the last 24 hours.' });
  } else {
    res.json({ message: 'No new admin-added products in the last 24 hours.' });
  }
});

module.exports = router;
