const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

let users = require(path.join(__dirname,'../data/users.json'))



module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },


    //aca recibo los datos que me llegan por el formulario
    processRegister : (req,res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const {name,email,password} = req.body;
        
            let user = {
                id : users.length != 0 ? users[users.length - 1].id + 1 : 1,
                name : name.trim(),
                email : email.trim(),
                password : bcrypt.hashSync(password,10),
                avatar : 'user-image.jpg',
                rol : 'user'
    
            }
            users.push(user);
    
            fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(users,null,3),'utf-8');


            req.session.userLogin = {
                id : user.id,
                name : user.name,
                avatar : user.avatar,
                rol : user.rol
            }
    
            return res.redirect('/')
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

        if (errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email);
            req.session.userLogin = {
                id : user.id,
                name : user.name,
                avatar : user.avatar,
                rol : user.rol
            }
            if(req.body.remember){
                res.cookie('interioresBelo',req.session.userLogin,{maxAge : 1000 * 60})
            }
            return res.redirect('/')
        }else{
            return res.render('users/login',{
                errores : errors.mapped()
            })
        }

        
    },

    logout : (req,res) => {
        req.session.destroy()

        res.clearCookie('interioresBelo')

        res.redirect('/')
    },
    
    profile : (req,res) => {
        let users = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/users.json'),'utf-8'));

        res.render('users/profile',{
            user : users.find(user => user.id === req.session.userLogin.id)
        })
    },

    update : (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = users.find(user => user.id === req.session.userLogin.id)
            let hashPass = req.body.password ? bcrypt.hashSync(req.body.password,10) : user.password;
            
            let userModified = {
                id : user.id,
                name : req.body.name,
                email : user.email,
                password : hashPass,
                avatar : req.file ? req.file.filename : user.avatar,
                rol : user.rol
        }

        let usersModified = users.map(user => user.id === req.session.userLogin.id ? userModified : user)

        fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(usersModified,null,3),'utf-8')
    
        req.session.userLogin = {
            id : user.id,
            name : userModified.name,
            avatar : userModified.avatar,
            rol : user.rol
        }

        return res.redirect('/')
        
    } else {
        return res.render('users/profile', {
            
            errores : errors.mapped()

        })
        
    } 
    
    }
}