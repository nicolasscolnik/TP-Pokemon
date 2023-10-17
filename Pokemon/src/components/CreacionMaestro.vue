<script setup>
import { ref } from 'vue'
import MaestroPokemon from './MaestroPokemon.vue'

const MaestroPokemon = ref({
  nombre: ref(""),
  tuTurno: ref(true),
  pokemons: ref([])
});

const guardarMaestro = () => {

  console.log(MaestroPokemon.value);

  router.push('/BusquedaArena');
};
</script>

<template>
  <div>
    <form @submit="guardarMaestro">
      <label for="nombre">Nombre:</label>
      <input type="text" v-model="MaestroPokemon.nombre" id="nombre" required>

      <label for="pokemon1">Pokemon1:</label>
      <input type="text" v-model="MaestroPokemon.Pokemon1" id="pokemon1" required>

      <label for="pokemon2">Pokemon2:</label>
      <input type="text" v-model="MaestroPokemon.Pokemon2" id="pokemon1" required>

      <label for="pokemon3">Pokemon3:</label>
      <input type="text" v-model="MaestroPokemon.Pokemon3" id="pokemon1" required>

      <button type="submit">Guardar</button>

      <router-link to="/BusquedaArena">Elegir Arena</router-link>
    </form>
  </div>
</template>

<style scoped></style>