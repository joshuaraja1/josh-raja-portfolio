import { useEffect, useRef } from 'react'

const SIZE = 400
const STEP = 3

function makePortrait(image) {
  const source = document.createElement('canvas')
  source.width = SIZE
  source.height = SIZE
  const sourceContext = source.getContext('2d', { willReadFrequently: true })
  const square = Math.min(image.width, image.height)
  const cropY = Math.max(0, (image.height - square) / 3)
  sourceContext.drawImage(image, (image.width - square) / 2, cropY, square, square, 0, 0, SIZE, SIZE)
  const pixels = sourceContext.getImageData(0, 0, SIZE, SIZE)
  const original = pixels.data
  const points = []
  const total = SIZE * SIZE
  const candidate = new Uint8Array(total)
  const outside = new Uint8Array(total)
  const queue = new Int32Array(total)

  for (let index = 0; index < total; index += 1) {
    const offset = index * 4
    const red = original[offset]
    const green = original[offset + 1]
    const blue = original[offset + 2]
    candidate[index] = red > 120 && red > green * 1.25 && red > blue * 1.2 ? 1 : 0
  }

  let read = 0
  let write = 0
  function addOutside(index) {
    if (candidate[index] && !outside[index]) {
      outside[index] = 1
      queue[write++] = index
    }
  }
  for (let x = 0; x < SIZE; x += 1) {
    addOutside(x)
    addOutside((SIZE - 1) * SIZE + x)
  }
  for (let y = 0; y < SIZE; y += 1) {
    addOutside(y * SIZE)
    addOutside(y * SIZE + SIZE - 1)
  }
  while (read < write) {
    const index = queue[read++]
    const x = index % SIZE
    if (x > 0) addOutside(index - 1)
    if (x < SIZE - 1) addOutside(index + 1)
    if (index >= SIZE) addOutside(index - SIZE)
    if (index < total - SIZE) addOutside(index + SIZE)
  }

  // Keep the connected subject; isolated light decorations belong to the backdrop.
  const visited = new Uint8Array(total)
  let subject = new Uint8Array(total)
  let largest = 0
  for (let start = 0; start < total; start += 1) {
    if (outside[start] || visited[start]) continue
    read = 0
    write = 0
    queue[write++] = start
    visited[start] = 1
    while (read < write) {
      const index = queue[read++]
      const x = index % SIZE
      const neighbors = [x > 0 ? index - 1 : -1, x < SIZE - 1 ? index + 1 : -1, index >= SIZE ? index - SIZE : -1, index < total - SIZE ? index + SIZE : -1]
      for (const next of neighbors) {
        if (next >= 0 && !outside[next] && !visited[next]) {
          visited[next] = 1
          queue[write++] = next
        }
      }
    }
    if (write > largest) {
      largest = write
      subject = new Uint8Array(total)
      for (let i = 0; i < write; i += 1) subject[queue[i]] = 1
    }
  }

  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const index = y * SIZE + x
      const offset = index * 4
      const red = original[offset]
      const green = original[offset + 1]
      const blue = original[offset + 2]
      const edgeFade = Math.min(1, x / 12, (SIZE - x) / 12, y / 12, (SIZE - y) / 26)
      const face = ((x - 201) / 72) ** 2 + ((y - 204) / 97) ** 2 < 1
      const torso = y > 270 && ((x - 201) / 191) ** 2 + ((y - 412) / 151) ** 2 < 1
      const collar = x > 137 && x < 269 && y < 345
      const torsoPixel = torso && (!candidate[index] || collar)
      const strayEdge = y < 270 && ((x - 201) / 118) ** 2 + ((y - 160) / 155) ** 2 > 1

      if ((!subject[index] && !face && !torsoPixel) || strayEdge || edgeFade <= 0) {
        original[offset + 3] = 0
        continue
      }

      const luminance = (red * 0.24 + green * 0.68 + blue * 0.08) / 255
      const tone = Math.pow(luminance, 0.8)
      original[offset] = 48 + tone * 133
      original[offset + 1] = 107 + tone * 148
      original[offset + 2] = 119 + tone * 101
      original[offset + 3] = 205 * edgeFade

      if (x % STEP === 0 && y % STEP === 0) {
        points.push({ x, y, tone, alpha: (0.28 + tone * 0.38) * edgeFade, phase: x * 0.017 + y * 0.023 })
      }
    }
  }

  const portrait = document.createElement('canvas')
  portrait.width = SIZE
  portrait.height = SIZE
  portrait.getContext('2d').putImageData(pixels, 0, 0)
  return { portrait, points }
}

export default function ParticlePortrait() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return undefined

    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = SIZE * ratio
    canvas.height = SIZE * ratio
    context.scale(ratio, ratio)

    const image = new Image()
    const pointer = { x: -500, y: -500 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let portraitData = null
    let frame = 0
    let visible = true
    let lastDraw = 0
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(canvas)

    function draw(time) {
      frame = requestAnimationFrame(draw)
      if (!visible || !portraitData || time - lastDraw < 33) return
      lastDraw = time
      context.clearRect(0, 0, SIZE, SIZE)
      context.drawImage(portraitData.portrait, 0, 0)

      const seconds = time / 1000
      for (const point of portraitData.points) {
        const dx = point.x - pointer.x
        const dy = point.y - pointer.y
        const distance = Math.hypot(dx, dy)
        const push = reducedMotion ? 0 : Math.max(0, 1 - distance / 58) * 9
        const drift = reducedMotion ? 0 : Math.sin(seconds * 0.7 + point.phase) * 0.32
        const x = point.x + (distance ? dx / distance * push : 0) + drift
        const y = point.y + (distance ? dy / distance * push : 0) + drift
        const shimmer = reducedMotion ? 1 : 0.92 + Math.sin(seconds * 1.2 + point.phase) * 0.08
        context.fillStyle = `rgba(135,255,225,${point.alpha * shimmer})`
        context.fillRect(x, y, point.tone > 0.62 ? 1.55 : 1.25, 1.25)
      }
    }

    function move(event) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - rect.left) * SIZE / rect.width
      pointer.y = (event.clientY - rect.top) * SIZE / rect.height
    }

    function leave() { pointer.x = -500; pointer.y = -500 }
    image.onload = () => { portraitData = makePortrait(image) }
    image.src = '/profile.jpg'
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      image.onload = null
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-portrait" role="img" aria-label="Animated pixel portrait of Josh Raja" />
}
