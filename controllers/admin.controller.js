const db = require('../models');
const { Op, fn, col } = require('sequelize');

exports.getMonthlyReport = async (req, res) => {
  try {
    const userStats = await db.User.findAll({
      attributes: [
        [fn('DATE_TRUNC', 'month', col('createdAt')), 'month'],
        [fn('COUNT', col('id')), 'userCount']
      ],
      group: [fn('DATE_TRUNC', 'month', col('createdAt'))]
    });

    const productStats = await db.Product.findAll({
      attributes: [
        [fn('DATE_TRUNC', 'month', col('createdAt')), 'month'],
        [fn('COUNT', col('id')), 'productCount']
      ],
      group: [fn('DATE_TRUNC', 'month', col('createdAt'))]
    });

    res.json({ users: userStats, products: productStats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
