import { useEffect, useRef } from 'react'

function makeFallbackParticles() {
  let seed = 17
  const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  const points = []
  for (let i = 0; i < 1550; i += 1) {
    const x = random() * 400
    const y = random() * 400
    const head = ((x - 201) / 78) ** 2 + ((y - 145) / 102) ** 2 < 1
    const neck = x > 174 && x < 229 && y > 222 && y < 292
    const shoulders = ((x - 200) / 169) ** 2 + ((y - 397) / 148) ** 2 < 1 && y > 268
    const background = random() > 0.965
    if (head || neck || shoulders || background) {
      points.push({ x, y, size: 0.55 + random() * 1.1, phase: random() * Math.PI * 2, alpha: head || neck || shoulders ? 0.28 + random() * 0.42 : 0.12 })
    }
  }
  return points
}

const fallbackParticles = makeFallbackParticles()

function particlesFromPhoto(image) {
  const sample = document.createElement('canvas')
  sample.width = 100
  sample.height = 100
  const context = sample.getContext('2d', { willReadFrequently: true })
  const square = Math.min(image.width, image.height)
  context.drawImage(image, (image.width - square) / 2, Math.max(0, (image.height - square) / 3), square, square, 0, 0, 100, 100)
  const { data } = context.getImageData(0, 0, 100, 100)
  const points = []
  for (let y = 0; y < 100; y += 1.5) {
    for (let x = 0; x < 100; x += 1.5) {
      const offset = (Math.floor(y) * 100 + Math.floor(x)) * 4
      const [red, green, blue] = data.slice(offset, offset + 3)
      const pinkBackdrop = red > 150 && red - green > 45 && red - blue > 45
      const sparkle = red + green + blue > 690
      if (pinkBackdrop || sparkle) continue
      const brightness = (red + green + blue) / 765
      points.push({ x: x * 4, y: y * 4, size: 1.1, phase: x * y * 0.07, alpha: 0.23 + (1 - brightness) * 0.52 })
    }
  }
  return points
}

export default function ParticlePortrait() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let particleSet = fallbackParticles
    const image = new Image()
    image.onload = () => { particleSet = particlesFromPhoto(image) }
    image.src = '/profile.jpg'
    const pointer = { x: -500, y: -500 }
    const scale = window.devicePixelRatio || 1
    canvas.width = 400 * scale
    canvas.height = 400 * scale
    context.scale(scale, scale)
    let frame
    let visible = true
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(canvas)

    function draw(time) {
      frame = requestAnimationFrame(draw)
      if (!visible) return
      context.clearRect(0, 0, 400, 400)
      const t = time / 1000
      for (const point of particleSet) {
        const dx = point.x - pointer.x
        const dy = point.y - pointer.y
        const distance = Math.hypot(dx, dy)
        const push = Math.max(0, 1 - distance / 65) * 13
        const x = point.x + (distance ? dx / distance * push : 0) + Math.sin(t + point.phase) * 0.6
        const y = point.y + (distance ? dy / distance * push : 0) + Math.cos(t * 0.8 + point.phase) * 0.6
        context.fillStyle = `rgba(100,255,218,${point.alpha * (0.78 + Math.sin(t * 1.5 + point.phase) * 0.22)})`
        context.fillRect(x, y, point.size, point.size)
      }
    }
    function move(event) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - rect.left) * 400 / rect.width
      pointer.y = (event.clientY - rect.top) * 400 / rect.height
    }
    function leave() { pointer.x = -500; pointer.y = -500 }
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); image.onload = null; canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave) }
  }, [])

  return <canvas ref={canvasRef} className="particle-portrait" role="img" aria-label="Animated particle portrait of Josh Raja" />
}
