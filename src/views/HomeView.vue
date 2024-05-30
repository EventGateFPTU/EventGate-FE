<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
//@ts-expect-error
import CIA from '@/components/CIA.vue'
</script>

<template>
  <div class="flex h-screen flex-col items-start justify-start">
    <NavigationBar
      @search="
        (e: Event) =>
          //@ts-expect-error
          console.log(e.target.elements[0].form[0].value)
      "
    />
    <CIA />
  </div>
</template>
