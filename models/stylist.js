module.exports = function(sequelize, DataTypes) {
  var Stylist = sequelize.define("Stylist", {
    // Giving the Stylist model a name of type STRING
    name: DataTypes.STRING
  });

  var Stylist = sequelize.define("Stylist", {
    q1a: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    q2a: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
      },
    q3a: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
        },
    q4a: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    q5a: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
});

  return Stylist;
};
