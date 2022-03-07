/*const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
});

sequelize
    .authenticate()
    .then(() => console.log("Connection has been estabilhished successfully"))
    .catch((err) => console.log("Unable to connect to the database",err))

module.exports = sequelize;
*/