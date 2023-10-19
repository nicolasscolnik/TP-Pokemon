<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStoreMaestroPokemon } from '/stores/storeMaestroPokemon'
import { useStoreArena } from '/stores/storeArena'
import MaestroPokemon from './MaestroPokemon.vue'


// const SWAPS_PERMITIDOS = 1;


let pokemones1 = ref([]);
let pokemones2 = ref([]);
let pokemonEnArena1 = ref(null)
let pokemonEnArena2 = ref(null)
let esTurno1 = ref(true);
let jugador1 = ref(null);
let jugador2 = ref(null);
let datosPeleaActuales = ref({})
let datosSala = ref({})
const storeMaestro = useStoreMaestroPokemon();
const storeArena = useStoreArena();


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
    if (jugador1 != null) {
        jugador2 = ref(storeMaestro);
        pokemonEnArena2 = ref(storeMaestro.pokemonEnArena);
    } else {
        jugador1 = ref(storeMaestro);
        pokemonEnArena1 = ref(storeMaestro.pokemonEnArena);
    }

    console.log("jugador1: " + jugador1 + "---" + "jugador2: " + jugador2)
    // console.log(store.nombre)
    // console.log(jugador1.pokemons)
    // console.log(jugador2.value)
}

// const enviarPokemonALaArena = (pokemon) => {
//     debugger
//     const pokeAAsignar = pokemon;
//     // console.log(pokemon)
//     // console.log(pokemonEnArena2)
//     if (jugador2) {
//         jugador2.value.pokemons.push(pokemonEnArena2.value);
//         pokemonEnArena2.value = ref(jugador2.value.pokemons.pop(pokeAAsignar));
//         console.log(jugador2.value.pokemons)
//         console.log(pokemonEnArena2)
//     } else {
//         jugador1.pokemons.push(pokemonEnArena1.value);
//         pokemonEnArena1 = ref(jugador1.value.pokemons.pop(pokemon));
//     }
// };

// const enviarPokemonALaArena = (pokemon) => {
//     debugger;
//     const pokeAAsignar = pokemon;

//     if (jugador2.value) {
//         // Si jugador2.value existe
//         jugador2.value.pokemons.push(pokemonEnArena2.value); // Agrega pokemonEnArena2 al array de pokemons de jugador2
//         pokemonEnArena2.value = pokeAAsignar; // Asigna el nuevo valor a pokemonEnArena2
//         console.log(jugador2.value.pokemons);
//         console.log(pokemonEnArena2.value);
//     } else {
//         // Si jugador2.value no existe, asume que jugador1 es la referencia correcta
//         jugador1.pokemons.push(pokemonEnArena1.value);
//         pokemonEnArena1.value = pokeAAsignar;
//     }
// };

const enviarPokemonALaArena = (pokemon) => {
  debugger;
  const pokeAAsignar = pokemon;
  
  if (jugador2.value) {
    // Si jugador2.value existe
    const indice = jugador2.value.pokemons.indexOf(pokeAAsignar);
    if (indice !== -1) {
      jugador2.value.pokemons.splice(indice, 1); // Elimina el Pokémon del array de pokemons de jugador2
      storeMaestro.pokemonEnArena.value = ref(pokeAAsignar); // Asigna el nuevo valor a pokemonEnArena2
    }
    console.log(jugador2.value.pokemons);
    console.log(storeMaestro.pokemonEnArena.value);
  } else {
    // Si jugador2.value no existe, asume que jugador1 es la referencia correcta
    const indice = jugador1.value.pokemons.indexOf(pokeAAsignar);
    if (indice !== -1) {
      jugador1.value.pokemons.splice(indice, 1); // Elimina el Pokémon del array de pokemons de jugador1
      storeMaestro.pokemonEnArena.value = ref(pokeAAsignar);
    }
  }
};



onMounted(() => {
    settingLocal();
})


</script>
<template>
    <h4>Turno j1: {{ jugador1 }}</h4>
    <h4>Turno j2: {{ jugador2 }}</h4>
    <!-- <button type="button" class="btn btn-danger" @click="comienzaJuego">Comenzar!</button> -->
    <hr>
    <hr>
    <div class="luchadores-container">
        <MaestroPokemon @horadeluchar="enviarPokemonALaArena($event)" @lastimar="atacar(1)" @curar="curar(1)" nombre="Ash"
            :pokemons="storeMaestro.pokemons" :tuTurno="esTurno1" :pokemonEnArena="storeMaestro.pokemonEnArena">
            Luchador 1</MaestroPokemon>
        <MaestroPokemon @horadeluchar="enviarPokemonALaArena($event)" @lastimar="atacar(2)" @curar="curar(2)"
            nombre="La otra" :pokemons="storeMaestro.pokemons" :tuTurno="!esTurno1"
            :pokemonEnArena="storeMaestro.pokemonEnArena">
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
