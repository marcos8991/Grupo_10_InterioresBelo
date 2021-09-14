const fs = require('fs');
const path = require('path');

module.exports = {
    productCart : (req,res) => {
        return res.render('productCart')
    },
    productDetail : (req,res) => {
        return res.render('productDetail')
    }
}