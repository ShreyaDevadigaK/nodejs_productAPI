const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const adminRoutes = require('./routes/admin.routes');
const logger = require('./utils/logger');
require('./utils/scheduler');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('API is running!');
});


app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
db.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => logger.error('Database connection error: ', err));



