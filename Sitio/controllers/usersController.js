const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const db = require('../database/models')
const { Op } = require('sequelize');
const { find } = require('../validations/loginValidator');





module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },


    //aca recibo los datos que me llegan por el formulario
    processRegister : (req,res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const {name,email,password} = req.body;

            db.User.create({
                name : name.trim(),
                email : email.trim(),
                password : bcrypt.hashSync(password,10),
                avatar : 'user-image.jpg',
                rolId : 1
                
            })
                .then (user =>{
                    req.session.userLogin = {
                        id : user.id,
                        name : user.name,
                        avatar : user.avatar,
                        rol : user.rolId
                    }

                    console.log(user);
                    return res.redirect('/')

                })   
        }else{
            return res.render('users/register',{
                errores : errors.mapped(),
                old : req.body
            })
        }
    },



    login : (req,res) => {
        return res.render('users/login')
    },

    processLogin : (req,res) =>  {
        let errors = validationResult(req);

          let email = db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user=>{
              if(user && bcrypt.compareSync(req.body.password,user.password)){
                req.session.userLogin = {
                    id: user.id,
                    name : user.name,
                    avatar : user.avatar,
                    rol : user.rolId
                }
                return res.redirect('/')
              }
               if(req.body.remember){
                res.cookie('interioresBelo',req.session.userLogin,{maxAge : 1000 * 60})
            }
            return res.redirect('/') 
          })
        
            
            
        
    },

    logout : (req,res) => {
        req.session.destroy()

        res.clearCookie('interioresBelo')

        res.redirect('/')
    },
    
    profile : (req,res) => {
        db.User.findOne({
            where :{
                id: req.session.userLogin.id
            }
        })
        .then(user=>{
            res.render('users/profile',{
                user
            })
        })
        .catch(error => console.log(error))

        
    },

    update: (req,res) => {

        let errors = validationResult(req);
       
        if (errors.isEmpty()) {
            const {name,password} = req.body;

            db.User.update({
                name : name,
                password : bcrypt.hashSync(password,10)
        },
        {
            where: {
                id: req.session.userLogin.id
            }
        }).then( () =>{
            db.User.findOne({
                where : {
                    id: req.session.userLogin.id
                }
            }).then(user => {
                req.session.userLogin = {
                    id: user.id,
                    name : user.name,
                    avatar : user.avatar,
                    rol : user.rol
                }
                return res.redirect('/')
            })
            
            
        })
        .catch(error => console.log(error))
        
    } else {
        return res.render('users/profile', {
            
            errores : errors.mapped()

        })
        
    } 
    
    }
}