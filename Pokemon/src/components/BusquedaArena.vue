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

const sonidoDesactivado = ref(false);
const toggleSonido = () => {
  sonidoDesactivado.value = !sonidoDesactivado.value;
};

</script>



<template>
  <audio class="audio" :autoplay="!sonidoDesactivado" loop :muted="sonidoDesactivado"
    src="/src/components/Media/Audio/Professor Oak.mp3"></audio>


  <video autoplay loop muted class="video-background">
    <source src="/src/components/Media/Video/Pikachu Pixel Animated Loop.mp4" type="video/mp4">
  </video>

  <img class="icono-sonido" :src="sonidoDesactivado ?  '/src/components/Media/Imagenes/musicOff.png': '/src/components/Media/Imagenes/musicOn.jpg'"
    alt="Icono Sonido" @click="toggleSonido" />

  <h1 class="cargando-mensaje"> CARGANDO</h1>

  <div class="wrapper">
    <div class="space">
      <div class="loading"></div>
    </div>
  </div>


  <!-- <div>{{ storeMaestro }}</div>
<div>{{ storeArena }}</div> -->
</template>

<style>
* {
  font-family: 'Press Start 2P', cursive;
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}


.cargando-mensaje {
  text-align: center;
  margin-top: 200px;
  color: rgb(0, 0, 0);
}

@keyframes loading {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.wrapper {

  border: 20px ridge #1754c5;
  padding: 4px;
  width: 500px;
  height: 75px;
  margin: 50px auto 50px auto;
  background: whitesmoke;
}

.space {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.loading {
  position: absolute;
  background-color: rgb(247, 204, 10);
  width: 100%;
  height: 100%;
  animation: loading 5s steps(40) infinite;
}

.icono-sonido {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: fixed;
  top: 75px;
  left: 10px;
  z-index: 1000;
  border-radius: 5px;
}
</style>