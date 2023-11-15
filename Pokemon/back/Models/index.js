import Sala from "./Sala.js";
import User from "./User.js";
import Pokemon from "./Pokemon.js";
import Pokedex from "./Pokedex.js";

Sala.hasMany(User, {
     foreignKey: 'salaId',
});
User.belongsTo(Sala, {
     foreignKey:"salaId"
});

User.hasOne(Pokedex, {
     foreignKey: 'pokedexId',
});
Pokedex.belongsTo(User, {
     foreignKey:"pokedexId"
});

export { Sala, User, Pokedex, Pokemon };