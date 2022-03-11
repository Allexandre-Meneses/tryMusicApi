const express = require("express");
const { password } = require("../../config/database");
const Yup = require('yup');
const Event = require('../models/Events');
const Bands = require('../models/Bands')



const app = express();
app.use(express.json());

class EventosController {

    async index(req, res) {
        const band_id = req.body.band_id
        const events = await Event.findAll({
            where: {band_id: band_id},
            attributes: ["name", "date", "time", "place", "description", "tipo", "band_id"]
        });
        //console.log(events)
        return res.status(200).json(events);
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
            return res.status(400).json({ mensagem: "Invalid fields" });
        }

        const eventExists = await Event.findOne({ where: { date: req.body.date, time: req.body.time } });
        //console.log(eventExists);
        if (eventExists) {
            return res.status(400).json({ mensagem: "Event already scheduled for this time." });
        }

        const { id, name, date, time, place, description, tipo } = await Event.
        create(
            req.body
        );

        return res.status(200).json({mensagem: "Event registered!"});
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            dateAnt: Yup.date(),
            date: Yup.date().when('dateAnt', (dateAnt, field) =>
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
            return res.status(400).json({ mensagem: "Invalid fields" });
        }

        // const { name, newDate, newTime, newPlace } = req.body;
        //console.log(name);


        const { name, dateAnt, newDate } = req.body;
        console.log(name, dateAnt, newDate)
        const {event_id} = req.params;
        const evento = await Event.findByPk(event_id);

        if (dateAnt != evento) {
            const eventoExiste = await Event.findOne({ where: { name } });
            if (!eventoExiste) {
                return res.status(400).json({ mensagem: "Event does not exist." });
            }
        }

        const { id } = await evento.update(req.body);

        return res.json({ id, newDate });
    }

    async delete(req, res) {
        const esquema = Yup.object().shape({
            name: Yup.string().required(),
            date: Yup.date().required(),
        });

        if (!(await esquema.isValid(req.body))) {
            return res.status(400).json({ mensagem: "Invalid fields" });
        }

        const event = await Event.findByPk(req.eventId);


        if (!event) {
            return res.status(401).json({ mensagem: "Event not found" });
        }

        const del = await Event.destroy({ where: req.body });
        return res.status(200).json({ mensagem: 'Event deleted successfully!' });
    }
}

module.exports = new EventosController();