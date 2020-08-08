const express = require("express");
const app = express();
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const { verificarToken , verificaRol } = require("../middlewares/autenticacion");

app.get("/", [verificarToken,verificaRol], async (req, res) => {
    await Usuarios.find((err, usuarios) => {
        res.json({
            usuarios
        });
    });
});

app.post("/", (req, res) => {
    let {correo,clave,rol} = req.body;
    
    Usuarios.findOne({correo}).then(user=>{
        if(user){
            return res.send('Usuario ya existe')
        }
        Usuarios.create({
            correo,
            rol,
            clave: bcrypt.hashSync(clave, 10),
        }).then((usuario)=>{
            res.send({mensaje:'usuario creado', usuario})
        }).catch(err=>{
           
            return res.status(500).json({
                err
            });
            
        })
    })
  });

module.exports = app;
