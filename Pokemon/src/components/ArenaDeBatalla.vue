<template>
    estas en arena de batalla
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStoreMaestroPokemon } from '/stores/storeMaestroPokemon'

const store = useStoreMaestroPokemon()
</script>