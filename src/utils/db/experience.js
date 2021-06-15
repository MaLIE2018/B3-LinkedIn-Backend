export default (sequelize, DataTypes) => {

    const experience = sequelize.define("experience", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        company: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        area: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
        }

    })
    return experience
}

