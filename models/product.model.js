module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product', {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      userid: DataTypes.INTEGER,
      published: DataTypes.BOOLEAN,
      image: DataTypes.ARRAY(DataTypes.STRING),
      price: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      createdBy: DataTypes.INTEGER,
    });
  };