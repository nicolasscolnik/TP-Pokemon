<script setup>
import { ref } from 'vue'
import MaestroPokemon from './MaestroPokemon.vue'
import { useStoreMaestroPokemon } from '/stores/storeMaestroPokemon'

const storeMaestro = useStoreMaestroPokemon();

const maestroPokemon = ref({
  nombre: "",
  tuTurno: true,
  pokemons: []
});

function crearPokemon(nombreAPI, vidaAPI, ataqueAPI, defensaAPI, fotoAPI) {
  let poke = {
    nombre: nombreAPI,
    vida: vidaAPI,
    ataque: ataqueAPI / 10,
    defensa: defensaAPI / 10,
    foto: fotoAPI
  }
  return poke;
}

const guardarMaestro = () => {
  console.log(maestroPokemon.value);
  cargarPokemones();
  debugger
  storeMaestro.setter(maestroPokemon)
  console.log(storeMaestro)
};

// const cargarPokemones = async () => { // no funca, hay que revisar. No asigna el atributo pokemon al maestroPokemon
//   try {
//     const listaPokemons = [];
//     const cantPokemones = 4;
//     for (let i = 0; i < cantPokemones; i++) {
//       const randomId = Math.floor(Math.random() * 1008) + 1; // +1 para evitar el ID 0
//       const pokemonRandom = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`); // el await espera a que este todo correcto para poder añadir los pokemones.
//       const data = await pokemonRandom.json();
//       listaPokemons.push(pokemonRandom)
//       console.log(listaPokemons)
//     }

//     data.forEach((pokemon, index) => {
//       const { name, stats } = pokemon;
//       const hp = stats[0].base_stat; // HP es el stat en el índice 0
//       const attack = stats[1].base_stat; // Ataque es el stat en el índice 1
//       const Pokemon = new crearPokemon(name, hp, attack);
//       maestroPokemon.pokemons.push(Pokemon)
//     });
//     //este metodo nos da las variables destructuradas de cada pokemon.json, ahora hay que crear un metodo que cree pokemons(constructor pokemon) 
//     //que reciba los parametros (nombre, vida, ataque)
//   } catch (error) {
//     console.error('Error al cargar los Pokémones:', error);
//   }
// }

const cargarPokemones = async () => {
  try {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    const getRandomPokemonId = () => Math.floor(Math.random() * 151) + 1; // Genera un ID de Pokémon aleatorio entre 1 y 151.

    const pokemons = [];
    for (let i = 0; i < 4; i++) {
      const randomPokemonId = getRandomPokemonId();
      const response = await fetch(`${apiUrl}${randomPokemonId}`);
      const data = await response.json();
      const nuevoPokemon = crearPokemon(
        data.name,
        data.stats[0].base_stat,
        data.stats[1].base_stat,
        data.stats[2].base_stat,
        data.sprites.front_default
      );
      pokemons.push(nuevoPokemon);
    }
    maestroPokemon.value.pokemons = pokemons;
  } catch (error) {
    console.error("Error al obtener Pokémon:", error);
  }
};



</script>

<template>
  <div>

    <form @submit="guardarMaestro">
      <label for="nombre">Nombre:</label>
      <input type="text" v-model="maestroPokemon.nombre" id="nombre" required>

      <button type="submit">Guardar</button>

      <router-link to="/BusquedaArena">Elegir Arena</router-link>
    </form>
    <button @click="guardarMaestro">pruebaLocal</button>
  </div>
</template>

<style scoped></style>