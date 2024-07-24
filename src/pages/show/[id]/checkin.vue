<template>
  <DefaultLayout>
    <div class="flex justify-center pt-20">
      <div class="container">
        <h1 class="pb-4 text-3xl font-bold text-white">Check in</h1>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-xl bg-white">
            <h2 class="">Ticket information</h2>
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
              <InputText />
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, computed } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

/*** detection handling ***/

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

function onDetect(detectedCodes: DetectedCode[]) {
  console.log(detectedCodes)
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
}

/*** select camera ***/

const selectedConstraints = ref({ facingMode: 'environment' })
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const constraintOptions = ref<any[]>(defaultConstraintOptions)

async function onCameraReady() {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
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
