
const cron = require('node-cron');
const logger = require('./logger');
const db = require('../models');
const { Op } = require('sequelize');

// runs every hour
cron.schedule('0 * * * *', async () => {
  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const recentProducts = await db.Product.findAll({
      where: {
        createdAt: { [Op.gte]: yesterday },
        createdBy: { [Op.ne]: null }
      }
    });

    if (recentProducts.length > 0) {
      logger.info('Admin added new products in the last 24 hours.');
    } else {
      logger.info('No new admin-added products in the last 24 hours.');
    }
  } catch (err) {
    logger.error('Scheduler error:', err);
  }
});