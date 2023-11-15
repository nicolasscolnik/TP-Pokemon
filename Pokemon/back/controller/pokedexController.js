import { Pokedex } from "../Models/index.js";

class PokedexController {
  constructor() { }
  getAllPokedex = async (req, res) => {
    try {
      const pokedex = await Pokedex.findAll({ attributes: ["id", "name", "lastName", "mail"] });
      res.status(200).send({
        success: true,
        message: "Todos los roles que hay",
        data: pokedex,
      });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getPokedexById = async (req, res) => {
    try {
      const { id } = req.params;
      const pokedex = await Pokedex.findOne({
        where: { id },
        attributes: ["id", "name", "lastName", "mail"],
      });

      if (!user) throw new Error("No hay user con ese id");

      res.status(200).send({
        success: true,
        message: "User con id: " + id,
        data: pokedex,
      });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createPokedex = async (req, res) => {
    try {
      const { name, lastName, mail } = req.body;
      //  if (!name) throw new Error("El name no puede estar vacio");
      //  console.log(`🚀 ~ RoleController ~ createRole= ~ name:`, name);
      const pokedex = await Pokedex.create({ name, lastName, mail });
      if (!pokedex) throw new Error("El user no puede estar vacio");

      res
        .status(200)
        .send({ success: true, message: "pokedex creado", data: pokedex });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updatePokedex = async (req, res) => {
    try {
      const { name, lastName, mail } = req.body;
      const { id } = req.params;
      const pokedex = await Pokedex.update(
        { name, lastName, mail },
        {
          where: { id },
        }
      );
      if (pokedex[0] === 0) throw new Error("no se modifico nada");
      res
        .status(200)
        .send({ success: true, message: "pokedex modificado", data: pokedex });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deletePokedex = async (req, res) => {
    try {
      const { name, lastName, mail } = req.body;
      const pokedex = await Pokedex.destroy({
        where: { name, lastName, mail }
      });
      res
        .status(200)
        .send({ success: true, message: "User " + pokedex + " borrado", data: pokedex });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}


export default PokedexController;
