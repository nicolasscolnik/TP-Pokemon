import { defineStore } from 'pinia'
import { ref } from 'vue'

let pokemonPrueba = {
  nombre: 'Pijachu',
  vida: 100,
  poderAtaque: 13,
  poderCurar: 2,
  foto: 'https://th.bing.com/th/id/R.be7dc5ce53cfa8a81d01d3389d194903?rik=SH9njK8P321gqA&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fsonicpokemon%2fimages%2f7%2f77%2fPikachu.png%2frevision%2flatest%3fcb%3d20120603213349&ehk=ipA4OTui5sjoeVIZxv8%2fBvXtxKJaA1fZqMrQx8874GM%3d&risl=&pid=ImgRaw&r=0',
}

let pokemonPrueba2 = {
  nombre: 'Squirtle',
  vida: 66,
  poderAtaque: 3,
  poderCurar: 22,
  foto: 'https://mestrepokemon.com/wp-content/uploads/2019/11/Squirtle-Pok%C3%A9dex.jpg',
}

let pokemonPrueba3 = {
  nombre: 'Snorlax',
  vida: 99,
  poderAtaque: 1,
  poderCurar: 11,
  foto: 'https://img.pokemondb.net/artwork/large/snorlax.jpg',
}

let pokemonPrueba4 = {
  nombre: 'Mewtwo',
  vida: 54,
  poderAtaque: 19,
  poderCurar: 21,
  foto: 'https://th.bing.com/th/id/OIP.rjV2ZlpsV2kqCOLD5W4bOQHaHa?pid=ImgDet&rs=1',
}



export const useStoreMaestroPokemon = defineStore('maestroPokemon', {
  state: () => (  
    { nombre: ref("holis"),
    tuTurno: ref(true),
    pokemons: ref([pokemonPrueba, pokemonPrueba2, pokemonPrueba3, pokemonPrueba4]),
    pokemonEnArena: ref(pokemonPrueba),
    numeroJugador: ref(2)
    }),
  actions: {
    setter : (objeto) => {
      nombre = objeto.nombre;
      pokemons = objeto.pokemons;
      pokemonEnArena = pokemons[0];
    },
  },

})
