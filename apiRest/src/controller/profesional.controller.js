const {pool} = require("../database");
const Response = require("../model/response");
const Profesional = require("../model/profesional");
const errorHandling = require("../error/errorHandling");

function getProfesional (req, res) {
    let response = new Response (false, 200, "Éxito en el proceso de devolver los datos", null);
    if(!req.query.name){
        Profesional.find({})
        .then((profesional)=>{
            console.log(profesional);
            response.data = profesional;
        })
        .catch((err)=>{
            console.error(err);
            response.err = true; 
            response.message = "Fallo en el proceso de devolver los datos";
            response.code = 400; 
            res.send(response);
        })
    } else {
        Profesional.findById(req.query.name)
        .then((profesional)=>{
            console.log(profesional);
            response.data = profesional;
        })
        .catch((err)=>{
            console.log(err);
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
        console.log(profesional);
        response.data = profesional;
        res.send(response)
    })
    .catch((err)=>{
        response.message = "Fallo al intentar añadir datos";
        response.code = 400; 
        response.err = true; 
        console.error(err);
        res.send(response)
    })
}

const updatePhotosDesc = (user, description, new_description)=> {
    Photos.updateOne({user,description},
    {$set:{description:new_description, verified: false}})
     .then((data)=>{
         console.log("Se ha modificado correctamente");
         console.log(data);
    })
     .catch((err)=>{
         console.error(err);
     })
}

function updateProfesional (req, res){
    let response = new Response(false, 200, "Profesional creado con éxito", null);
    let profesional = new Profesional({
                    name: req.body.name, 
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
        console.log(profesional);
        response.data = profesional;
        res.send(response)
    })
    .catch((err)=>{
        response.message = "Fallo al intentar añadir datos";
        response.code = 400; 
        response.err = true; 
        console.error(err);
        res.send(response)
    })
}



function deleteProfesional(req,res){
    let response = new Response (false, 200, "Éxito en el proceso de eliminar los datos", null);
    Profesional.deleteOne({name: req.body.name})
    .then((data)=>{
        if(data.n>0){
        console.log("Se ha eliminado correctamente el profesional");
        console.log(data);
        res.send(response);
        }else{
            console.error("No se encontro el profesional");
            response.code = 404;
            response.err= true; 
            response.message= "Error. NO se encontó el profesional";
            res.status(404).send(response);
        }
    })
    .catch((err)=>{
        console.error(err);
        response.code = 400;
        response.err= true; 
        response.message= "Error al eliminar";
        res.status(400).send(response);
    })
}

module.exports = { getProfesional,
                createProfesional,
                // updateBook,
                deleteProfesional
                 }