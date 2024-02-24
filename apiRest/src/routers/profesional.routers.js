const {Router} = require("express");
const router = Router();
const profesionalCtrl = require("../controller/profesional.controller"); 

router.get("/profesionals", profesionalCtrl.getProfesional);

router.post("/profesionals", profesionalCtrl.createProfesional);

// router.put("/profesionals", bookCtrl.updateBook);

router.delete("/profesionals", profesionalCtrl.deleteProfesional);

module.exports = router; 