const express = require("express");
const Yup = require("yup");
const { password } = require("../../config/database");
const Band = require("../models/Bands");
const User = require("../models/Users");
const app = express();
app.use(express.json());

class MusicoController {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ["name", "password_hash"],
      /*include: [
        {
          model: Band,
          as: "banda",
          attributes: ["name"],
        },
      ],*/
    });
    return res.json(user);
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
      return res.status(400).json({ msg: "Campos Inválidos" });
    }

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res
        .status(400)
        .json({ mensagem: "Já existe uma conta associada a este email!" });
    }
    const { name, email, password_hash } = req.body;
    /*const { banda_id } = req.params;


        if (!banda_id) {
            res.json({ Msg: "Id não informado" });
        }*/
    //banda_id: banda_id
    const musico = await User.create({
      name: name,
      email: email,
      password_hash: password_hash,
    });

    return res.status(200).json({ Msg: "Usuário cadastrado!" });
  }

  async update(req, res) {
    const esquema = Yup.object().shape({
      novoName: Yup.string(),
      email: Yup.string().email(),
      passwordAntigo: Yup.string().min(6),
      passwordNovo: Yup.string()
        .min(6)
        .when("passwordAntigo", (passwordAntigo, field) =>
          passwordAntigo ? field.required() : field
        ), //validação condicional
      confirmarPassword: Yup.string().when(
        "passwordNovo",
        (passwordNovo, field) =>
          passwordNovo
            ? field.required().oneOf([Yup.ref("passwordNovo")])
            : field
      ), //validar o novo password
    });

    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "Campos invalidos" });
    }

    const { novoName, passwordNovo } = req.body;

    const musico = await User.findByPk(req.musicoId);

    if (!musico) {
      return res.status(404).json({ mensagem: "User não cadastrado" });
    }

    const { id, name, email } = await musico.update({
      name: novoName,
      password_hash: passwordNovo,
    });

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const esquema = Yup.object().shape({
      password: Yup.string().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "Campos invalidos" });
    }
    const { password } = req.body;

    const musico = await User.findByPk(req.musicoId);

    if (!musico) {
      return res.status(404).json({ mensagem: "Músico não cadastrado" });
    }

    if (!(await musico.checkPassword(password))) {
      return res.status(401).json({ mensagem: "password incorreto" });
    }

    musico.destroy({ where: { id: req.musicoId } });

    return res.json({ mensagem: "Músico excluido" });
  }
}

module.exports = new MusicoController();
