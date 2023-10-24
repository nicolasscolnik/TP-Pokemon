<script setup>
import { ref, defineEmits, onMounted } from 'vue';

// Esto sera usado como plantilla en ArenaDeBatalla
const maestroPokemon = defineProps({
  nombre: ref(""),
  tuTurno: ref(true),
  pokemons: ref([]),
  pokemonEnArena: ref({}),
  numeroJugador: ref()
})


// avisa de que esta usando el componente
const emit = defineEmits();

const emitLastimar = () => {
  emit('lastimar');
};

const mandarArena = (item) => {
  emit('horadeluchar', item);
}




</script>

<template>
  <div class="card" style="width: 18rem;">
    <h3 class="card-title">{{ nombre }}</h3>
    <img class="card-img-top" v-if="pokemonEnArena" :src="pokemonEnArena.foto" alt="No leyo la imagen">
    <div class="card-body">
      <h5 class="card-title">{{ pokemonEnArena.nombre }} -- {{ pokemonEnArena.vida }}</h5>
      <div>
        <label v-if="tuTurno">
          Tu turno: PELEA!!!
          <div class="container">
            <button @click="emitLastimar">Ataca!</button>
            <button @click="emitCurar">Curate!</button>
          </div>
        </label>

        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Pokemon</th>
                <th>Vida</th>
                <th>Ataque</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in pokemons" :key="index">
                <td>{{ item.nombre }}</td>
                <td>{{ item.vida }}</td>
                <td>
                  <button @click="mandarArena(item)">Elegir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>
  
<style scoped>
.card-img-top {
  height: 100px;
  width: 100px;
}
</style>