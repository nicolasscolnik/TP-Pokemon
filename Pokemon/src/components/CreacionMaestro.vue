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

const guardarMaestro = async () => {
  await cargarPokemones();
  console.log(maestroPokemon.value.pokemons)
  storeMaestro.setter(maestroPokemon)
  console.log("store: " + storeMaestro.value)
};

const cargarPokemones = async () => {
  try {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    const getRandomPokemonId = () => Math.floor(Math.random() * 151) + 1;

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

    <form>
      <label for="nombre">Nombre:</label>
      <input type="text" v-model="maestroPokemon.nombre" id="nombre" required>

      

      <router-link to="/BusquedaArena"><button @click="guardarMaestro">Guardar</button></router-link>
    </form>
    <button @click="guardarMaestro">pruebaLocal</button>
  </div>
  <div v-if="storeMaestro!==null">{{ storeMaestro }}</div>
</template>

<style scoped></style>