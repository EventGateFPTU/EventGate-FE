<template>
  <DefaultLayout :has-footer="true" :has-user-indicator="true">
    <div class="container my-10">
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-1 bg-[#D6F6FF] p-4 rounded-md shadow-md space-y-2">
          <h3 class="text-xl font-semibold mb-4">Filter</h3>
          <Accordion>
            <AccordionTab header="City">
              <CascadeSelect
                v-model="selectedCity"
                inputId="cs-city"
                :options="countries"
                optionLabel="cname"
                optionGroupLabel="name"
                optionGroupChildren="cities"
                style="min-width: 14rem"
                placeholder="Select a City"
              />
            </AccordionTab>
            <AccordionTab header="Category">
              <MultiSelect
                v-model="selectedCategories"
                :options="categories"
                optionLabel="name"
                placeholder="Select Categories"
                display="chip"
                class="w-full"
              />
            </AccordionTab>
          </Accordion>
          <Button label="Filter" class="w-full" @click="applyFilter"/>
        </div>

        <div class="col-span-3 bg-[#D6F6FF] p-4 rounded-md shadow-md">
          <h3 class="text-xl font-semibold mb-4">Events</h3>
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="event in filteredEvents"
              :key="event.id"
              class="bg-[#0088FF] p-4 rounded-md shadow-md"
            >
              <div class="flex items-center justify-between mb-2">
                <Marquee class="text-lg text-white font-semibold">{{ event.title }}</Marquee> 
                <span class="text-sm text-green-400">{{ event.discount ? `- ${event.discount} %` : '' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <img
                  :src="event.backgroundImageUrl || 'https://via.placeholder.com/300x150'"
                  alt="Event Image"
                  class="rounded-md w-full h-40 object-cover" 
                />
              </div>
              <div class="mt-2 flex space-x-2">
                <span
                  v-for="category in event.categories"
                  :key="category.id"
                  class="rounded-full bg-[#ADD8E6] px-2 py-1 text-sm text-[#00008B]"
                >
                  {{ category.name }}
                </span>
              </div>
              <div class="mt-2">
                <span class="text-[#4af861]">From: {{ event.price || 'N/A' }} VND</span> 
                <br />
                <span class="pi pi-calendar text-white"></span>
                <span class="text-white">{{ formatDate(event.createdAt) }}</span>
              </div>
            </div>
          </div>
          <Paginator
            :rows="pageSize"
            :totalRecords="totalRecords"
            :first="(currentPage - 1) * pageSize"
            @page="onPageChange"
          />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import axios from 'axios';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from "primevue/button";
import CascadeSelect from "primevue/cascadeselect";
import MultiSelect from 'primevue/multiselect';
import Paginator from 'primevue/paginator';

export default {
  components: {
    Accordion,
    AccordionTab,
    CascadeSelect,
    DefaultLayout,
    MultiSelect,
    Paginator,
  },
  data() {
    return {
      selectedCity: null,
      selectedCategories: [],
      events: [],
      filteredEvents: [],
      categories: [],
      countries: [
        {
          name: "Vietnam",
          code: "VN",
          cities: [
            { cname: "Ho Chi Minh", code: "HCM" },
            { cname: "Hanoi", code: "HN" }
          ]
        }
      ], 
      currentPage: 1,
      pageSize: 10,
      totalRecords: 0,
    };
  },
  created() {
    this.fetchEvents();
    this.fetchCategories();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get(`https://api.ticketo.store/events?pageNumber=${this.currentPage}&pageSize=${this.pageSize}`);
        this.events = response.data.value.data;
        this.filteredEvents = this.events;
        this.totalRecords = response.data.value.count;
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('https://api.ticketo.store/categories?pageNumber=1&pageSize=1000');
        this.categories = response.data.value.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    applyFilter() {
      this.filteredEvents = this.events.filter(event => {
        const matchesCity = this.selectedCity ? event.location === this.selectedCity.code : true;
        const matchesCategory = this.selectedCategories.length > 0 ? event.categories.some(cat => this.selectedCategories.includes(cat)) : true; 
        return matchesCity && matchesCategory;
      });
    },
    onPageChange(event) {
      this.currentPage = event.page + 1;
      this.fetchEvents();
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(); 
    }
  }
};
</script>
