<template>
  <DefaultLayout :has-footer="false" :has-user-indicator="true">
    <div class="event-promo">
      <div class="movie-banner-carousel">
        <Carousel :value="movieBanners" :numVisible="1" :numScroll="1" :autoplayInterval="5000">
          <template #item="slotProps">
            <div class="relative">
              <img :src="slotProps.data.image" alt="Movie Banner" class="w-full h-[800px] object-cover" />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
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
        <div class="ticket-frame">
          <img :src="slotProps.data.image" alt="Event" class="ticket-image" />
          <div class="ticket-content">
            <h2>{{ slotProps.data.title }}</h2>
          </div>
        </div>
      </template>
    </Carousel>
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
    image: "https://media.tenor.com/B9OjyPMq5pIAAAAM/fine-this-is-fine.gif", 
    title: "Exciting Adventure Movie", 
    description: "Join the thrilling journey across unknown lands."
  },
  { 
    image: "https://salt.tkbcdn.com/ts/ds/41/05/9f/c747749b3725747674cbeaab5340e5d0.png", 
    title: "Romantic Comedy", 
    description: "A heartwarming tale of love and laughter."
  },
  { 
    image: "https://salt.tkbcdn.com/ts/ds/c9/5b/a3/4bf339980eafce491ff81ce1814ff7d1.png", 
    title: "Sci-Fi Blockbuster", 
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
}
</style>