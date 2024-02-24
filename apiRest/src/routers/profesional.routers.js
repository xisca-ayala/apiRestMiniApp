const {Router} = require("express");
const router = Router();
const profesionalCtrl = require("../controller/profesional.controller"); 

router.get("/profesionals", profesionalCtrl.getProfesional);

router.post("/profesionals", profesionalCtrl.createProfesional);

router.put("/profesionals", profesionalCtrl.updateProfesional);

router.delete("/profesionals", profesionalCtrl.deleteProfesional);

module.exports = router; 