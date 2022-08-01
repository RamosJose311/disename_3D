const express = require('express');
const app = express();
const path = require('path');
const serv = 3030;

app.use(express.static('public'));


app.get('/', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'inicio.html' )));
<<<<<<< HEAD
=======
app.get('/productCart.html', (req, res) => res.sendFile(path.resolve(__dirname ,'view','productCart.html' )));
app.get('/detalle.html', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'detalle.html' )));
app.get('/login.html', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'login.html' )));
app.get('/register.html', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'register.html' )));



>>>>>>> develop

app.listen(serv, () => console.log('Server runing in http://localhost:' + serv));



