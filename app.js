const express = require('express');
const app = express();
const path = require('path');
const serv = 3030;

app.use(express.static('public'));


app.get('/', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'home.html' )));

app.listen(serv, () => console.log('Server runing in http://localhost:' + serv));













app.get('/detalle', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'detalle.html' )));

