const {Router} = require('express');
// const pool = require('../db')
const {getAllSongs ,createSongs, deleteSongs,  updateSongs} = require('../controllers/canciones.controllers')


const router = Router();

router.get("/", (req, res) => {
	
	  res.sendFile(__dirname + "/index.html");
	
  });
//leer todo los datos
router.get('/canciones', getAllSongs)

//leer dato una persona
// router.get('/canciones/:id', getSong)
//crear datos
router.post('/canciones', createSongs)

//eliminar datos 
router.delete('/canciones/:id', deleteSongs)

//actualizar 
router.put('/canciones/:id', updateSongs)
module.exports = router;