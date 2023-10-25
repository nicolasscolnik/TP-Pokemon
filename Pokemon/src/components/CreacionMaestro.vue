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

function crearPokemon(nombre, hp, attack) {
  this.nombre = nombre;
  this.hp = hp;
  this.attack = attack;
}

const guardarMaestro = () => {
  debugger
  console.log(maestroPokemon.value);

  cargarPokemones();
  storeMaestro.setter(maestroPokemon);
};

const cargarPokemones = async () => { // no funca, hay que revisar. No asigna el atributo pokemon al maestroPokemon
  try {
   
    const listaPokemons = [];
    const cantPokemones = 4;
    for (let i = 0; i < cantPokemones; i++) {
      const randomId = Math.floor(Math.random() * 1008) + 1; // +1 para evitar el ID 0
      const pokemonRandom = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`); // el await espera a que este todo correcto para poder añadir los pokemones.
      listaPokemons.push(pokemonRandom)
    }
    
    const data = listaPokemons.json();
    data.forEach((pokemon, index) => {
      const { name, stats } = pokemon;
      const hp = stats[0].base_stat; // HP es el stat en el índice 0
      const attack = stats[1].base_stat; // Ataque es el stat en el índice 1
      const Pokemon = new crearPokemon(name, hp, attack);
      MaestroPokemon.pokemons.push(Pokemon)
    });
    //este metodo nos da las variables destructuradas de cada pokemon.json, ahora hay que crear un metodo que cree pokemons(constructor pokemon) 
    //que reciba los parametros (nombre, vida, ataque)
  } catch (error) {
    console.error('Error al cargar los Pokémones:', error);
  }
}



</script>

<template>

  <div>

    <form @submit="guardarMaestro">
      <label for="nombre">Nombre:</label>
      <input type="text" v-model="maestroPokemon.nombre" id="nombre" required>

      <button type="submit">Guardar</button>

      <router-link to="/BusquedaArena">Elegir Arena</router-link>
    </form>

  </div>
</template>

<style scoped></style>