import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreMaestroPokemon = defineStore('maestroPokemon', {
  state: () => (
    {
      stamina: ref(0),
      poderAtaque: ref(0),
      poderCurar: ref(0),
      esTurno1: ref(true),
      swapDisponible: ref(0),
      identidad: ref(false),
    }),
  actions: {
    calcular(valor) {
      this.contador = this.contador + valor
    },
  },

})
