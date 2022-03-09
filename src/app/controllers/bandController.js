const express = require("express");
const { password } = require("../../config/database");
const Yup = require("yup");
const Band = require('../models/Bands');
const User = require('../models/Users');
const Events = require("../models/Events");


const app = express();
app.use(express.json());

class BandaController {

    async index(req, res) {
        const user_id = req.musicoId
        const bandas = await Band.findAll({where: {user_id},
            attributes: ["id", "name",],
            /*include: [{
                model: Events,
                as: "evento",
                attributes: ["name", "date", "time", "place", "description", "tipo"]
            }]*/
        });

        //console.log(events)
        return res.json(bandas);
    }

    async store(req, res) {
        const esquema = Yup.object().shape({
            name: Yup.string().required(),
            //musico_id: Yup.number().required(),
            //evento_id: Yup.number().required()
        });
        const { name } = req.body;
        const user_id = Number(req.musicoId);
        console.log("Aquiii ESTAA OOO");
        console.log(req.musicoId)

        if (!(await esquema.isValid(req.body))) {
            return res.status(400).json({ msg: "Campos Inválidos" });
        }
       /* const { musico_id, evento_id } = req.params;

        const user = await User.findByPk(musico_id);
        const evento = await Events.findByPk(evento_id);

        if (!user) {
            return res.status(401).json({ msg: "Id não é um músico" });
        }

        if (!evento) {
            return res.status(401).json({ msg: "Id não é um evento" });
        }*/

        const {id} = await Band.create({
            name: name,
            user_id: user_id
        });

        const user = await User.findOne({where: {id: user_id}})

        const {band_id} = await user.update({
            band_id: id
        })


        return res.status(200).json({ Msg: "Band Cadastrada com sucesso!" });
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            novoName: Yup.string(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ msg: "Campos inválidos" });
        }

        const { novoName } = req.body;

        const banda = await Band.findOne({ where: { name: req.body.name } });

        const { name } = await banda.update({
            name: novoName,
        })

        return res.status(200).json({ Msg: "Dados atualizados!" });

    }

    async joinBand(req, res) {
        const schema = Yup.object().shape({
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ msg: "Campos inválidos" });
        }

        const {band_id} = req.body;

        const user = await User.findOne({where: {id: req.musicoId}})

        const { name } = await user.update({
            band_id: band_id
        })

        return res.status(200).json({ msg: "Ingressou na Banda"})
    }

    async delete(req, res) {

        const banda = await Band.findByPk(req.body.id)

        banda.destroy()

        return res.json({ mensagem: "Banda excluido" });
    }
}

module.exports = new BandaController();