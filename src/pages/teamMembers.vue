<template>
  <DefaultLayout :has-footer="true" :has-user-indicator="true">
    <div class="about-us">
      <div class="container">
        <h1>About Us</h1>
        <p>
          We are a team of passionate individuals who are building the future of event ticketing.
        </p>

        <h2>Our Team</h2>

        <div class="team-grid">
          <div class="team-member" v-for="member in teamMembers" :key="member.name">
            <img :src="member.image" :alt="member.name" />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import chienImage from '@/assets/chien.png'
import cuongImage from '@/assets/cuong.png'
import linhImage from '@/assets/linh.png'
import namImage from '@/assets/nam.png'
import sangImage from '@/assets/sang.png'
import thiImage from '@/assets/thi.png'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref } from 'vue'
const teamMembers = ref([
  {
    name: 'Quang Chiến',
    role: 'IT',
    image: chienImage
  },
  {
    name: 'Ngọc Linh',
    role: 'MKT - CEO',
    image: linhImage
  },
  {
    name: 'Lưu Cường',
    role: 'IT',
    image: cuongImage
  },
  {
    name: 'Minh Thi',
    role: 'MMT',
    image: thiImage
  },
  {
    name: 'Nhật Sang',
    role: 'IT',
    image: sangImage
  },
  {
    name: 'Hoàng Nam',
    role: 'DES',
    image: namImage
  }
])
</script>

<style scoped>
.about-us {
  padding: 50px 0;
  background-color: #fdf6e3;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 20px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.team-member {
  overflow: hidden;
}

.team-member img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
