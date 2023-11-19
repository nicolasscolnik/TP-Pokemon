<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStoreMaestroPokemon } from '/stores/storeMaestroPokemon'
import { useStoreArena } from '/stores/storeArena'
import MaestroPokemon from './MaestroPokemon.vue'



let pokemones1 = ref([]);
let pokemones2 = ref([]);
let pokemonEnArena1 = ref(null)
let pokemonEnArena2 = ref(null)
let staminaArena1 = ref(null)
let staminaArena2 = ref(null)
let esMiTurno = ref(true);
let jugador1 = ref(null);
let jugador2 = ref(null);
let soyJugador = ref(0);
let mostrarComponentes = ref(false);
let datosPeleaActuales = ref({})
let datosSala = ref({})
const storeMaestro = useStoreMaestroPokemon();
const storeArena = useStoreArena();


const cambiaTurno = () => {
    esMiTurno.value = !esMiTurno.value;
    console.log(jugador1.value)
    console.log(jugador2.value)
    // Actualizar();
}


const atacar = (id) => {
    if (id == 1) {
        pokemonEnArena2.value.vida = pokemonEnArena2.value.vida - pokemonEnArena1.value.poderAtaque;
    } else {
        pokemonEnArena1.value.vida = pokemonEnArena1.value.vida - pokemonEnArena2.value.poderAtaque;
    }
    if (checkGanador()) {
        //Proponer buscar nuevo oponente, mandar a componente busquedaArena y reiniciar propiedades
        console.log("Hay ganador")
    }
    cambiaTurno();

}

const checkGanador = () => {
    if (pokemonEnArena2.value.vida <= 0) {
        let pokeActual = pokemonEnArena2.value;
        alert(pokemonEnArena2.value.nombre + ' IS KAPUTTTT!!!!');
        //sacar pokemon en arena del array
        if (pokemones2.value.length > 0) {
            enviarPokemonALaArena2(pokemones2.value[0], 2);
            pokemones2.value.pop(pokeActual);
        } else {
            alert('Acabo el juego SOQUETES!');
            return true;
        }

    } else if (pokemonEnArena1.value.vida <= 0) {
        let pokeActual = pokemonEnArena1.value;
        alert(pokemonEnArena1.value.nombre + ' IS KAPUTTTT!!!!');
        pokemonEnArena1 = ref();
        if (pokemones1.value.length > 0) {
            enviarPokemonALaArena2(pokemones1.value[0], 1);
            pokemones1.value.pop(pokeActual);
        } else {
            alert('Acabo el juego SOQUETES!');
            return true;
        }
    }
}

const checkVidaMax = (curacion, vidaActual) => (curacion + vidaActual) > 100 ? 100 : (curacion + vidaActual);


