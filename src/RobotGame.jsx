import { useEffect, useRef, useState } from 'react'
import './RobotGame.css'

const SPRITE = [
  '....WWWW....',
  '..WWWWWWWW..',
  '.WWWWWWWWWW.',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WWDDWWDDWWWW',
  'WWTDWWTDWWWW',
  'WWWWWWWWWWWW',
  '.WWDDDDWWWW.',
  '..WWDDWWWW..',
  '...WWWWWW...',
  '...WWWWWW...',
  '..WWW..WWW..',
  '..WWW..WWW..',
]
const COLORS = { W: '#dce8ff', D: '#14213e', T: '#64ffda' }
const CELL_COUNT = 5
const WORLD_STEP = 185

function makeLevel(width, height) {
  const totalRows = Math.max(8, Math.floor((height - 450) / WORLD_STEP))
  const platforms = []
  const cells = []
  for (let row = 0; row < totalRows; row += 1) {
    const y = 365 + row * WORLD_STEP
    const shift = row % 2 ? 0.075 : 0
    const xs = [0.035, 0.17, 0.335, 0.5, 0.665, 0.83]
    xs.forEach((fraction, index) => {
      // A broken path gives the player gaps to steer through, like the reference.
      if ((row + index) % 7 === 5) return
      platforms.push({ x: Math.min(width - 84, width * (fraction + shift)), y, width: 78 })
    })
  }
  // The first platform is visible immediately when the mode starts.
  platforms.push({ x: Math.max(35, width * 0.11), y: 315, width: 90 })
  const rows = Array.from({ length: CELL_COUNT }, (_, index) => Math.round(1 + index * (totalRows - 3) / (CELL_COUNT - 1)))
  rows.forEach((row, index) => {
    const y = 365 + row * WORLD_STEP
    const x = Math.min(width - 84, width * ([0.17, 0.665, 0.335, 0.83, 0.17][index] + (row % 2 ? 0.075 : 0)))
    // Use the corresponding ledge itself as the cell's landing spot.
    const ledge = platforms.find(platform => platform.y === y && Math.abs(platform.x - x) < 2)
    if (!ledge) platforms.push({ x, y, width: 78 })
    cells.push({ x: (ledge?.x ?? x) + 39, y: y - 17, collected: false })
  })
  const textPlatforms = [...document.querySelectorAll('.section-heading h2, .intro-block h1, .intro-block p, .say-hi, .about-grid p, .experience-panel h3, .project-card h3')]
    .map(element => {
      const rect = element.getBoundingClientRect()
      return { x: rect.left, y: rect.top + window.scrollY, width: rect.width }
    })
    .filter(platform => platform.width > 35)
  return { platforms, textPlatforms, cells }
}

function drawSprite(ctx, x, y, facing, tick) {
  const scale = 3
  ctx.save()
  ctx.translate(Math.round(x), Math.round(y))
  if (facing < 0) { ctx.translate(36, 0); ctx.scale(-1, 1) }
  SPRITE.forEach((row, rowIndex) => {
    row.split('').forEach((pixel, column) => {
      if (pixel === '.') return
      ctx.fillStyle = COLORS[pixel]
      const bob = rowIndex >= 12 && Math.floor(tick / 8) % 2 ? 1 : 0
      ctx.fillRect(column * scale, (rowIndex + bob) * scale, scale, scale)
    })
  })
  ctx.restore()
}

function drawCell(ctx, x, y, tick) {
  const pulse = Math.sin(tick * 0.08) * 2
  ctx.save()
  ctx.translate(Math.round(x), Math.round(y + pulse))
  ctx.shadowColor = '#d6a4ed'
  ctx.shadowBlur = 12
  ctx.fillStyle = '#cba4dc'
  for (let arm = 0; arm < 8; arm += 1) {
    const angle = arm * Math.PI / 4
    ctx.fillRect(Math.round(Math.cos(angle) * 9) - 2, Math.round(Math.sin(angle) * 9) - 2, 5, 5)
  }
  ctx.fillRect(-7, -7, 14, 14)
  ctx.fillStyle = '#e8c9f5'
  ctx.fillRect(-3, -3, 6, 6)
  ctx.restore()
}

