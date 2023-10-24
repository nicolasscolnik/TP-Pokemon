import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreArena = defineStore('arenaBatalla', {
    state: () => (
        {
            url: "",
            maestro1: ref({}),
            maestro2: ref({}),
        }),
    actions: {
        // calcular(valor) {
        //     this.contador = this.contador + valor
        // },
    },

})
