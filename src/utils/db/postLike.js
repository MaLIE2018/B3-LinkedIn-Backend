export default (sequelize, DataTypes) => {
    const postLike = sequelize.define("postLike", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
    return postLike;
  };
  
 