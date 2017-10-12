module.exports = function(sequelize, DataTypes) {
  var Outfit = sequelize.define("Outfit", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Outfit.associate = function(models) {
    // We're saying that a Post should belong to a Stylist
    // A Post can't be created without an Stylist due to the foreign key constraint
    Outfit.belongsTo(models.Stylist, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Outfit;
};
