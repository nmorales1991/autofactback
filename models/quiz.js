const mongoose = require('mongoose')

let Schema = mongoose.Schema


let quizSchema = new Schema({
    fecha:{
        type:Date,
        default: new Date()
    },
    usuario:{
        type: Schema.Types.Mixed,
        required:true
    },
    respuestas:{
        type:Array,
        required:true
    }
})


module.exports = mongoose.model('Quiz',quizSchema)