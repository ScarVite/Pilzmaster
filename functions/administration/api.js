const express = require('express');
const game1 = require('./game1.json');
const body_parser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(body_parser.json());
let gamenumber = 1;

app.listen(1001);

app.post('/api/pilzmaster', (req, res) => {
    console.log('Anfrage is DA');
});

app.get('/api/pilzmaster', (req,res) => {
    let answer = 'game' + req.query.game;
    res.json(answer);
})
