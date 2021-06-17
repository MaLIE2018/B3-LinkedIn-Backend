export default (sequelize, DataTypes) => {

    const profile = sequelize.define("profile", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        surname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ""
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ""
        },
        area: {
            type: DataTypes.TEXT,
            allowNull: false,
           
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
        },
         password: {
            type: DataTypes.TEXT,
            allowNull: false, 
            defaultValue: ""
        }
       

    })
    return profile
}   