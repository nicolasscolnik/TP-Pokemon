import { defineStore } from 'pinia'

export const useStoreMaestroPokemon = defineStore('maestroPokemon', {
    state: () => (
        { 
            mensaje: 'Este es el mensaje predefinido', 
            contador : 0
        }),
        actions: {
            calcular(valor) {
              this.contador = this.contador + valor
            },
          },

})