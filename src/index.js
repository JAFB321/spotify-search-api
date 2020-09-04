const express = require('express');
const morgan = require('morgan');
require('dotenv').config();


const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get('/', (req, res) => {
    res.send('respuesta');
});

app.use('/search/', require('./routes/search'));

// Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});