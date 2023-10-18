<script setup>
import { ref, defineEmits, onMounted } from 'vue';

// Esto sera usado como plantilla en ArenaDeBatalla
const maestroPokemon = defineProps({
  nombre: ref(""),
  tuTurno: ref(true),
  pokemons: ref([])
})


// avisa de que esta usando el componente
const emit = defineEmits();

const emitLastimar = () => {
  emit('lastimar');
};

const mandarArena = () => {
  emit('horadeluchar')
}



</script>

<template>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src={pokemon} alt="Imagen Pokemon">
    <div class="card-body">
      <h5 class="card-title">{{ nombre }}</h5>
      <div>
        <label v-if="tuTurno">
          Tu turno: PELEA!!!
        </label>

        <div>
        <table>
            <thead>
                <tr>
                    <th>Pokemon</th>
                    <th>Vida</th>
                    <th>Ataque</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in pokemons" :key="index">
                    <td>{{ item.pokemon.nombre }}</td>
                    <td>{{ item.pokemon.vida }}</td>
                    <td>{{ item.pokemon.foto }}</td>
                    <td>
                        <button @click="mandarArena(item)">Luchar</button>
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