<template>
  <DefaultLayout>
    <!-- <div class="relative h-full bg-[#4A3F9F]">
      <img fill="none" src="@/assets/background-logo.png" class="absolute top-0 z-10 w-full" />
      <div class="h-full">
        <div class="flex justify-center">
          <div
            class="polygon absolute top-20 z-10 h-[700px] w-[1100px] -translate-x-20 translate-y-12 bg-[#2f2d7c]"
          ></div>
          <div class="polygon absolute top-20 z-20 h-[700px] w-[1100px] bg-white"></div>
          <div class="relative z-30 w-[1100px] px-20 pt-[230px]">
            <div class="flex w-full items-center justify-center">
              <p class="text-lg font-bold">Event info</p>
            </div>
            <div class="space-y-8">
              <div class="flex flex-col gap-2">
                <label for="name">Name</label>
                <InputText id="name" v-model="name" />
              </div>

              <div class="space-y-2">
                <label for="location">Location</label>
                <div class="flex flex-wrap gap-3">
                  <div class="align-items-center flex">
                    <RadioButton
                      v-model="location"
                      inputId="ingredient1"
                      name="location"
                      value="online"
                    />
                    <label for="ingredient1" class="ml-2">Online event</label>
                  </div>
                  <div class="align-items-center flex">
                    <RadioButton
                      v-model="location"
                      inputId="ingredient2"
                      name="location"
                      value="offline"
                    />
                    <label for="ingredient2" class="ml-2">Offline event</label>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label for="address">Address</label>
                <InputText id="address" v-model="address" />
              </div>

              <div class="grid grid-cols-3 gap-3">
                <Dropdown
                  v-model="selectedCity"
                  :options="cities"
                  optionLabel="name"
                  placeholder="Select province"
                  checkmark
                  :highlightOnSelect="false"
                  class="md:w-14rem w-full"
                />
                <Dropdown
                  v-model="selectedCity"
                  :options="cities"
                  optionLabel="name"
                  placeholder="Select district"
                  checkmark
                  :highlightOnSelect="false"
                  class="md:w-14rem w-full"
                />
                <Dropdown
                  v-model="selectedCity"
                  :options="cities"
                  optionLabel="name"
                  placeholder="Select commune"
                  checkmark
                  :highlightOnSelect="false"
                  class="md:w-14rem w-full"
                />
              </div>
            </div>
          </div>
          <div class="mt-[2000px]"></div>
        </div>
      </div>
      <img fill="none" src="@/assets/pattern.png" class="absolute top-[600px] z-40 w-full" />
    </div> -->
    <div class="min-h-[calc(100vh_-_8rem)] bg-[#4A3F9F]">
      <Stepper :steps class="">
        <template #Info>
          <div class="w-[80vw] rounded-3xl bg-white p-10">
            <FileUploader />
            <div>asfdasf</div>
            <div>asfdasf</div>
            <div>asfdasf</div>
          </div>
        </template>
        <template #Tickets>2</template>
        <template #Settings>3</template>
      </Stepper>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import { Stepper, StepperContent, StepperNavigator } from '@/components/stepper'
import { ref } from 'vue'
import type { Step } from '@/components/stepper/types'
import FileUploader from '@/components/file-upload/FileUploader.vue'

const steps: Step[] = [
  {
    key: 'Info'
  },
  {
    key: 'Tickets'
  },
  {
    key: 'Settings'
  }
]
</script>

<style scoped>
.polygon {
  clip-path: polygon(0 100%, 0 150px, 100px 0, 200px 0, 125px 125px, 100% 125px, 100% 100%);
}
</style>
