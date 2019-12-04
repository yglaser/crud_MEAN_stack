
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/mean-crud';
mongoose.connect(uri)
    .then(db=>console.log('La base esta conectada'))
    .catch(err =>console.error(err));

module.exports = mongoose;
