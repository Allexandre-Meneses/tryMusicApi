const User = require("../models/Users");
const jwt = require('jsonwebtoken')
const Yup = require("yup");
const config = require('../../config/auth');

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
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Usuario não Cadastrado" });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password Incorreto!" });
        }


        const { id, name } = user;

        return res.json({
            user: {
                name,
                email
            },
            token: jwt.sign({ id, name }, config.secret, {
                expiresIn: config.dataLimite
            })
        })
    }
}

module.exports = new SessionControler();