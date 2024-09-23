<template>
  <DefaultLayout :has-footer="false" :has-user-indicator="true">
    <div class="event-promo">
      <div class="movie-banner-carousel">
        <Carousel :value="movieBanners" :numVisible="1" :numScroll="1" :autoplayInterval="5000">
          <template #item="slotProps">
            <div class="relative group">
              <img :src="slotProps.data.image" alt="Movie Banner" class="w-full h-[800px] object-cover carousel-image" />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block">
                <h2 class="text-4xl font-bold text-white mb-2">{{ slotProps.data.title }}</h2>
                <p class="text-xl text-white">{{ slotProps.data.description }}</p>
              </div>
            </div>
          </template>
        </Carousel>
      </div>

      <div class="ticket-carousel">
        <Carousel :value="tickets" :numVisible="5" :numScroll="1">
          <template #item="slotProps">
            <div class="ticket-frame group"> 
              <img :src="slotProps.data.image" alt="Event" class="ticket-image carousel-image" />
              <div class="ticket-content absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6   hidden group-hover:block"> 
                <h2>{{ slotProps.data.title }}</h2>
              </div>  
            </div>
          </template>
        </Carousel>
      </div>


<!-- Decorative Section -->
<div class="decorative-section ">
  <div class="wave absolute bottom-0 left-0 w-full h-[500px]  bg-[#D6F6FF] rounded-t-full transform scale-x-[1]"></div> 
  <div class="z-10 flex items-center justify-center bottom-20">
    <img src="@/assets/home.png" alt="Ticket Image" class="h-[400px]">
  </div>
</div>



      <div class="highlighted-events">
        <h2>Sự kiện nổi bật</h2>
        <div class="event-section">
          <EventCard
            v-for="event in highlightedEvents"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
      <div class="trending-events">
        <h2>Sự kiện xu hướng</h2>
        <div class="event-section">
          <EventCard
            v-for="event in trendingEvents"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
      <div class="music-events">
        <h2>Sự kiện âm nhạc</h2>
        <div class="event-section">
          <EventCard
            v-for="event in musicEvents"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
      <div class="actions">
        <Button label="Xem thêm" class="p-button-outlined" />
        <Button label="Tạo sự kiện" icon="pi pi-plus" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Button from "primevue/button";
import Carousel from 'primevue/carousel';
import { ref } from "vue";

const movieBanners = ref([
  {
    image: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzRxcmpzZXFtM2h0dHE4OXJkOXZldzlodmd5NmtmNHhudXYxamd2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Diym3aZO1dHzO/giphy.webp",
    title: "Goodjobs Shinji",
    description: "You did it! Shinji and your friends are on a mission to save the world."
  },
  {
    image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZteGRsaTFlaWt3OG9teDA3eDVoemZkczR5eGg0cG80d2w4ajJxaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/euMGM3uD3NHva/giphy.webp",
    title: "Romantic Comedy",
    description: "A heartwarming tale of love and laughter."
  },
  {
    image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3NwemhvdzVpMGU1Nzdxa2tjMGNpcDhpZDd6NDFpZ2E5MWxrNTltcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qbEq25szyPpG9DYpeN/giphy.webp",
    title: "ƯNG ĐĨ",
    description: "Experience the future of cinema with stunning visuals."
  },
]);

const highlightedEvents = ref([
  { id: 1, image: "https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg", title: "Arcane", date: "Nov. 27" },
  { id: 2, image: "https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg", title: "Arcane", date: "Nov. 27" },
]);

const trendingEvents = ref([
  { id: 1, image: "https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg", title: "Spider-Man", date: "Nov. 27" },
  { id: 2, image: "https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg", title: "Spider-Man", date: "Nov. 27" },
]);

const musicEvents = ref([
  { id: 1, image: "https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg", title: "Sessions", date: "Nov. 27" },
  { id: 2, image: "https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg", title: "Sessions", date: "Nov. 27" },
]);

const tickets = ref([
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
  { image: 'https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif', title: 'Event Promo' },
]);
</script>

<style scoped>

.ticket-carousel {
  margin: 20px;
}

.ticket-frame {
  position: relative;
  width: 300px;
  height: 150px;
  background-color: #007bff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.ticket-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.ticket-content {
  position: absolute;
  color: white;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s ease-in-out; 
}

.carousel-image {
  transition: transform 0.3s ease;
}

.carousel-image:hover {
  transform: scale(1.1); 
}

.ticket-frame:hover .ticket-content { 
  visibility: visible;
  opacity: 1;
}


.decorative-section {
  position: relative;
  background-color: #fdf6e3;
  padding: 200px ;
}

/* .decorative-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #b3e5fc;
  border-radius: 0 0 50% 50%;
} */

.decorative-section .z-10 {
  position: relative;
  z-index: 10;
}
</style>