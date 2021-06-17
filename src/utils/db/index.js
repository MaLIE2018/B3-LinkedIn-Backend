import s from "sequelize";

const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
const Op = s.Op

import ProfileModel from "./profile.js"
import ExperienceModel from "./experience.js"
import PostModel from "./post.js"
import CommentModel from "./comment.js"
import PostLikeModel from "./postLike.js"
import CommentLikeModel from "./commentLike.js"

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
    op:Op

}

const { Profile, Experience, Post, Comment, PostLike, CommentLike } = models

Profile.hasMany(Experience,  {onDelete: "CASCADE"})
Experience.belongsTo(Profile)

Profile.hasMany(Post,  {onDelete: "CASCADE"})
Post.belongsTo(Profile)

Profile.hasMany(Comment, {onDelete: "CASCADE"})
Comment.belongsTo(Profile)

Post.hasMany(Comment, {onDelete: "CASCADE"})
Comment.belongsTo(Post)

// Post Likes Association 

Profile.belongsToMany(Post, { through: { model: PostLike, unique: true, onDelete: "CASCADE" } })
Post.belongsToMany(Profile, { through: { model: PostLike, unique: true, onDelete: "CASCADE" } })

// Comment Likes Association 

Profile.belongsToMany(Comment, { through: { model: CommentLike, unique: true, onDelete: "CASCADE" } })
Comment.belongsToMany(Profile, { through: { model: CommentLike, unique: true, onDelete: "CASCADE" } })


export default models; 