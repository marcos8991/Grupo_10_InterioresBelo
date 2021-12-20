const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models')
const { Op } = require('sequelize');
const { find } = require('../validations/loginValidator');





module.exports = {
    register: (req, res) => {
        return res.render('users/register')
    },


    //aca recibo los datos que me llegan por el formulario
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, email, password } = req.body;

            db.User.create({
                name: name.trim(),
                email: email.trim(),
                password: bcrypt.hashSync(password, 10),
                avatar: 'user-image.jpg',
                rolId: 1

            })
                .then(user => {
                    req.session.userLogin = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        rol: user.rolId,
                        email: user.email
                    }

                    console.log(user);
                    return res.redirect('/')

                })
        } else {
            return res.render('users/register', {
                errores: errors.mapped(),
                old: req.body
            })
        }
    },



    login: (req, res) => {
        return res.render('users/login')
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    rol: +user.rolId,
                    email: user.email
                }
                if (req.body.remember) {
                    res.cookie('interioresBelo', req.session.userLogin, { maxAge: 1000 * 60 })
                }
                return res.redirect('/')
            })


        } else {
            return res.render('users/login', {
                errores: errors.mapped()
            })
        }




    },

    logout: (req, res) => {
        req.session.destroy()

        res.clearCookie('interioresBelo')

        res.redirect('/')
    },

    profile: (req, res) => {
        db.User.findByPk(req.session.userLogin.id, {
            include: [{ all: true }]
        })
            .then(user => {
                /* return res.send(user) */
                return res.render('users/profile', {
                    user
                })
            })
            .catch(error => console.log(error))


    },

    update:async (req, res) => {
        let errors = validationResult(req);


        if (errors.isEmpty()) {
            const { name, password } = req.body;
            try {
                let user = await db.User.findOne({
                    where: {
                        email: req.session.userLogin.email
                    }
                })
                let passwordUser;
                if(password){
                    passwordUser = bcrypt.hashSync(password, 10)
                }else {
                    passwordUser = user.password
                }
                let userResult = await db.User.update({
                    name,
                    password: passwordUser,
                    avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
                },
                    {
                        where: {
                            id: req.session.userLogin.id
                        }
                    })
                req.session.userLogin = {
                    id: user.id,
                    name,
                    avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
                    rol: user.rol,
                    email: user.email,
                }
                if (req.file) {
                    if (fs.existsSync(path.join(__dirname, '../public/images/users/' + user.avatar)) && user.avatar != "user-image.jpg") {
                        fs.unlinkSync(path.join(__dirname, '../public/images/users/' + user.avatar))
                    }
                }
                return res.redirect('/')
            } catch (error) {
                console.log(error);
            }

        } else {
            try {
                let user =await db.User.findOne({
                    where: {
                        email: req.session.userLogin.email
                    }
                })
                return res.render('users/profile', {
                    user,
                    errores: errors.mapped()

                })
            } catch (error) {
                console.log(error);
            }
        }
    }
}