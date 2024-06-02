<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
//@ts-ignore
import CIA from '@/components/CIA.vue'
import UpcomingEvent from '@/components/UpcomingEvent.vue'
import MusicEvent from '@/components/MusicEvent.vue'
// @ts-ignore
import AcademicEvent from '@/components/AcademicEvent.vue'
// @ts-ignore
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col items-start justify-start">
    <NavigationBar
      @search="
        (e: Event) =>
          //@ts-expect-error
          console.log(e.target.elements[0].form[0].value)
      "
    />
    <CIA />
    <UpcomingEvent />
    <MusicEvent />
    <AcademicEvent />
    <Footer />
  </div>
</template>
