let mongoose = require("mongoose");

mongoose.connect('mongodb+srv://xiscaayala:Xismaygi86!@mongonube.e1bi7ij.mongodb.net/Profesionals')
.then((db)=>{
    console.log("database connected on " + db.connection.host)
})
.catch((err)=>{
    console.error(err);
})