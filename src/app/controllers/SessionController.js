const User = require("../models/Users");
const jwt = require('jsonwebtoken')
const Yup = require("yup");

class SessionControler {

    async store(req, res) {

        const esquema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });
        if (!(await esquema.isValid(req.body))) {
            return res.status(400).json({ mensagem: "Campos invalidos" });
        }

        const { email, password } = req.body
        const musico = await User.findOne({ where: { email } });

        if (!musico) {
            return res.status(401).json({ error: "Usuario não Cadastrado" });
        }

        if (!(await musico.checkPassword(password))) {
            return res.status(401).json({ error: "Password Incorreto!" });
        }


        const { id, name } = musico;

        return res.json({
            musico: {
                name,
                email
            },
            token: jwt.sign({ id, name }, "textounico", {
                expiresIn: '1d'
            })
        })
    }
}

module.exports = new SessionControler();