import { defineStore } from 'pinia'
import { ref } from 'vue'

let pokemonPrueba = {
  nombre: 'Pijachu',
  vida: 1,
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

let pokemonPrueba5 = {
  nombre: 'Charmander',
  vida: 34,
  poderAtaque: 19,
  poderCurar: 21,
  foto: 'https://2.bp.blogspot.com/-YMnfsQraeuE/VuIOKuBbb1I/AAAAAAAAAA8/AG1NfoINH0Yr7gM2W76G-sWjgOmZe6vuw/s1600/004Charmander_Pokemon_Mystery_Dungeon_Explorers_of_Sky.png',
}

let pokemonPrueba6 = {
  nombre: 'Tortoise',
  vida: 93,
  poderAtaque: 11,
  poderCurar: 3,
  foto: 'https://i.pinimg.com/736x/a4/71/e9/a471e9d7d2de13399187d78ee2e75d0e.jpg',
}

let pokemonPrueba7 = {
  nombre: 'Raichu',
  vida: 57,
  poderAtaque: 22,
  poderCurar: 22,
  foto: 'https://pm1.narvii.com/6257/83efa4e5ec7257e856072062e96d8134b69afd20_hq.jpg',
}

let pokemonPrueba8 = {
  nombre: 'Oshawott',
  vida: 34,
  poderAtaque: 19,
  poderCurar: 21,
  foto: 'https://th.bing.com/th/id/R.0bd5bd56702f4e6984fc0ad1545d4a8a?rik=mwsAqqw7HkLKhA&pid=ImgRaw&r=0',
}

export const useStoreArena = defineStore('arenaBatalla', {
  state: () => (
    {
      url: "",
      maestro1: ref({
        nombre: ref("holis"),
        tuTurno: ref(true),
        pokemons: ref([pokemonPrueba, pokemonPrueba2, pokemonPrueba3, pokemonPrueba4]),
        pokemonEnArena: ref(pokemonPrueba),
        numeroJugador: ref(1)
      }),
      maestro2: ref({
        nombre: ref("holis"),
        tuTurno: ref(true),
        pokemons: ref([pokemonPrueba5, pokemonPrueba6, pokemonPrueba7, pokemonPrueba8]),
        pokemonEnArena: ref(pokemonPrueba7),
        numeroJugador: ref(2)
      }),
    }),
  actions: {
    // calcular(valor) {
    //     this.contador = this.contador + valor
    // },
  },

})
