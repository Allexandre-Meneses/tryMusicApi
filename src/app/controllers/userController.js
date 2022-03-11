const express = require("express");
const Yup = require("yup");
const { password } = require("../../config/database");
const Bands = require("../models/Bands");
const User = require("../models/Users");
const app = express();
app.use(express.json());

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ["name", "password_hash"],
    });
    return res.status(200).json(user);
  }
  //Função para adicionar um Músico
  async store(req, res) {
    // esquema quer dizer esquema do bando de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "invalid fields" });
    }

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res
        .status(400)
        .json({ mensagem: "There is already an account associated with this email!" });
    }
    const { name, email, password_hash, band_id } = req.body;

    const user = await User.create({
      name: name,
      email: email,
      password_hash: password_hash,
      band_id,
    });

    return res.status(200).json({ name, email, password_hash, band_id });
  }

  async update(req, res) {
    const esquema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      passwordAntigo: Yup.string().min(6),
      password_hash: Yup.string()
        .min(6)
        .when("passwordAntigo", (passwordAntigo, field) =>
          passwordAntigo ? field.required() : field
        ), //validação condicional
      confirmarPassword: Yup.string().when(
        "passwordNovo",
        (password_hash, field) =>
          password_hash
            ? field.required().oneOf([Yup.ref("password_hash")])
            : field
      ), //validar o novo password
    });

    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "invalid fields" });
    }

    const user = await User.findOne({where: {name: req.body.name }});

    if (!user) {
      return res.status(404).json({ mensagem: "User not registered" });
    }

    await user.update(req.body);

    return res.status(200).json({ user });
  }

  async delete(req, res) {
    const esquema = Yup.object().shape({
      password: Yup.string().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "invalid fields" });
    }
    const { password } = req.body;

    const user = await User.findByPk(req.musicoId);

    if (!user) {
      return res.status(404).json({ mensagem: "unregistered musician" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ mensagem: "incorrect password" });
    }

    user.destroy({ where: { id: req.musicoId } });

    return res.json({ mensagem: "excluded musician" });
  }

  async joinBand(req, res) {
    const { band_id } = req.params;
    const { name, email, password_hash } = req.body;

    const band = await Bands.findByPk(band_id);
    const user = await User.findOne({where: {email: email}})
    
    if(user){
      return res.status(400).json({mensagem: "registered user"})
    }

    if(!band){
      return res.status(400).json({mensagem: "unregistered band"});
    }

    const userBand = await User.create({
      name,
      email,
      password_hash,
      band_id,
    });

    return res.status(200).json(userBand);
  }

  async updateBandUser(req, res){
    
  }
}


module.exports = new UserController();
