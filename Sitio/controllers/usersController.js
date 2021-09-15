const fs = require('fs');
const path = require('path');

module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },
    login : (req,res) => {
        return res.render('users/login')
    },
    admin : (req,res) => {
        return res.render('users/admin')
    }
}