const express = require("express");
const { password } = require("../../config/database");
const Yup = require("yup");
const Bands = require("../models/Bands");
const User = require("../models/Users");
const Events = require("../models/Events");
const BandUser = require("../models/bandsusers");
const BandsUser = require("../models/bandsusers");
const { response } = require("express");

const app = express();
app.use(express.json());

class BandaController {
  async index(req, res) {
    //console.log(bandasPertence)
    const bandasPertence = await BandUser.findAll({ 
      attributes: [],
      where: { user_id : req.musicoId },
      include: [{
        model: Bands,
          attributes: ['name', 'id']
      }]
    });
    //console.log(events)
    return res.json(bandasPertence);
  }

  async getBand(req, res) {
    const banda = await Bands.findByPk(req.body.id)

    return res.json(banda)
  }

  async store(req, res) {
    const esquema = Yup.object().shape({
      name: Yup.string().required(),
    });
    const { name } = req.body;

    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "invalid fields" });
    }

    const user_id = Number(req.musicoId)
    console.log(user_id)
  
    const { id } = await Bands.create({
      name: name,
      user_id: user_id
    });

    await BandUser.create({
      band_id: id,
      user_id: user_id
    });
    return res.status(200).json({ mensagem: "Band successfully registered!" });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      novoName: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "invalid fields" });
    }

    const { novoName } = req.body;

    const banda = await Bands.findOne({ where: { name: req.body.name } });

    const { name } = await banda.update({
      name: novoName,
    });

    return res.status(200).json({ mensagem: "Updated data!" });
  }
  async joinBand(req, res) {
    const schema = Yup.object().shape({
      band_id: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "invalid fields" });
    }
    const { band_id } = req.body;

    const user = await User.findOne({ where: { id: req.musicoId } });

    const jaRelac = await BandsUser.findAll({
      where: {
        band_id: band_id,
        user_id: req.musicoId
      }
    })

    console.log(jaRelac.length == 0)

    if(jaRelac.length != 0){
      return res.status(401).json({mensagem: "are you already in this band"})
    }

    const bandExist = await Bands.findOne({where: {id: band_id}})
    if(!bandExist){
      return res.status(401).json({mensagem: "This Code is not associated with any band"})
    }

    const { name } = await user.update({
      band_id: band_id,
    });

    await BandUser.create({
      band_id: band_id,
      user_id: req.musicoId
    });

    return res.status(200).json({ mensagem: "Joined the Band" });
  }

  async delete(req, res) {
    const banda = await Bands.findByPk(req.body.id);

    banda.destroy();

    return res.json({ mensagem: "Band excluded!" });
  }
}

module.exports = new BandaController();
