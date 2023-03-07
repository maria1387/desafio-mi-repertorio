const fs = require("fs");


const prueba = async (req, res) => {
	res.sendFile(__dirname + "/client/index.html");
  };
// leer
const getAllSongs = async (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(canciones);
};
// const getSongs = async (req, res) => {
// 	try {
// 		const { id } = req.params;
	
// 		const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
// 		const index = canciones.findIndex((cancion) => cancion.id === parseInt(id))
// }
// }

//crear 
const createSongs = async (req, res) => {
  try {
    const cancion = req.body;
    console.log(cancion);

    if (Object.values(cancion).some((value) => value === "")) {
      return res.status(400).json({ message: "Falta completar un campo " });
    }

    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    fs.writeFileSync(
      "repertorio.json",
      JSON.stringify([...canciones, cancion])
    );
    res.send("cancion agregada");
  } catch (error) {
    res.json({ message: "El recurso no esta disponible " });
  }
};
//Eliminar 
const deleteSongs = async (req, res) => {
  try {
    const { id } = req.params;

    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    const index = canciones.findIndex((cancion) => cancion.id === parseInt(id));

    console.log(index);

    if (index === -1) {
      return res.status(404).json({
        message: "El recurso que desea eliminar no se encuetra en la lista",
      });
    }

    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("cancion eliminada");
  } catch (error) {
    res.json({ message: "El recurso no esta disponible " });
  }
};

//actualizar 
const updateSongs = (req, res) => {
	try {
	  const { id } = req.params;
	  const cancion = req.body;
  
	  if (Object.values(cancion).some((value) => value === "")) {
		return res.status(400).json({ message: "Falta completar un campo " });
	  }
  
	  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
	  const index = canciones.findIndex((cancion) => cancion.id === parseInt(id));
	  console.log(index);
	  if (index === -1) {
		return res
		  .status(404)
		  .json({ message: "no se encuetra la cancion en la lista" });
	  }
  
	  canciones[index] = cancion;
  
	  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
	  res.send("cancion actualizada");
	} catch (error) {
	  res.json({ message: "El recurso no esta disponible " });
	}
  }
module.exports = {
  getAllSongs,
  createSongs,
  deleteSongs,
  updateSongs,
  prueba,
};
