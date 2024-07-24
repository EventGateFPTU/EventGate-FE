<template>
  <DefaultLayout>
    <div class="flex justify-center pt-20">
      <div class="container">
        <h1 class="pb-4 text-3xl font-bold text-white">Check in</h1>
        <div class="grid grid-cols-2 gap-4">
          <div class="gap-4 rounded-xl bg-white p-4">
            <h2 class="text-2xl font-semibold">Ticket information</h2>

            <div class="flex flex-col gap-2">
              <label for="email">Email</label>
              <InputText :modelValue="attendee?.email" readonly placeholder="Email" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="firstName">First Name</label>
              <InputText :modelValue="attendee?.firstName" readonly placeholder="First name" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="lastName">Last name</label>
              <InputText :modelValue="attendee?.lastName" readonly placeholder="Last name" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="phoneNumber">Phone number</label>
              <InputText :modelValue="attendee?.phoneNumber" readonly placeholder="Phone number" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="startsAt">Date of birth</label>
              <div class="flex flex-col">
                <Calendar
                  :modelValue="attendee?.dateOfBirth ? dayjs(attendee?.dateOfBirth).toDate() : null"
                  format="dd/mm/yy"
                  readonly
                  showIcon
                />
              </div>
            </div>

            <div class="flex w-full flex-row-reverse justify-between py-6">
              <Button @click="checkin">Check in</Button>
              <span v-if="attendee && !attendee?.canCheckin" class="text-red-500"
                >This user cannot check in here</span
              >
              <span v-else>Scan QR code or type in code</span>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="h-full rounded-xl bg-white p-4 pb-14">
              <QrcodeStream
                :constraints="selectedConstraints"
                :track="trackFunctionSelected.value"
                :formats="['qr_code']"
                @error="onError"
                @detect="onDetect"
                @cameraOn="onCameraReady"
              />
              <span class="flex justify-center pt-4 font-bold"> SCAN QR HERE </span>
            </div>
            <div class="flex flex-col gap-3">
              <label class="font-semibold text-white">Enter code here</label>
              <div class="flex w-full gap-4">
                <InputText v-model="code" class="flex-1" />
                <Button
                  @click="
                    () => {
                      format = 'Code'
                      getInfo()
                    }
                  "
                  >Get info</Button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Calendar from 'primevue/calendar'
import { ref, computed } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useRoute } from 'vue-router'
import { Checkin, GetCheckinInfo, type AttendeeInfo } from '@/services/staffs'
import dayjs from 'dayjs'
import { useToast } from 'primevue/usetoast'

const route = useRoute('/show/[id]/checkin')

const result = ref('')

type DetectedCode = {
  rawValue: string
  cornerPoints: {
    x: number
    y: number
  }[]
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
}

const attendee = ref<AttendeeInfo>()
const code = ref<string>()
const toast = useToast()
const format = ref<string>()

function onDetect(detectedCodes: DetectedCode[]) {
  code.value = detectedCodes[0].rawValue
  format.value = 'QR'
  getInfo()
}

async function getInfo() {
  if (!code.value) return
  const { data } = await GetCheckinInfo(route.params.id, code.value)

  if (!data.isSuccess) {
    attendee.value = undefined
    return toast.add({ detail: data.errors[0], life: 3000, severity: 'error' })
  }

  attendee.value = data.value
}

async function checkin() {
  if (!attendee.value?.ticketId) return
  if (!format.value) return

  const {
    data: { isSuccess, errors }
  } = await Checkin(route.params.id, attendee.value?.ticketId, format.value)

  if (!isSuccess) return toast.add({ detail: errors[0], life: 3000, severity: 'error' })
}

/*** select camera ***/

const selectedConstraints = ref({ facingMode: 'environment' })
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const constraintOptions = ref<any[]>(defaultConstraintOptions)

async function onCameraReady() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId }
    }))
  ]

  error.value = ''
}

/*** track functons ***/

function paintOutline(detectedCodes: DetectedCode[], ctx: any) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}
function paintBoundingBox(detectedCodes: DetectedCode[], ctx: any) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
function paintCenterText(detectedCodes: DetectedCode[], ctx: any) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}
const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])

/*** error handling ***/

const error = ref('')

function onError(err: any) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value += err.message
  }
}
</script>
