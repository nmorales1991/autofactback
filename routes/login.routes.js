const express = require("express");
const app = express();
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

app.post('/', (req,res)=>{
    let {correo,clave} = req.body

    Usuarios.findOne({correo},(err,usuario)=>{

        if(!usuario){
            return res.status(400).send({
                ok:false,
                err:{
                    message:'Usuario y/o clave no válido' //user
                }
            })
        }

        if(!bcrypt.compareSync(clave,usuario.clave)){
            return res.status(400).send({
                ok:false,
                err:{
                    message:'Usuario y/o clave no válido' //pass
                }
            })
        }

        let token = jwt.sign({
            usuariobd:usuario
        },'secret',{expiresIn:'24h'})

        res.json({
            ok:true,
            usuariobd:usuario,
            token
        })



    })
})


module.exports = app