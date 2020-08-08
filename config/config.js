const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/autofact', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

module.exports=mongoose