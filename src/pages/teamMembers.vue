<template>
  <DefaultLayout :has-footer="true" :has-user-indicator="true">
    <div class="about-us">
      <div class="container">
        <h1 class="title">About Us</h1>
        <p class="description">
          We are a team of passionate individuals who are building the future of event ticketing.
        </p>

        <div class="team-grid">
          <div
            class="team-member"
            v-for="member in teamMembers"
            :key="member.name"
            :class="{ 'ceo': member.role.includes('CEO') }"
          >
            <div class="member-card">
              <img :src="member.image" :alt="member.name" class="member-image" />
              <div class="member-info">
                <h2 class="member-name">{{ member.name }}</h2>
                <p class="member-role">{{ member.role }}</p>
              </div>
            </div>
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
    role: 'FrontBart Developer',
    image: chienImage
  },
  {
    name: 'Ngọc Linh',
    role: 'Marketing - CEO',
    image: linhImage
  },
  {
    name: 'Lưu Cường',
    role: 'Backend Developer',
    image: cuongImage
  },
  {
    name: 'Minh Thi',
    role: 'MMT',
    image: thiImage
  },
  {
    name: 'Nhật Sang',
    role: 'Frontend Developer',
    image: sangImage
  },
  {
    name: 'Hoàng Nam',
    role: 'Designer',
    image: namImage
  }
])
</script>

<style scoped>
.about-us {
  padding: 40px 0;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #666;
}

.team-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.team-member {
  flex: 1 1 calc(33.333% - 40px);
  max-width: calc(33.333% - 40px);
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: flex-end;
}

.member-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
}

.member-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.member-info {
  padding: 20px;
}

.member-name {
  font-size: 1.5rem;
  margin: 10px 0;
  color: #333;
}

.member-role {
  font-size: 1rem;
  color: #777;
}

.team-member:hover .member-card {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.team-member:hover .member-image {
  transform: scale(1.05);
}

.ceo .member-card {
  margin-top: -10px; 
}
</style>