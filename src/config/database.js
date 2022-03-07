require('dotenv').config();

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

module.exports = {
    username: "postgres",
    password: "123456",
    database: "tryMusic",
    host: "172.17.0.3",
    dialect: "postgres",
    define: {
        timestamps: true,
        underscored: true,
        undescoredAll: true,
    },
}