const express = require("express");
const { password } = require("../../config/database");
const Yup = require('yup');
const Event = require('../models/Events');



const app = express();
app.use(express.json());

class EventosController {

    async index(req, res) {
        const events = await Event.findAll({
            attributes: ["name", "date", "time", "place", "description", "tipo", "band_id"]
        });
        //console.log(events)
        return res.json(events);
    }

    async store(req, res) {

        const esquema = Yup.object().shape({
            name: Yup.string().required(),
            date: Yup.string().required(),
            time: Yup.string().required(),
            place: Yup.string().required(),
            description: Yup.string().required(),
            tipo: Yup.string().required(),
        });

        if (!(await esquema.isValid(req.body))) {
            return res.status(400).json({ msg: "Campos Inválidos" });
        }

        const eventExists = await Event.findOne({ where: { date: req.body.date, time: req.body.time } });
        //console.log(eventExists);
        if (eventExists) {
            return res.status(400).json({ msg: "Evento já marcado para esse horario" });
        }

        

        const { id, name, date, time, place, description, tipo, band_id } = await Event.
        create(
            req.body
        );

        return res.json({ id, name, date, time, place, description, tipo, band_id });
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            dateAnt: Yup.date(),
            newDate: Yup.date().when('dateAnt', (dateAnt, field) =>
                dateAnt ? field.required() : field
            ),
            dateConf: Yup.date().when('newDate', (newDate, field) =>
                newDate ? field.required().oneOf([Yup.ref('newDate')]) : field
            ),
            time: Yup.string(),
            place: Yup.string(),
            description: Yup.string(),
            tipo: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ msg: "Campos inválidos" });
        }

        // const { name, newDate, newTime, newPlace } = req.body;
        //console.log(name);


        const { name, dateAnt, newDate } = req.body;
        console.log(name, dateAnt, newDate)
        const evento = await Event.findByPk(req.eventoId);

        if (dateAnt != evento.date) {
            const eventoExiste = await Event.findOne({ where: { name } });
            if (eventoExiste) {
                return res.status(400).json({ msg: "Evento já existe." });
            }
        }

        const { id } = await evento.update(req.body);

        return res.json({ id, newDate, newTime, newPlace });
    }

    async delete(req, res) {
        const esquema = Yup.object().shape({
            name: Yup.string().required(),
            date: Yup.date().required(),
        });

        if (!(await esquema.isValid(req.body))) {
            return res.status(400).json({ msg: "Campos Inválidos" });
        }

        const event = await Event.findByPk(req.eventId);


        if (!event) {
            return res.status(401).json({ msg: "Evento não encontrado" });
        }

        const del = await Event.destroy({ where: req.body });
        return res.json({ msg: 'Evento excluído com sucesso!' });
    }
}

module.exports = new EventosController();