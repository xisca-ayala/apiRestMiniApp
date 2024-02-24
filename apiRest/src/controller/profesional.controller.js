const {pool} = require("../database");
const Response = require("../model/response");
const Profesional = require("../model/profesional");
const errorHandling = require("../error/errorHandling");

function getProfesional (req, res) {
    let response = new Response (false, 200, "Éxito en el proceso de devolver los datos", null);
    if(req.query.name && req.query.lastName){
        Profesional.find({name: req.query.name, lastName: req.query.lastName})
        .then((profesional)=>{
            response.data = profesional;
            console.log(response);
            res.send(response);
        })
        .catch((err)=>{
            console.error(err);
            response.err = true; 
            response.message = "Fallo en el proceso de devolver los datos";
            response.code = 400; 
            res.send(response);
        })
    } else {
        Profesional.find()
        .then((profesional)=>{
            response.data = profesional;
            console.log(response);
            res.send(response);
        })
        .catch((err)=>{
            response.err = true;
            response.message = "Fallo en el proceso de devolver los datos"
            response.code = 400; 
            res.send(response);
        })
    }
}

function createProfesional (req, res){
    let response = new Response(false, 200, "Profesional creado con éxito", null);
    let profesional = new Profesional({
                    name: req.body.name, 
                    lastName: req.body.lastName,
                    age: req.body.age, 
                    wight: req.body.weight,
                    height: req.body.height,
                    isRetired: req.body.isRetired, 
                    nationality: req.body.nationality,
                    oscarNumber: req.body.oscarNumber,
                    profesion: req.body.profesion
    })
    profesional.save()
    .then((profesional)=>{
        response.data = profesional;
        console.log(response);
        res.send(response);
    })
    .catch((err)=>{
        response.message = "Fallo al intentar añadir datos";
        response.code = 500; 
        response.err = true; 
        console.error(err);
        res.send(response)
    })
}

function updateProfesional (req, res){
    let response = new Response(false, 200, "Profesional modificado con éxito", null);
    let profesional = new Profesional({
                    name: req.body.name, 
                    lastName: req.body.lastName,
                    age: req.body.age, 
                    weight: req.body.weight,
                    height: req.body.height,
                    isRetired: req.body.isRetired, 
                    nationality: req.body.nationality,
                    oscarNumber: req.body.oscarNumber,
                    profesion: req.body.profesion
    });
    const name = profesional.name;
    const lastName = profesional.lastName;
    Profesional.updateOne({name, lastName},
        {$set:{age: profesional.age, weight: profesional.weight, height: profesional.height,
                isRetired: profesional.isRetired, nationality: profesional.nationality,
                oscarNumber: profesional.oscarNumber, profesion: profesional.profesion}})
    .then((profesional)=>{
        response.data = profesional;
        console.log(response);
        res.send(response);
    })
    .catch((err)=>{
        response.message = "Fallo al intentar modificar datos";
        response.code = 500; 
        response.err = true; 
        console.error(err);
        res.send(response)
    })
}

function deleteProfesional(req,res){
    let response = new Response (false, 200, "Éxito en el proceso de eliminar los datos", null);
    const name = req.body.name;
    const lastName = req.body.lastName;
    Profesional.deleteOne({name, lastName})
    .then((data)=>{
        // if(data.n>0){
            console.log(response);
            res.send(response);
        // }else{
        //     console.error("No se encontro el profesional");
        //     response.code = 404;
        //     response.err= true; 
        //     response.message= "Error. NO se encontó el profesional";
        //     res.send(response);
        // }
    })
    .catch((err)=>{
        console.error(err);
        response.code = 500;
        response.err= true; 
        response.message= "Error al eliminar";
        res.send(response);
    })
}

module.exports = { getProfesional,
                createProfesional,
                updateProfesional,
                deleteProfesional
                 }