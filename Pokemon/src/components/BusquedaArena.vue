<script setup>
import { ref } from 'vue'
import MaestroPokemon from './MaestroPokemon.vue'
import { useStoreMaestroPokemon } from '/stores/storeMaestroPokemon'
import { useStoreArena } from '../../stores/storeArena';

const storeMaestro = useStoreMaestroPokemon();
const storeArena = useStoreArena();
//crear metodo que busque si hay sala libre y la retorne o retorne una sala conmigo como jug1
//actualizar atributos: storeArena.url con la url de la sala // jug1(el otro o yo) y jug2 (yo o null)
//creacion de socketio

</script>
<template>
    estas en busqueda arena<br>
    -----------------
    <div>{{ storeMaestro }}</div>
    <div>{{ storeArena }}</div>
</template>