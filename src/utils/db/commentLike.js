export default (sequelize, DataTypes) => {
    const commentLike = sequelize.define("commentLike", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
    return commentLike;
  };
  