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

const guardarMaestro = () => {
  debugger
  console.log(maestroPokemon.value);

  cargarPokemones();
  storeMaestro.setter(maestroPokemon);
};

const cargarPokemones = async () => {
  try {
   
    const api = await fetch('URL');  // METER URL API / el await espera a que este todo correcto para poder añadir los pokemones.
    
    if (!api.ok) {
      throw new Error('No se pudo ingresar a la api');
    }

    const data = await api.json();
    
    maestroPokemon.pokemons = data; // Añade los Pokémon a la lista

  } catch (error) {
    console.error('Error al cargar los Pokémones:', error);
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

  </div>
</template>

<style scoped></style>