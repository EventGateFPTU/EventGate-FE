
<template>
  <DefaultLayout :has-footer="true" :has-user-indicator="true">
    <div class="event-promo">
      <!-- Movie Banner Carousel -->
      <div class="movie-banner-carousel">
        <Carousel :value="movieBanners" :numVisible="1" :numScroll="1" :autoplayInterval="3000">
          <template #item="slotProps">
            <router-link :to="`/events/${slotProps.data.id}`" class="banner-frame group relative overflow-hidden rounded-lg">
              <img
                :src="slotProps.data.image"
                alt="Movie Banner"
                class="carousel-image h-[600px] w-full rounded-lg object-cover"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
              >
                <h2 class="mb-2 text-4xl font-bold text-white">{{ slotProps.data.title }}</h2>
                <p class="text-xl text-white">{{ slotProps.data.description }}</p>
              </div>
            </router-link>
          </template>
        </Carousel>
      </div>

      <div class="ticket-carousel">
          <Carousel
            :value="movieBanners"
            :numVisible="5"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
          >
            <template #item="slotProps">
              <div class="ticket-frame group">
                <img :src="slotProps.data.image" alt="Event" class="ticket-image carousel-image" />
                <div
                  class="ticket-content absolute bottom-0 left-0 right-0 hidden bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
                >
                  <h2>{{ slotProps.data.title }}</h2>
                </div>
              </div>
            </template>
          </Carousel>
        </div>

        <!-- Decorative Section -->
        <div class="decorative-section">
          <div
            class="wave scale-x-[1 absolute bottom-0 left-0 h-[500px] w-full transform rounded-t-full bg-[#D6F6FF]"
          ></div>
          <div class="bottom-20 z-10 flex items-center justify-center">
            <img src="@/assets/home.png" alt="Ticket Image" class="h-[400px]" />
          </div>
        </div>
  
        <div class="gradient-background">
          <div>

      <!-- Trending Events -->
      <div class="trending-events">
        <h1 class="krona-one-regular text-4xl font-bold">TRENDING EVENTS</h1>
        <Carousel :value="trendingEvents" :numVisible="2" :numScroll="1" :autoplayInterval="5000">
          <template #item="slotProps">
            <router-link :to="`/events/${slotProps.data.id}`" class="banner-category-frame group relative">
              <img
                :src="slotProps.data.image"
                alt="Event Banner"
                class="carousel-image h-[400px] w-full object-cover"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
              >
                <h2 class="mb-2 text-4xl font-bold text-white">{{ slotProps.data.title }}</h2>
                <p class="text-xl text-white">{{ slotProps.data.description }}</p>
              </div>
            </router-link>
          </template>
        </Carousel>
      </div>

      <div class="mini-banner-carousel">
              <Carousel :value="trendingEvents" :numVisible="7" :numScroll="3">
                <template #item="slotProps">
                  <div class="mini-banner-frame group relative">
                    <img
                      :src="slotProps.data.image"
                      alt="Event"
                      class="ticket-image carousel-image"
                    />
                    <div
                      class="mini-banner-content absolute bottom-0 left-0 right-0 hidden bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
                    >
                      <h2 class="text-lg font-semibold text-white">{{ slotProps.data.title }}</h2>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div>
          </div>

      <!-- Movies Events -->
      <div class="movies-events">
        <h1 class="krona-one-regular text-4xl font-bold" style="margin-top: 20px">MOVIES EVENTS</h1>
        <Carousel :value="moviesEvents" :numVisible="2" :numScroll="1" :autoplayInterval="5000">
          <template #item="slotProps">
            <router-link :to="`/events/${slotProps.data.id}`" class="banner-category-frame group relative">
              <img
                :src="slotProps.data.image"
                alt="Movies Event"
                class="carousel-image h-[400px] w-full object-cover"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
              >
                <h2 class="mb-2 text-4xl font-bold text-white">{{ slotProps.data.title }}</h2>
                <p class="text-xl text-white">{{ slotProps.data.description }}</p>
              </div>
            </router-link>
          </template>
        </Carousel>
      </div>

      <div class="mini-banner-carousel">
              <Carousel :value="moviesEvents" :numVisible="7" :numScroll="3">
                <template #item="slotProps">
                  <div class="mini-banner-frame group relative">
                    <img
                      :src="slotProps.data.image"
                      alt="Event"
                      class="ticket-image carousel-image"
                    />
                    <div
                      class="mini-banner-content absolute bottom-0 left-0 right-0 hidden bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
                    >
                      <h2 class="text-lg font-semibold text-white">{{ slotProps.data.title }}</h2>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div>

      <!-- Game Events -->
      <div class="game-events">
        <h1 class="krona-one-regular text-4xl font-bold" style="margin-top: 20px">GAME EVENTS</h1>
        <Carousel :value="gameEvents" :numVisible="2" :numScroll="1" :autoplayInterval="5000">
          <template #item="slotProps">
            <router-link :to="`/events/${slotProps.data.id}`" class="banner-category-frame group relative">
              <img
                :src="slotProps.data.image"
                alt="Game Event"
                class="carousel-image h-[400px] w-full object-cover"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
              >
                <h2 class="mb-2 text-4xl font-bold text-white">{{ slotProps.data.title }}</h2>
                <p class="text-xl text-white">{{ slotProps.data.description }}</p>
              </div>
            </router-link>
          </template>
        </Carousel>
      </div>

      <div class="mini-banner-carousel">
              <Carousel :value="gameEvents" :numVisible="7" :numScroll="3">
                <template #item="slotProps">
                  <div class="mini-banner-frame group relative">
                    <img
                      :src="slotProps.data.image"
                      alt="Event"
                      class="ticket-image carousel-image"
                    />
                    <div
                      class="mini-banner-content absolute bottom-0 left-0 right-0 hidden bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
                    >
                      <h2 class="text-lg font-semibold text-white">{{ slotProps.data.title }}</h2>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div>
          
    </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { GetEvents, GetFeaturedEvents, SearchEvents } from '@/services/events'
