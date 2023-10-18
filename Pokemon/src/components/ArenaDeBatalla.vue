<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStoreMaestroPokemon } from '/stores/storeMaestroPokemon'
import MaestroPokemon from './MaestroPokemon.vue'

const store = useStoreMaestroPokemon()

// const SWAPS_PERMITIDOS = 1;
let pokemones1 = ref([]);
let pokemones2 = ref([]);
let esTurno1 = ref(true);
let juegoON = ref(true);
let jugador1 = ref(false);
let jugador2 = ref(false);

const cambiaTurno = () => {
    esTurno1 = !esTurno1;
    Actualizar();
}


const atacar = (id) => {
    if (id == 1) {
        stamina2.value = stamina2.value - poderAtaque1.value;
        console.log('ataco el 1')
    } else {
        stamina1.value = stamina1.value - poderAtaque2.value;
        console.log('ataco el 2')
    }
    if (checkGanador()) {
        setJuego();
    }
    cambiaTurno();

}

const checkGanador = () => {
    if (stamina1.value <= 0 || stamina2.value <= 0) {
        alert('Acabo el juego SOQUETES!');
        return true;
    }
    console.log('ok checkGanador')
}

const checkVidaMax = (curacion, vidaActual) => (curacion + vidaActual) > 100 ? 100 : (curacion + vidaActual);


const curar = (id) => {
    if (id == 1) {
        stamina1.value = checkVidaMax(poderCurar1.value, stamina1.value);
        datosPeleaActuales.value.luchador1.stamina1 = stamina1.value;
        console.log('se curo el 1')
    } else {
        stamina2.value = checkVidaMax(poderCurar2.value, stamina2.value);
        datosPeleaActuales.value.luchador1.stamina1 = stamina1.value;
        console.log('se curo el 2')
    }
    cambiaTurno();
}

let datosPeleaActuales = ref({})
let datosSala = ref({})

const Actualizar = () => {
    let jugador1Local = datosPeleaActuales.value.luchador1;
    let jugador2Local = datosPeleaActuales.value.luchador2;
    let turnoLocal = datosPeleaActuales.value.turno;
    let hayJ1Local = datosPeleaActuales.value.hayJ1;
    let hayJ2Local = datosPeleaActuales.value.hayJ2;

    const requestBody = {
        luchador1: jugador1Local,
        luchador2: jugador2Local,
        turno: turnoLocal,
        hayJ1: hayJ1Local,
        hayJ2: hayJ2Local
    };
}


const settingLocal = () => {
    // datosPeleaActuales.value.luchador1 = {
    //     stamina1: ref(stamina1),
    //     poderAtaque1: ref(poderAtaque1),
    //     poderCurar1: ref(poderCurar1),
    //     swap1: ref(swap1)
    // }

    // datosPeleaActuales.value.luchador2 = {
    //     stamina2: ref(stamina2),
    //     poderAtaque2: ref(poderAtaque2),
    //     poderCurar2: ref(poderCurar2),
    //     swap2: ref(swap2)
    // }
    // datosPeleaActuales.value.turno = ref(esTurno1);
    // console.log(datosPeleaActuales.value, esTurno1.value)
}

onMounted(() => {
    settingLocal()
})


</script>
<template>
    <h4>Turno j1: {{ jugador1 }}</h4>
    <h4>Turno j2: {{ jugador2 }}</h4>
    <button type="button" class="btn btn-danger" @click="comienzaJuego">Comenzar!</button>
    <hr>
    <hr>
    <div class="luchadores-container" v-if="juegoON">
        <MaestroPokemon @lastimar="atacar(1)" @curar="curar(1)" :pokemons="pokemones1" :esTurno1="!esTurno1"
            :identidad="jugador1">
            Luchador 2</MaestroPokemon>
        <MaestroPokemon @lastimar="atacar(2)" @curar="curar(2)" :pokemons="pokemones2" :esTurno1="!esTurno1"
            :identidad="jugador2">
            Luchador 2</MaestroPokemon>
    </div>
</template>

<style scoped>
.luchadores-container {
    display: flex;
    justify-content: space-between;
    /* Distribuye los elementos a lo largo del contenedor */
    align-items: center;
    /* Centra verticalmente los elementos */
}
</style>
