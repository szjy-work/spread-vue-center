<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="onClick">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p class=" text-pink-600">Click on the Vite and Vue logos to learn more</p>
</template>


<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const onClick = () => {
  count.value++;
  // 传参
  	window.parent.postMessage({
      type: 'count',
      count: count.value
    }, '*')
}


</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
