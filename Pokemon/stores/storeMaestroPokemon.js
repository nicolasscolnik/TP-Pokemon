import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreMaestroPokemon = defineStore('maestroPokemon', {
  state: () => (
    { nombre: ref(""),
      pokemons: ref([])
    }),
  actions: {
    calcular(valor) {
      this.contador = this.contador + valor
    },
  },

})
