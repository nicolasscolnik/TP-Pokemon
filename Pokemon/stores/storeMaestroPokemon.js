import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreMaestroPokemon = defineStore('maestroPokemon', {
  state: () => (
    {
      nombre: ref(""),
      tuTurno: ref(true),
      pokemons: ref({}),
      pokemonEnArena: ref({}),
      numeroJugador: ref(2)
    }),
  actions: {
    setter(objetoParam) {
      let objeto = objetoParam.value
      this.nombre = objeto.nombre;
      this.pokemons.value = objeto.pokemons;
      this.pokemonEnArena = this.pokemons.value[0];
    },
    getNombreJugador() {
      return this.nombre.value;
    },
  },

})
