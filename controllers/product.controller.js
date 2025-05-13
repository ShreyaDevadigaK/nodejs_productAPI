const db = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path'); 

exports.createProduct = async (req, res) => {
  try {
    const { name, description, published, price, rating } = req.body;
    const images = req.files?.map(file => file.path);
    const product = await db.Product.create({
      name,
      description,
      published,
      price,
      rating,
      image: images,
      userid: req.user.id,
      createdBy: req.user.id
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProductByUserId = async (req, res) => {
  try {
    const { name, description, published, price, rating } = req.body;
    const images = req.files?.map(file => file.path);
    const userId = parseInt(req.params.userid);

    const product = await db.Product.create({
      name,
      description,
      published,
      price,
      rating,
      image: images,
      userid: userId,
      createdBy: req.user.id
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const isValidNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);

exports.bulkUpload = async (req, res) => {
  try {
    const products = [];
    const imageBasePath = path.join(__dirname, '../uploads/images');
    const csvPath = req.file.path;

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        const price = parseInt(data.price);
        const rating = parseFloat(data.rating);
        const imageFile = data.image ? path.join('uploads/images', data.image) : null;

        
        if (!data.name || !data.description || !isValidNumber(price) || !isValidNumber(rating)) return;

        products.push({
          name: data.name,
          description: data.description,
          published: data.published === 'true',
          price,
          rating,
          image: imageFile ? [imageFile] : [],
          userid: req.user.id,
          createdBy: req.user.id,
        });
      })
      .on('end', async () => {
        if (products.length === 0) return res.status(400).json({ message: 'No valid products found in CSV.' });
        await db.Product.bulkCreate(products);
        res.json({ message: 'Products with images uploaded successfully' });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { Parser } = require('json2csv');

exports.downloadCSV = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    const parser = new Parser();
    const csv = parser.parse(products.map(p => p.toJSON()));
    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userid);
    const products = await db.Product.findAll({ where: { userid: userId } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const updated = await db.Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await db.Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    await db.Product.destroy({ where: {}, truncate: true });
    res.json({ message: 'All products deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPublishedProducts = async (req, res) => {
  try {
    const published = await db.Product.findAll({ where: { published: true } });
    res.json(published);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProductByUserId = async (req, res) => {
  try {
    const newProduct = await db.Product.create({
      ...req.body,
      userId: req.params.userId, 
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProductByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userid);
    const productId = parseInt(req.params.productid);
    const updated = await db.Product.update(req.body, {
      where: { id: productId, userid: userId }
    });
    if (updated[0] === 0) return res.status(404).json({ message: 'Product not found for this user' });
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { name, sortBy, order = 'ASC', page = 1, limit = 10, userid } = req.query;
    const where = {};

    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (userid && !isNaN(userid)) where.userid = parseInt(userid);

    const options = {
      where,
      order: sortBy ? [[sortBy, order]] : undefined,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    };

    const products = await db.Product.findAndCountAll(options);
    res.json({
      total: products.count,
      pages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      products: products.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};