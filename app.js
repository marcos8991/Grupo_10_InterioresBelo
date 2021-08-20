const express = require ('express');
const app = express();
const path = require ('path');
const port= 3030;

app.listen (port, ()=> console.log( 'Servidor corriendo en el puerto '+ port));
app.use (express.static('public'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/home', (req, res)=> res.sendFile(path.join(__dirname, 'views', 'index.html')))
app.get ('/login.html', (req, res)=> res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get ('/register.html', (req, res)=> res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get ('/productCart.html', (req, res)=> res.sendFile(path.join(__dirname, 'views', 'productCart.html')));
app.get ('/productDetail.html', (req, res)=> res.sendFile(path.join(__dirname, 'views', 'productDetail.html')));