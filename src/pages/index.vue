<template>
  <DefaultLayout :has-footer="false" :has-user-indicator="true">
    <div class="event-promo">
      <div class="movie-banner-carousel">
        <Carousel :value="movieBanners" :numVisible="1" :numScroll="1" :autoplayInterval="3000">
          <template #item="slotProps">
            <div class="banner-frame group relative overflow-hidden rounded-lg">
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
            </div>
          </template>
        </Carousel>
      </div>

      <div class="ticket-carousel">
        <Carousel
          :value="tickets"
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
          <div class="trending-events">
            <h1 class="krona-one-regular text-4xl font-bold">TRENDING EVENTS</h1>
            <div class="category-banner-carousel">
              <Carousel
                :value="movieBanners"
                :numVisible="2"
                :numScroll="1"
                :autoplayInterval="5000"
              >
                <template #item="slotProps">
                  <div class="banner-category-frame group relative">
                    <img
                      :src="slotProps.data.image"
                      alt="Movie Banner"
                      class="carousel-image h-[400px] w-full object-cover"
                    />
                    <div
                      class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
                    >
                      <h2 class="mb-2 text-4xl font-bold text-white">{{ slotProps.data.title }}</h2>
                      <p class="text-xl text-white">{{ slotProps.data.description }}</p>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div>
          </div>

          <div class="mini-banner-carousel">
            <Carousel :value="tickets" :numVisible="7" :numScroll="3">
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

        <div>
          <div class="music-events">
            <h1 class="krona-one-regular text-4xl font-bold" style="margin-top: 20px">
              MUSIC EVENTS
            </h1>
            <div class="category-banner-carousel">
              <Carousel
                :value="movieBanners"
                :numVisible="2"
                :numScroll="1"
                :autoplayInterval="5000"
              >
                <template #item="slotProps">
                  <div class="banner-category-frame group relative">
                    <img
                      :src="slotProps.data.image"
                      alt="Movie Banner"
                      class="carousel-image h-[400px] w-full object-cover"
                    />
                    <div
                      class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
                    >
                      <h2 class="mb-2 text-4xl font-bold text-white">{{ slotProps.data.title }}</h2>
                      <p class="text-xl text-white">{{ slotProps.data.description }}</p>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div>
          </div>

          <div class="mini-banner-carousel">
            <Carousel :value="tickets" :numVisible="7" :numScroll="3">
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

        <div>
          <div class="game-events">
            <h1 class="krona-one-regular text-4xl font-bold" style="margin-top: 20px">
              GAME EVENTS
            </h1>
            <div class="category-banner-carousel">
              <Carousel
                :value="movieBanners"
                :numVisible="2"
                :numScroll="1"
                :autoplayInterval="5000"
              >
                <template #item="slotProps">
                  <div class="banner-category-frame group relative">
                    <img
                      :src="slotProps.data.image"
                      alt="Movie Banner"
                      class="carousel-image h-[400px] w-full object-cover"
                    />
                    <div
                      class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 group-hover:block"
                    >
                      <h2 class="mb-2 text-4xl font-bold text-white">{{ slotProps.data.title }}</h2>
                      <p class="text-xl text-white">{{ slotProps.data.description }}</p>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div>
          </div>

          <div class="mini-banner-carousel">
            <Carousel :value="tickets" :numVisible="7" :numScroll="3">
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

      <div class="actions">
        <Button label="Xem thêm" class="p-button-outlined" />
        <Button label="Tạo sự kiện" icon="pi pi-plus" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Button from 'primevue/button'
import Carousel from 'primevue/carousel'
import { ref } from 'vue'

const movieBanners = ref([
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzRxcmpzZXFtM2h0dHE4OXJkOXZldzlodmd5NmtmNHhudXYxamd2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Diym3aZO1dHzO/giphy.webp',
    title: 'Goodjobs Shinji',
    description: 'You did it! Shinji and your friends are on a mission to save the world.'
  },
  {
    image:
      'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGpic2p0aDNkM3oxaXZ3N3oyYWR0MmZ0ZmE3NjR0MDcyMzRvcWtvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5T06fayphNrPayKYak/giphy.webp',
    title: 'Romantic Comedy',
    description: 'A heartwarming tale of love and laughter.'
  },
  {
    image:
      'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3NwemhvdzVpMGU1Nzdxa2tjMGNpcDhpZDd6NDFpZ2E5MWxrNTltcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qbEq25szyPpG9DYpeN/giphy.webp',
    title: 'ƯNG ĐĨ',
    description: 'Experience the future of cinema with stunning visuals.'
  }
])

const highlightedEvents = ref([
  {
    id: 1,
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Arcane',
    date: 'Nov. 27'
  },
  {
    id: 2,
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Arcane',
    date: 'Nov. 27'
  }
])

const trendingEvents = ref([
  {
    id: 1,
    image:
      'https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg',
    title: 'Spider-Man',
    date: 'Nov. 27'
  },
  {
    id: 2,
    image:
      'https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg',
    title: 'Spider-Man',
    date: 'Nov. 27'
  }
])

const musicEvents = ref([
  {
    id: 1,
    image:
      'https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg',
    title: 'Sessions',
    date: 'Nov. 27'
  },
  {
    id: 2,
    image:
      'https://i.cbc.ca/1.6713656.1679693029!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/this-is-fine.jpg',
    title: 'Sessions',
    date: 'Nov. 27'
  }
])

const tickets = ref([
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  },
  {
    image:
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWExeGpnaGI5anN0OGtlZWM4aGs5NzJ0M25xcGo4YzhhcXgwMDVkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.webp',
    title: 'Event Promo'
  }
])

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
  width: 200px;
  height: 200px;
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
