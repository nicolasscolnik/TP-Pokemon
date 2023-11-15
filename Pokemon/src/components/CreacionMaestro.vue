
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
<div class="gradient-background">
  <div class="logo-container">
    <img class="logo" src="./International_Pokémon_logo.svg.png" alt="" srcset="">
  </div>
  <div class="container-formulario">
    <form class="formulario">
      <label for="nombre">Nombre:</label>
      <br>
      <input type="text" v-model="maestroPokemon.nombre" id="nombre" required>
      <br>
      <router-link to="/BusquedaArena"><button @click="guardarMaestro">Guardar</button></router-link>
    </form>
    <br>
    <br>
  </div>
  <button @click="guardarMaestro">pruebaLocal</button>
  <div v-if="storeMaestro !== null">{{ storeMaestro }}</div>
</div>
</template>
<style scoped>
body{
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
.gradient-background {
  background: linear-gradient(300deg,deepskyblue,darkviolet,blue);
  background-size: 180% 180%;
  animation: gradient-animation 18s ease infinite;
}
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.logo-container {
  width: 100%;
  height: 100%;
  border: 2px solid black;
  margin-bottom: 10px;
}
.logo {
  width: 800px;
  height: 275px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-formulario {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding: 15px;
}
.formulario {
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 150px;
  border: 2px solid rgb(247, 243, 9);
  border-radius: 10px;
  text-align: center;
  background: white;
}
.formulario label{
  margin-top: 5px;
}
.formulario input{
  width: 250px;
  margin: 15px;
}
</style>
