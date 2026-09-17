import { useEffect, useRef } from 'react'

const SIZE = 400
const CHARACTERS = ['·', '.', ':', '-', '=', '+', '*', '#']

function portraitPixels(image) {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const context = canvas.getContext('2d', { willReadFrequently: true })
  const square = Math.min(image.width, image.height)
  context.drawImage(image, (image.width - square) / 2, (image.height - square) / 3, square, square, 0, 0, SIZE, SIZE)
  const pixels = context.getImageData(0, 0, SIZE, SIZE).data
  const background = new Uint8Array(SIZE * SIZE)
  const queue = new Int32Array(SIZE * SIZE)
  let head = 0
  let tail = 0

  function pink(index) {
    const offset = index * 4
    const red = pixels[offset]
    return red > 120 && red > pixels[offset + 1] * 1.25 && red > pixels[offset + 2] * 1.2
  }

  function visit(index) {
    if (!background[index] && pink(index)) {
      background[index] = 1
      queue[tail++] = index
    }
  }

  for (let edge = 0; edge < SIZE; edge += 1) {
    visit(edge)
    visit((SIZE - 1) * SIZE + edge)
    visit(edge * SIZE)
    visit(edge * SIZE + SIZE - 1)
  }

  while (head < tail) {
    const index = queue[head++]
    const x = index % SIZE
    if (x) visit(index - 1)
    if (x < SIZE - 1) visit(index + 1)
    if (index >= SIZE) visit(index - SIZE)
    if (index < SIZE * (SIZE - 1)) visit(index + SIZE)
  }

  const seen = new Uint8Array(SIZE * SIZE)
  const subject = new Uint8Array(SIZE * SIZE)
  let largest = 0
  for (let start = 0; start < seen.length; start += 1) {
    if (seen[start] || background[start]) continue
    head = 0
    tail = 1
    queue[0] = start
    seen[start] = 1
    while (head < tail) {
      const index = queue[head++]
      const x = index % SIZE
      const neighbors = [x ? index - 1 : -1, x < SIZE - 1 ? index + 1 : -1, index >= SIZE ? index - SIZE : -1, index < SIZE * (SIZE - 1) ? index + SIZE : -1]
      for (const next of neighbors) {
        if (next >= 0 && !seen[next] && !background[next]) {
          seen[next] = 1
          queue[tail++] = next
        }
      }
    }
    if (tail > largest) {
      subject.fill(0)
      largest = tail
      for (let i = 0; i < tail; i += 1) subject[queue[i]] = 1
    }
  }

  return { pixels, background, subject }
}

function characterParticles(image) {
  const { pixels, subject } = portraitPixels(image)
  const particles = []
  const stepX = 3.7
  const stepY = 6
  let seed = 283
  const random = () => ((seed = seed * 16807 % 2147483647) / 2147483647)

  for (let y = 16; y < SIZE - 14; y += stepY) {
    for (let x = 10; x < SIZE - 10; x += stepX) {
      const ix = Math.round(x)
      const iy = Math.round(y)
      const index = iy * SIZE + ix
      const offset = index * 4
      const red = pixels[offset]
      const green = pixels[offset + 1]
      const blue = pixels[offset + 2]
      const hairAndFace = y < 275 && ((x - 201) / 119) ** 2 + ((y - 160) / 156) ** 2 < 1
      const faceArea = ((x - 201) / 106) ** 2 + ((y - 204) / 118) ** 2 < 1
      const face = faceArea && red < 205 && red - green < 65 && green > 58
      const shoulders = y > 267 && ((x - 201) / 194) ** 2 + ((y - 412) / 153) ** 2 < 1
      const darkClothing = red + green + blue < 405
      const whiteCollar = x > 82 && x < 305 && y > 275 && y < 375 && red + green + blue > 440 && Math.abs(red - green) < 52 && Math.abs(green - blue) < 52
      const hand = x < 148 && y > 274 && red > 95 && red > green * 1.12 && red > blue * 1.16
      const decoration = red > 195 && green > 190 && blue > 185
      const foreground = (hairAndFace && (subject[index] || face) && (!decoration || face)) || (shoulders && !hand && (darkClothing || whiteCollar))
      if (!foreground) continue

      const brightness = Math.min(1, (red * 0.25 + green * 0.65 + blue * 0.1) / 215)
      const character = CHARACTERS[Math.min(CHARACTERS.length - 1, Math.floor(brightness * CHARACTERS.length))]
      const fade = Math.min(1, y / 25, (SIZE - y) / 35)
      particles.push({
        x: x + (random() - 0.5) * 350,
        y: y + (random() - 0.5) * 350,
        targetX: x,
        targetY: y,
        vx: 0,
        vy: 0,
        character,
        alpha: (0.43 + brightness * 0.47) * fade,
        delay: random() * 0.38,
        phase: random() * Math.PI * 2,
      })
    }
  }
  return particles
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
    context.font = '6px monospace'
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -500, y: -500, active: false }
    let particles = []
    let started = 0
    let previous = 0
    let frame = 0
    let visible = true
    const image = new Image()
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(canvas)

    image.onload = () => {
      particles = characterParticles(image)
      started = performance.now()
      if (reducedMotion) {
        for (const particle of particles) {
          particle.x = particle.targetX
          particle.y = particle.targetY
          particle.delay = 0
        }
      }
    }
    image.src = '/profile.jpg'

    function draw(time) {
      frame = requestAnimationFrame(draw)
      if (!visible || !particles.length || time - previous < 30) return
      const elapsed = (time - started) / 1000
      const delta = Math.min((time - previous) / 33, 1.5)
      previous = time
      context.clearRect(0, 0, SIZE, SIZE)

      for (const particle of particles) {
        const age = elapsed - particle.delay
        if (age < 0) continue
        const fade = reducedMotion ? 1 : Math.min(1, age / 1.4)

        if (!reducedMotion) {
          if (pointer.active) {
            const dx = particle.x - pointer.x
            const dy = particle.y - pointer.y
            const distance = Math.hypot(dx, dy)
            if (distance > 0 && distance < 82) {
              const force = (1 - distance / 82) * 2.5 * delta
              particle.vx += dx / distance * force
              particle.vy += dy / distance * force
            }
          }
          particle.vx += (particle.targetX - particle.x) * 0.075 * delta
          particle.vy += (particle.targetY - particle.y) * 0.075 * delta
          particle.vx *= Math.pow(0.86, delta)
          particle.vy *= Math.pow(0.86, delta)
          particle.x += particle.vx * delta
          particle.y += particle.vy * delta
        }

        const shimmer = reducedMotion ? 0 : Math.sin(elapsed * 1.4 + particle.phase) * 0.06
        context.fillStyle = `rgba(100,255,218,${Math.max(0, (particle.alpha + shimmer) * fade)})`
        context.fillText(particle.character, particle.x, particle.y)
      }
    }

    function move(event) {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - bounds.left) * SIZE / bounds.width
      pointer.y = (event.clientY - bounds.top) * SIZE / bounds.height
      pointer.active = true
    }

    function leave() { pointer.active = false }
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    canvas.addEventListener('pointercancel', leave)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      image.onload = null
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
      canvas.removeEventListener('pointercancel', leave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-portrait" role="img" aria-label="Interactive ASCII portrait of Josh Raja" />
}
