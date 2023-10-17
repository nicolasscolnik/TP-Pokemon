<script setup>
import { ref } from 'vue';

const maestroPokemon = defineProps({
    nombre: ref(""),
    tuTurno: ref(true),
    pokemons: {
      type: Array,
      default: () => [null, null, null, null]
    },

})

const emit = defineEmits();

const emitLastimar = () => {
  emit('lastimar');
};

const emitCurar = () => {
  emit('curar');
};


</script>

<template>
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="./luchador.jpg" alt="Imagen luchador">
      <div class="card-body">
        <h5 class="card-title">{{ stamina }}</h5>
        <div v-if='esTurno1 && identidad'>
          <button @click="emitLastimar">Ataca!</button>
          <button @click="emitCurar">Curate!</button>
        </div>
  
      </div>
    </div>
  </template>
  
  <style scoped>
  .card-img-top {
    height: 100px;
    width: 100px;
  }
  </style>