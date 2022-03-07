//require('dotenv').config();

/*const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } = process.env;*/

module.exports = {
    url: process.env.DATABASE_URL,
    /*
    username: "clyndfamjairur",
    password: "9b821729d322549a8ca9b94d0a73d53e55f46b483eb8145f1e0e560f2b6f9e14",
    database:"d95j57ithefmop",
    host: "ec2-34-231-183-74.compute-1.amazonaws.com",
    */
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