import type { Event } from '@/types/items'
import Carousel from 'primevue/carousel'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// Define the reactive properties with the explicit type
const movieBanners = ref<Event[]>([])
const trendingEvents = ref<Event[]>([])
const moviesEvents = ref<Event[]>([])
const gameEvents = ref<Event[]>([])
const ticketEvents= ref<Event[]>([])

onMounted(async() => {
  try {
    // Fetch featured events for trending
    const featuredResponse = await GetFeaturedEvents(1, 5)
    trendingEvents.value = featuredResponse.data.value.data.map((event) => ({
      id: event.id, // Đảm bảo có id của sự kiện
      image: event.bannerImageUrl,
      title: event.title,
      description: event.description
    }))

    // Fetch all events and filter by category
    const allEventsResponse = await GetEvents(1, 20)
    const allEvents = allEventsResponse.data.value.data

    // Filter for Movies events
    moviesEvents.value = allEvents
      .filter((event) => event.categories.some((cat) => cat.name === 'Movies'))
      .map((event) => ({
        id: event.id, 
        image: event.bannerImageUrl,
        title: event.title,
        description: event.description
      }))

    // Filter for game events
    gameEvents.value = allEvents
      .filter((event) => event.categories.some((cat) => cat.name === 'Games'))
      .map((event) => ({
        id: event.id, 
        image: event.bannerImageUrl,
        title: event.title,
        description: event.description
      }))

    // Fetch movie events
    const movieEventsResponse = await SearchEvents(1, 5, ['34938f39-4d30-3c5a-52f6-55b351d69589'])
    movieBanners.value = movieEventsResponse.data.value.data.map((event) => ({
      id: event.id, 
      image: event.bannerImageUrl,
      title: event.title,
      description: event.description
    }))
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }
})

const responsiveOptions = ref([
    {
      breakpoint: '10000px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '1900px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ])
</script>


<style scoped>
.krona-one-regular {
  font-family: 'Krona One', sans-serif;
  font-weight: 600;
  font-style: normal;
}

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

.mini-banner-frame {
  position: relative;
  width: 280px;
  height: 270px;
  background-color: #007bff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.mini-banner-content {
  position: absolute;
  color: white;
  text-align: center;
  font-size: 1.125em;
  font-weight: 600;
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s,
    opacity 0.3s ease-in-out;
}

.mini-banner-frame:hover .mini-banner-content {
  visibility: visible;
  opacity: 1;
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
  transition:
    visibility 0s,
    opacity 0.3s ease-in-out;
}

.carousel-image {
  transition:
    transform 0.3s ease,
    border-radius 0.3s ease;
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
  padding: 200px;
}

.decorative-section .z-10 {
  position: relative;
  z-index: 10;
}

.flex {
  display: flex;
}

.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}

.banner-frame {
  position: relative;
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    visibility 0s,
    opacity 0.3s ease-in-out;
}

.banner-category-frame {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    visibility 0s,
    opacity 0.3s ease-in-out;
  overflow: hidden;
  margin: 20px;
}

.gradient-background {
  background: linear-gradient(to bottom, #d6f6ff, #0088ff);
}
</style>




