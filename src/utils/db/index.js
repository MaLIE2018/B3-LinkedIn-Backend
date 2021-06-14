import s from "sequelize";

const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;

import ProfileModel from "./profile.js"
import ExperienceModel from "./experience.js"
import PostModel from "./post.js"
import CommentModel from "./comment.js"
import PostLikeModel from "./postLike.js"
import CommentLikeModel from "./postLike.js"

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "postgres"
})

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

const models = {
    Profile: ProfileModel(sequelize, DataTypes),
    Experience: ExperienceModel(sequelize, DataTypes),
    Post: PostModel(sequelize, DataTypes),
    Comment: CommentModel(sequelize, DataTypes),
    PostLike: PostLikeModel(sequelize, DataTypes),
    CommentLike: CommentLikeModel(sequelize, DataTypes),
    sequelize: sequelize,
}

const { Profile, Experience, Post, Comment, PostLike, CommentLike } = models

Profile.hasMany(Experience)
Experience.belongsTo(Profile)

Profile.hasMany(Post)
Post.belongsTo(Profile)

Profile.hasMany(Comment)
Comment.belongsTo(Profile)

Post.hasMany(Comment)
Comment.belongsTo(Post)

// Post Likes Association 

Profile.belongsToMany(Post, { through: { model: PostLike, unique: true, timestaps: true } })
Post.belongsToMany(Profile, { through: { model: PostLike, unique: true, timestaps: true } })

// Comment Likes Association 

// Profile.belongsToMany(Comment, { through: { model: CommentLike, unique: true, timestaps: true } })
// Comment.belongsToMany(Profile, { through: { model: CommentLike, unique: true, timestaps: true } })


export default models;