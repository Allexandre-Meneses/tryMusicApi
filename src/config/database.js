require('dotenv').config();

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

module.exports = {
    username: "jlagjhpyivivwp",
    password: "405f960cb22e7c004111c40a1f9afccd1bded71c4a629dae0fbb3dbaebf6e857",
    database: "d8m4per4tl7i5j",
    host: "ec2-54-156-110-139.compute-1.amazonaws.com",
    dialect: "postgres",
    define: {
        timestamps: true,
        underscored: true,
        undescoredAll: true,
    },
}