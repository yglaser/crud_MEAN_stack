const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const {mongoose} = require('./database');


//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
//cors se usa para conectar con angular, en caso de usar otro framework / libreria podrias obviarlo.
app.use(cors({origin:'http://localhost:4200'}));

//routes
app.use(require('./routes/contact.routes'));

//Starting server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});


