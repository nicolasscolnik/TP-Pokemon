<script setup>
import { ref, onMounted } from 'vue'
import MaestroPokemon from './MaestroPokemon.vue'
import { useStoreMaestroPokemon } from '/stores/storeMaestroPokemon'
import { useStoreArena } from '../../stores/storeArena';

const storeMaestro = useStoreMaestroPokemon();
const storeArena = useStoreArena();
//crear metodo que busque si hay sala libre y la retorne o retorne una sala conmigo como jug1
//actualizar atributos: storeArena.url con la url de la sala // jug1(el otro o yo) y jug2 (yo o null)
//creacion de socketio
// const buscarArena = (storeMaestro) => {
//     fetch("http://localhost:8080/api/salas/salaAvailable/")
//     method: "POST",
//     body: JSON.stringify(storeMaestro);
// }

const buscarArena = async () => {
  try {
    const apiUrl = "http://localhost:8080/api/salas/salaAvailable/";

    await fetch(apiUrl, {
        mode: 'no-cors',
        method: 'POST', 
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(storeMaestro)
    })
    alert("hasta linea 28 OK!")
    console.log(storeMaestro)
  } catch (error) {
    console.error("Error al obtener Pokémon:", error);
  }
};
onMounted(() => {
    buscarArena();
})

</script>
<template>
    estas en busqueda arena<br>
    -----------------
    <div>{{ storeMaestro }}</div>
    <div>{{ storeArena }}</div>
</template>