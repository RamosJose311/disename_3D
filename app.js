const express = require('express');
const app = express();
const path = require('path');
const serv = 3030;

app.use(express.static('public'));


app.get('/', (req, res) => res.sendFile(path.resolve(__dirname ,'view','home.html')));
app.get('/productCart.html', (req, res) => res.sendFile(path.resolve(__dirname ,'view','productCart.html' )));



app.listen(serv, () => console.log('Server runing in http://localhost:' + serv));













app.get('/detalle', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'detalle.html' )));

<<<<<<< HEAD
app.listen(serv, () => console.log('Server runing in http://localhost:' + serv));



app.get('/inicio', (req, res) => res.sendFile(path.resolve(__dirname , 'view', 'inicio.html' )));
=======
>>>>>>> 8432ea0d4b9e53ee00daa180aa5bd5a8d2f85094