export default function RobotGame() {
  const [active, setActive] = useState(false)
  const [help, setHelp] = useState(false)
  const [collected, setCollected] = useState(0)
  const [result, setResult] = useState('')
  const [round, setRound] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return undefined
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const keys = new Set()
    const player = { x: Math.max(45, window.innerWidth * 0.13), y: 265, vx: 0, vy: 0, grounded: false, facing: 1 }
    let level = makeLevel(window.innerWidth, document.documentElement.scrollHeight)
    let frame = 0
    let animation
    let ended = false
    let scrollTarget = window.scrollY
    const previousScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * ratio)
      canvas.height = Math.round(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.imageSmoothingEnabled = false
      const wasCollected = level.cells.map(cell => cell.collected)
      level = makeLevel(window.innerWidth, document.documentElement.scrollHeight)
      level.cells.forEach((cell, index) => { cell.collected = wasCollected[index] })
    }
    const keyDown = event => {
      const key = event.key.toLowerCase()
      if (!['arrowleft', 'arrowright', 'arrowup', 'a', 'd', 'w', ' '].includes(key)) return
      if (event.target instanceof HTMLElement && /input|textarea|select/i.test(event.target.tagName)) return
      event.preventDefault()
      keys.add(key)
      if (ended && (key === ' ' || key === 'arrowup' || key === 'w')) {
        window.scrollTo(0, 0)
        setCollected(0)
        setResult('')
        setRound(value => value + 1)
      }
    }
    const keyUp = event => keys.delete(event.key.toLowerCase())
    const blur = () => keys.clear()
    const update = () => {
      frame += 1
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)
      const offset = window.scrollY

      if (!ended) {
        const direction = Number(keys.has('arrowright') || keys.has('d')) - Number(keys.has('arrowleft') || keys.has('a'))
        player.vx = direction ? direction * 3.8 : player.vx * 0.78
        if (Math.abs(player.vx) < 0.08) player.vx = 0
        if (direction) player.facing = direction
        if (player.grounded && (keys.has(' ') || keys.has('arrowup') || keys.has('w'))) {
          player.vy = -10.2
          player.grounded = false
        }
        const previousBottom = player.y + 42
        player.x = Math.max(0, Math.min(width - 36, player.x + player.vx))
        player.vy = Math.min(12, player.vy + 0.38)
        player.y += player.vy
        player.grounded = false
        if (player.vy >= 0) {
          for (const platform of [...level.platforms, ...level.textPlatforms]) {
            if (previousBottom <= platform.y + 5 && player.y + 42 >= platform.y && player.x + 31 > platform.x && player.x + 5 < platform.x + platform.width) {
              player.y = platform.y - 42
              player.vy = 0
              player.grounded = true
              break
            }
          }
        }
        for (const cell of level.cells) {
          if (!cell.collected && Math.abs(player.x + 18 - cell.x) < 25 && Math.abs(player.y + 19 - cell.y) < 30) {
            cell.collected = true
            const count = level.cells.filter(item => item.collected).length
            setCollected(count)
            if (count === CELL_COUNT) { ended = true; setResult('win') }
          }
        }
        if (player.y > document.documentElement.scrollHeight + 80) { ended = true; setResult('fall') }
        // Follow the character down the page while leaving wheel and trackpad scrolling available.
        const screenY = player.y - offset
        if (screenY > height * 0.73) scrollTarget = Math.max(scrollTarget, player.y - height * 0.57)
        else scrollTarget = Math.max(scrollTarget, offset)
        if (scrollTarget > offset + 1) window.scrollTo(0, Math.min(scrollTarget, offset + 12))
      }

      for (const platform of level.platforms) {
        const y = platform.y - offset
        if (y < 50 || y > height + 8) continue
        ctx.fillStyle = '#1a3347'
        ctx.fillRect(Math.round(platform.x), Math.round(y + 3), platform.width, 6)
        ctx.fillStyle = '#54a99b'
        ctx.fillRect(Math.round(platform.x), Math.round(y), platform.width, 2)
      }
      for (const cell of level.cells) {
        if (!cell.collected && cell.y - offset > 40 && cell.y - offset < height + 20) drawCell(ctx, cell.x, cell.y - offset, frame)
      }
      if (player.y - offset > -50 && player.y - offset < height + 50) drawSprite(ctx, player.x, player.y - offset, player.facing, frame)
      animation = requestAnimationFrame(update)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('keydown', keyDown, true)
    window.addEventListener('keyup', keyUp)
    window.addEventListener('blur', blur)
    animation = requestAnimationFrame(update)
    return () => {
      cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', keyDown, true)
      window.removeEventListener('keyup', keyUp)
      window.removeEventListener('blur', blur)
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [active, round])

  const toggle = event => {
    event.currentTarget.blur()
    if (!active) window.scrollTo({ top: 0, behavior: 'instant' })
    setActive(value => !value)
    setHelp(false)
    setCollected(0)
    setResult('')
    setRound(value => value + 1)
  }
  const restart = () => {
    window.scrollTo(0, 0)
    setCollected(0)
    setResult('')
    setRound(value => value + 1)
  }

  return <>
    <div className="game-controls">
      <button type="button" className={active ? 'game-button active' : 'game-button'} aria-pressed={active} onClick={toggle}><span className="game-dot" /> GAME MODE</button>
      {active && <button type="button" className="game-help-button" aria-label="Game instructions" aria-expanded={help} onClick={() => setHelp(value => !value)}>i</button>}
      {help && active && <div className="game-help">Move with ← → or A D. Jump with ↑, W, or Space. Collect all five cells as you explore the page.</div>}
    </div>
    {active && <>
      <canvas ref={canvasRef} className="robot-game-canvas" aria-label="Platform game overlay" />
      <div className="cell-counter" aria-live="polite"><span /> {collected} / {CELL_COUNT}</div>
      {result && <div className="robot-game-status" role="status"><strong>{result === 'win' ? 'neurons restored!' : 'you fell!'}</strong><span>{result === 'win' ? 'You found every cell.' : 'Try a different path.'}</span><button type="button" onClick={restart}>play again</button></div>}
    </>}
  </>
}
