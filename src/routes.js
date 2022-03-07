const { Router } = require("express");
const express = require('express');
const cors = require("cors");

const EventsController = require("./app/controllers/eventsController");
const AuthMiddleware = require('./app/middlewares/auth');
const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/userController");
const bandController = require("./app/controllers/bandController");

const routes = new Router();

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Content-Type', 'application/json');

    next();
});

routes.get("/", (req, res) => {
    return res.json({ msg: "App Eventos" });
});

/*Routes de User*/

routes.post('/users', cors(), UserController.store);
routes.get('/users', cors(), UserController.index);


/*Routes de Bands*/

routes.put('/bands', bandController.update);

/* Routes de Events*/

routes.post('/events', cors(), EventsController.store);
routes.get('/events', cors(), EventsController.index);
routes.put('/events/:id', cors(), EventsController.update);
routes.delete('/events', cors(), EventsController.delete);

/*Routes de Session*/

routes.post("/login", cors(), SessionController.store);

//Todas as rotas após o middlwares só serão executadas se o ususario estiver logado
routes.use(AuthMiddleware);

/*Routes de User*/

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

/*Routes de Bands*/

routes.post('/bands/:banda_id/users', UserController.store);
routes.post('/bands', bandController.store);
routes.get('/bands', bandController.index);
routes.post('/join', bandController.joinBand)

/*Routes de Events*/



module.exports = routes;