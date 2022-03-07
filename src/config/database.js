require('dotenv').config();

/*const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } = process.env;*/

module.exports = {
    url: process.env.DATABASE_URL,
    /*password: "123456",
    database:"tryMusic",
    host: "172.17.0.3",*/
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    },
    define: {
        timestamps: true,
        underscored: true,
        undescoredAll: true,
    },
}