const curar = (id) => {
    if (id == 2) {
        pokemonEnArena2.value.vida = pokemonEnArena2.value.vida + pokemonEnArena2.value.poderCurar;
    } else {
        pokemonEnArena1.value.vida = pokemonEnArena1.value.vida + pokemonEnArena1.value.poderCurar;
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


const settingLocal = async () => {
    if (storeMaestro.numeroJugador === 2) {
        jugador2 = ref(storeMaestro);
        pokemones2 = ref(storeMaestro.pokemons)
        pokemonEnArena2 = ref(storeMaestro.pokemonEnArena);
        enviarPokemonALaArena(pokemones2.value[0]);
    } else {
        jugador1 = ref(storeMaestro);
        pokemonEnArena1 = ref(storeMaestro.pokemonEnArena);
        pokemones1 = ref(storeMaestro.pokemons)
        enviarPokemonALaArena(pokemones1.value[0]);
    }
    mostrarComponentes.value = true; // Activa la visualización de los componentes
    console.log("jugador1: " + jugador1.value + "---" + "jugador2: " + jugador2.value)
    // console.log(store.nombre)
    // console.log(jugador1.pokemons)
    // console.log(jugador2.value)
}

const montarStoreArena = () => {
    jugador1 = ref(storeArena.maestro1);
    jugador2 = ref(storeArena.maestro2);
}

const settingLocal2 = () => {
    montarStoreArena();
    pokemones1 = ref(jugador1.value.pokemons);
    pokemones2 = ref(jugador2.value.pokemons);
    pokemonEnArena1 = ref(jugador1.value.pokemonEnArena);
    pokemonEnArena2 = ref(jugador2.value.pokemonEnArena);
    soyJugador = ref(storeMaestro.numeroJugador);
    enviarPokemonALaArena2(pokemones2.value[0], 2);
    enviarPokemonALaArena2(pokemones1.value[0], 1);

    mostrarComponentes.value = true; // Activa la visualización de los componentes
}

const enviarPokemonALaArena2 = (pokemon, maestro) => {
    const pokeAAsignar = pokemon;

    if (maestro == 2) {
        const indice = jugador2.value.pokemons.indexOf(pokeAAsignar);
        if (indice !== -1) {
            jugador2.value.pokemons.splice(indice, 1);
            if (jugador2.value.pokemons.length != 3) { // Elimina el Pokémon del array de pokemons de jugador2
                jugador2.value.pokemons.push(pokemonEnArena2.value);
            }
            pokemonEnArena2.value = pokeAAsignar; // Asigna el nuevo valor a pokemonEnArena2
        }
    } else {
        // Si jugador2.value no existe, asume que jugador1 es la referencia correcta
        const indice = jugador1.value.pokemons.indexOf(pokeAAsignar);
        if (indice !== -1) {
            jugador1.value.pokemons.splice(indice, 1); // Elimina el Pokémon del array de pokemons de jugador1
            if (jugador1.value.pokemons.length != 3) {
                jugador1.value.pokemons.push(pokemonEnArena1.value);
            }
            pokemonEnArena1.value = pokeAAsignar;
        }
    }
};

// const enviarPokemonALaArena = (pokemon) => {
//     const pokeAAsignar = pokemon;

//     if (jugador2.value) {
//         // Si jugador2.value existe
//         const indice = jugador2.value.pokemons.indexOf(pokeAAsignar);
//         if (indice !== -1) {
//             jugador2.value.pokemons.splice(indice, 1);
//             if (jugador2.value.pokemons.length != 3) { // Elimina el Pokémon del array de pokemons de jugador2
//                 jugador2.value.pokemons.push(pokemonEnArena2.value);
//             }
//             pokemonEnArena2.value = pokeAAsignar; // Asigna el nuevo valor a pokemonEnArena2
//         }
//     } else {
//         // Si jugador2.value no existe, asume que jugador1 es la referencia correcta
//         const indice = jugador1.value.pokemons.indexOf(pokeAAsignar);
//         if (indice !== -1) {
//             jugador1.value.pokemons.splice(indice, 1); // Elimina el Pokémon del array de pokemons de jugador1
//             if (jugador2.value.pokemons.length != 3) {
//                 jugador1.value.pokemons.push(pokemonEnArena1.value);
//             }
//             pokemonEnArena1.value = pokeAAsignar;
//         }
//     }
// };



onMounted(() => {
    // const intervalo = setInterval(ObtenerValorSala, 2000)
    // ObtenerValorSala();
    settingLocal2();
})

const sonidoDesactivado = ref(false);
const toggleSonido = () => {
    sonidoDesactivado.value = !sonidoDesactivado.value;
};

</script>

<template>
    <audio class="audio" :autoplay="!sonidoDesactivado" loop :muted="sonidoDesactivado"
        src="/src/components/Media/Audio/Battle (Vs. Wild Pokémon).mp3"></audio>

    <video autoplay loop muted class="video-background">
        <source src="/src/components/Media/Video/Earth and Stars Animated Wallpaper [1080p Looping] [With DL] - Trim.mp4"
            type="video/mp4">
    </video>

    <img class="icono-sonido" :src="sonidoDesactivado ? '/src/components/Media/Imagenes/musicOff.png': '/src/components/Media/Imagenes/musicOn.jpg'"
        alt="Icono Sonido" @click="toggleSonido" />
    <!-- <h4>Turno J1= {{ esMiTurno }}</h4> -->

    <!-- <button type="button" class="btn btn-danger" @click="comienzaJuego">Comenzar!</button> -->
    <hr>
    <hr>
    <div class="luchadores-container">
        <MaestroPokemon v-if="mostrarComponentes && jugador1" @horadeluchar="enviarPokemonALaArena2($event, 1)"
            @lastimar="atacar(1)" @curar="curar(1)" nombre="Ash" :pokemons="pokemones1" :tuTurno="esMiTurno"
            :pokemonEnArena="pokemonEnArena1" :numeroJugador="1">
            Luchador 1</MaestroPokemon>
        <MaestroPokemon v-if="mostrarComponentes && jugador2" @horadeluchar="enviarPokemonALaArena2($event, 2)"
            @lastimar="atacar(2)" @curar="curar(2)" nombre="La otra" :pokemons="pokemones2" :tuTurno="!esMiTurno"
            :pokemonEnArena="pokemonEnArena2" :numeroJugador="2">
            Luchador 2</MaestroPokemon>
    </div>
</template>

<style scoped>
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

.luchadores-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
