require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 8080;

console.log(process.env.PORT)

app.listen(port);